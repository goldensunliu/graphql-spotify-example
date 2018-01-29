import { ApolloClient } from 'apollo-client'
// TODO monitor https://github.com/apollographql/apollo-link/issues/343 and the progress of removing the dependency on apollo-fetch an use the same options / API as the http-link
import { BatchHttpLink } from "apollo-link-batch-http"
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-fetch'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    global.fetch = fetch
}

function create ({ initialState, graphQlServerUrl, cookies }) {
    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link: new BatchHttpLink({
            uri: graphQlServerUrl // Server URL (must be absolute)
        }),
        cache: new InMemoryCache().restore(initialState || {}),
    })
}

export default function initApollo ({ initialState, graphQlServerUrl, cookies }) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)

    if (!process.browser) {
        return create({ initialState, graphQlServerUrl, cookies })
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create({ initialState, graphQlServerUrl, cookies })
    }

    return apolloClient
}