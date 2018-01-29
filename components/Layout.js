import React from 'react'
import NextHead from 'next/head'
import NavMenu, { Footer } from './NavMenu'
import GlobalStyles from '../global-styles'
import Router from 'next/router'

Router.onRouteChangeStart = () => {
    document.body.classList.add('loading')
}

Router.onRouteChangeComplete = url => {
    document.body.classList.remove('loading')
}

const Layout = ({name, children, hideMenu}) =>{
    return(
        <div>
            <NextHead>
                <title>{name}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" type="text/css"/>
            </NextHead>
            { !hideMenu && <NavMenu/> }
            <div className="root">
                <div className="body">
                    {children}
                </div>
                <Footer/>
            </div>
            <style jsx global>{GlobalStyles}</style>
            { /*language=CSS*/ }
            <style jsx>{`
                .root {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                }
                .body {
                    display: flex;
                    flex: 1;
                    width: 100vw;
                }
            `}</style>
        </div>
    )
}

export default Layout