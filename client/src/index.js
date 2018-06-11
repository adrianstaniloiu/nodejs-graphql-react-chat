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

ReactDOM.render(<App/>, document.getElementById('root'));