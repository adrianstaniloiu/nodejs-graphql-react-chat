const {GraphQLServer} = require('graphql-yoga');
const {Prisma} = require('prisma-binding');

const resolvers = {
    Query: {
        messages: (obj, args, context, info) => {
            return context.db.query.messages({}, info)
        },
    },
    Mutation: {
        addMessage: (root, args, context, info) => {
            return context.db.mutation.createMessage(
                {
                    data: {
                        author: args.author,
                        content: args.content
                    }
                },
                info,
            )
        },
        removeMessage: (root, args, context, info) => {
            return context.db.mutation.deleteMessage({
                where: {
                    id: args.id
                }
            })
        }
    },
    Subscription: {
        newMessage: {
            subscribe: async (root, args, context, info) => {
                return context.db.subscription.message(
                    {
                        where: {
                            mutation_in: ['CREATED'],
                        },
                    },
                    info
                )
            },
        },
    }
};

const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: './generated/prisma.graphql',
            endpoint: `http://localhost:4466`,
            secret: '',
            debug: true,
        }),
    }),
});


server.start(() =>
    console.log(`GraphQL server is running on http://localhost:4000`),
)