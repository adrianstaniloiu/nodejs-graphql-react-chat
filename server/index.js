const {GraphQLServer} = require('graphql-yoga');
const {Prisma} = require('prisma-binding');

const resolvers = {};

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