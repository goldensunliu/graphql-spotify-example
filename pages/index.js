import React from 'react'
import Router from 'next/router'

const DEFAULT_ROUTE = "/graphiql"
// TODO when react router is in next. use that for better redirects
class Index extends React.Component {
  static async getInitialProps({ res }) {
    if (res) {
      res.redirect(DEFAULT_ROUTE)
    } else {
      Router.replace(DEFAULT_ROUTE)
    }
    return {}
  }
}
export default Index