import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import LoadingFullScreen from '../components/LoadingFullScreen'
import Summary from '../components/CategorySummary'
import Layout from '../components/Layout'

import withData from '../with-apollo/withData'
import checkLogin from '../utils/checkLogin'

const categoryQuery = gql`
{
  categories(limit: 50) {
    items {
      ... on Category {
        id
        name
        icons {
          url
          width
          height
        }
      }
    }
  }
}
`
// Use this query to display the categories along with track data from their playlists! 🔥🔥🔥🔥
const categoryQueryWithTrackData = gql`
{
  categories(limit: 50) {
    items {
      ... on Category {
        id
        name
        icons {
          url
          width
          height
        }
        playlists {
          items {
            ... on PlaylistTrack {
              added_at
              track {
                id
                name
                audio_features {
                  energy
                }
              }
            }
          }
        }
      }
    }
  }
}
`

class Index extends Component {
    state = { expanded: true }
    static async getInitialProps ({req, res, query}) {
        checkLogin({req, res})
    }

    constructor (props) {
        super(props)
    }


    renderCategories () {
        const { data: { categories }  } = this.props
        return (
            <div>
                {
                    categories.items.map((category, i) => {
                        const { name, icons, id } = category
                        return (
                            <Summary key={i} name={name} image={icons && icons[0]} href={`/category?id=${id}`}/>
                        )
                    })
                }
                <style jsx>{`
                    div {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        align-items: center;
                        padding: .5em;
                        flex: 1;
                    }
                `}</style>
            </div>
        )
    }

    render() {
        return (
            <Layout name="Browse Categories">
                {this.props.data.categories ? this.renderCategories() : <LoadingFullScreen/>}
            </Layout>
        )
    }
}

export default withData(graphql(categoryQuery)(Index))