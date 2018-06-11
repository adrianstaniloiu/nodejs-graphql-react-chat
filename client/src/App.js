import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import {Query, Mutation, Subscription} from 'react-apollo';
import Message from './Message'

class App extends Component {

    render() {
        return (
            <div className="app">
                <Query query={gql`
                      {
                          messages {
                              id,
                              author,
                              content
                          }
                      }
                  `}>{
                    ({loading, error, data, refetch}) => {

                        if (loading) {
                            return (<h3>Loading...</h3>);
                        }

                        if (error) {
                            return (<h3>{error.message}</h3>);
                        }

                        return (
                            <div className="messages">
                                {
                                    data.messages.map((message, i) => {
                                        return (
                                            <Message key={i} {...message} />
                                        )
                                    })
                                }
                                <Subscription
                                    subscription={gql`
                                      subscription newMessage {
                                        newMessage {
                                            node{
                                                id,
                                                author,
                                                content
                                            },

                                        }
                                      }
                                    `}>{
                                    ({data, loading}) => {
                                        if (loading) {
                                            return ('Listening...');
                                        }
                                        if (data) {
                                            return (<Message {...data.newMessage.node} />);
                                        }

                                    }
                                }
                                </Subscription>
                            </div>
                        );


                    }
                }
                </Query>

                <Mutation mutation={gql`
                    mutation addMessage($author: String!, $content: String!) {
                        addMessage(author: $author, content: $content) {
                                                id,
                                                author,
                                                content,
                                            }
                                        }
                   `}>
                    {
                        addMessage => {
                        return (
                            <form action="/" className="add-message" onSubmit={e => {
                                e.preventDefault();

                                addMessage({
                                    variables: {author: this.author.value, content: this.content.value}
                                })
                            }}>
                                <input type="text" ref={(node) => this.author = node}/><br/>
                                <textarea ref={(node) => this.content = node} cols="30"
                                          rows="5"></textarea><br/>
                                <button type="submit">Add Message</button>
                            </form>
                        );
                    }
                }
                </Mutation>
            </div>
        )
    }
}

export default App;
