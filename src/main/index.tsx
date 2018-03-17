import * as React from 'react'
import * as ReactDOM from 'react-dom'
import PageDrawApp from '../pagedraw/homepage'
require('core-js')

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';


const client = new ApolloClient({
    link: new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjeu7kr8i1qfi01641spx5xpr' }),
    cache: new InMemoryCache()
});

client.query({
    query: gql`
        query TodoApp {
            allTasks {
                text
                checked
            }
        }
    `,
})
.then(data => {
    const items = data.data.allTasks.map(elem => {
        return {text: elem.text, state: elem.checked ? 'checked' : 'unchecked'}
    })
    ReactDOM.render(<PageDrawApp items={items}/>, document.getElementById('app'))
})
.catch(error => console.error(error));

