import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css';

import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {split} from 'apollo-client-preset';
import {getMainDefinition} from 'apollo-utilities';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {WebSocketLink} from 'apollo-link-ws';
import {ApolloProvider} from 'react-apollo';

const httpLink = new HttpLink({uri: `http://localhost:4000`});

const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000`,
    options: {
        reconnect: true
    }
});

const link = split(
    ({query}) => {
        const {kind, operation} = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root'),
);