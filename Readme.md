## A Web App For Exploring Spotify Data ![](https://travis-ci.org/goldensunliu/graph-spotify-example.svg?branch=master)
This is an example web application built using [GraphQL Spotify](https://github.com/goldensunliu/graphql-spotify) + [React/Next.js](https://github.com/zeit/next.js) + [Apollo GraphQL](https://www.apollographql.com/docs/) + [Spotify Web API](https://beta.developer.spotify.com/documentation/web-api/reference/) 

* It comes complete with a simple and complete implicit Auth flow for access Spotify's data

* You can use this as a skeleton for your next SSR single page web app powered by [GraphQL Spotify](https://github.com/goldensunliu/graphql-spotify)

* It is a great showchase on how you can request all the data you need from Spotify with a single request in your applications!

#### Routes

* /graphiql - An in-browser IDE for exploring GraphQL Spotify Data
* /categories - An server side rendering example page built on top of [React/Next.js](https://github.com/zeit/next.js) + [Apollo Client](https://github.com/apollographql/apollo-client)

#### Example Queries to Try
##### Get your recently played history with tracks' audio features and related artists' genres

```
{
  recentlyPlayed {
    track {
      id
      name
      external_urls {
        spotify
      }
      duration_ms
      artists {
        name
        id
        genres
      }
      album {
        name
        images {
          url
          width
          height
        }
      }
      audio_features {
        energy
        tempo
        danceability
        valence
      }
    }
    played_at
  }
}

```
##### Get your top tracks and artists along with some sweet data like audio features and classified genres
```
query ($timeRange: TimeRange = medium_term) {
  topTracks: top(type: tracks, limit: 100, time_range: $timeRange) {
    items {
      ... on Track {
        id
        name
        external_urls {
          spotify
        }
        duration_ms
        artists {
            name
            id
        }
        album {
            name
            images {
                url
                width
                height
            }
        }
        audio_features {
          acousticness
          danceability
          duration_ms
          energy
          instrumentalness
          key
          liveness
          loudness
          mode
          speechiness
          tempo
          time_signature
          valence
        }
      }
    }
    limit
    total
  }
  topArtists: top(type: artists, limit: 100, time_range: $timeRange) {
    items {
      ... on Artist {
        name
        genres
        popularity
        followerCount
      }
    }
    limit
    total
  }
}
```

### Local Build & Develop
#### Install
```npm install``` or ```yarn install```

#### Set App Configuration
1. [Set up and obtain your Spotify App Client ID](https://beta.developer.spotify.com/dashboard/applications)

2. White-list **http://localhost:3000/login** in your app settings
![](https://user-images.githubusercontent.com/1348993/35358882-25c621b4-0126-11e8-9e70-75c51a617a3c.png)
3. Set **`CLIENT_ID`** in `spotify-config.js` to your app's client ID

4. Optional [Apollo Engine](https://www.apollographql.com/engine/) Step: 
   * [Setup Service With Apollo Engine](https://www.apollographql.com/engine/)
   * Set **`APOLLO_ENGINE_API_KEY`** in `spotify-config.js` to your service API key:
   * Enjoy:
       * Performance tracing
       * Schema management
       * Error tracking
       * Caching
#### Local Build
```
npm run dev
```
hit up [http://localhost:3000/](http://localhost:3000/)
### Production Build & Start
```
npm build && npm run start
```

