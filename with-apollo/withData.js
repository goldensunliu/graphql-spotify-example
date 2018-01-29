import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import Head from 'next/head'
import Cookies from 'js-cookie'

const dev = process.env.NODE_ENV !== 'production'

import initApollo from './initApollo'

// Gets the display name of a JSX component for dev tools
function getComponentDisplayName (Component) {
    return Component.displayName || Component.name || 'Unknown'
}

export default ComposedComponent => {
    return class WithData extends React.Component {
        static displayName = `WithData(${getComponentDisplayName(ComposedComponent)})`
        static propTypes = {
            serverState: PropTypes.object.isRequired
        }

        static async getInitialProps (context) {
            let serverState = { apollo: {} }
            // These two variables is closely coupled to this app, in that the graph ql server is deployed on the same host
            // and the needed spotify token is set in the session, so we pass these two on init of apollo on server and client side
            let graphQlServerUrl, token;

            // Evaluate the composed component's getInitialProps()
            let composedInitialProps = {}
            if (ComposedComponent.getInitialProps) {
                composedInitialProps = await ComposedComponent.getInitialProps(context)
            }
            if (context.req)
            {
                token = context.req.cookies['spotify-token']
                let protocol
                // use the de-factor header x-forwarded-proto behind now's load balancer
                if (!dev && context.req.headers['x-forwarded-proto'])
                {
                    protocol= context.req.headers['x-forwarded-proto']
                }
                // use whatever is in the req
                else
                {
                    protocol = context.req.protocol
                }
                graphQlServerUrl = `${protocol}://${context.req.get('host')}/graphql`
            }
            else
            {
                graphQlServerUrl = `${window.location.protocol}//${window.location.host}/graphql`
                token = Cookies.get("spotify-token")
            }

            graphQlServerUrl = `${graphQlServerUrl}?token=${token}`

            // Run all GraphQL queries in the component tree
            // and extract the resulting data
            if (!process.browser) {
                const apollo = initApollo({ graphQlServerUrl })
                // Provide the `url` prop data in case a GraphQL query uses it
                const url = {query: context.query, pathname: context.pathname}
                try {
                    // Run all GraphQL queries
                    await getDataFromTree(
                        <ApolloProvider client={apollo}>
                            <ComposedComponent url={url} {...composedInitialProps} />
                        </ApolloProvider>
                    )
                } catch (error) {
                    // Prevent Apollo Client GraphQL errors from crashing SSR.
                    // Handle them in components via the data.error prop:
                    // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
                }
                // getDataFromTree does not call componentWillUnmount
                // head side effect therefore need to be cleared manually
                Head.rewind()

                // Extract query data from the Apollo store
                serverState = {
                    apollo: {
                        data: apollo.cache.extract()
                    }
                }
            }

            return {
                serverState,
                graphQlServerUrl,
                ...composedInitialProps
            }
        }

        constructor (props) {
            super(props)
            this.apollo = initApollo({
                initialState : props.serverState.apollo.data,
                graphQlServerUrl: props.graphQlServerUrl
            })
        }

        render () {
            return (
                <ApolloProvider client={this.apollo}>
                    <ComposedComponent {...this.props} />
                </ApolloProvider>
            )
        }
    }
}