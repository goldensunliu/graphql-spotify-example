import React, { Component } from 'react'
import Router from 'next/router'
import Cookies from 'js-cookie'

import Layout from '../components/Layout'
import { PendingState, getParamsFromHash } from '../components/LoginComponents'

class Index extends Component {
    state = {}
    static async getInitialProps ({req, query}) {
        return {}
    }

    tryGettingTokenFromImplicit = () => {
        let tokenGotTime, token;
        // TODO be more defensive
        if (window.location.hash) {
            this.setState({ loggingIn: true })
            tokenGotTime = new Date().getTime();
            const params = getParamsFromHash();
            token = params.access_token;
            const state = params.state
            // remove hash
            history.replaceState("", document.title, window.location.pathname
                + window.location.search);
            Cookies.set("spotify-token", token, { domain: null, expires: new Date((tokenGotTime + 3600000 - 1000))})
            // Use at your own risk, strongly recommend the following:
            // The intentional delay is for the UX
            setTimeout(() => {Router.replace(decodeURIComponent(state))}, 1500)
        }
    }

    componentDidMount() {
        this.tryGettingTokenFromImplicit()
        this.setState({ mounted: true })
    }

    constructor (props) {
        super(props)
    }

    render () {
        return (
            <Layout name="Login To Explore Your Spotify Data!" hideMenu>
                <PendingState loggingIn={this.state.loggingIn}/>
            </Layout>
        )
    }
}

export default Index