import React, { Component } from 'react'
import ImageWithLoader from '../components/ImageWithLoader'
import { backGroundOrange } from '../utils/colors'

const CategorySummary = ({ name, spotifyLink, image, href }) => {
    return (
        <div className="root">
            <div className="top">
                <div>{name}</div>
                { spotifyLink && <a href={spotifyLink} target="_blank"><img src="/static/Spotify_White.png"/></a>}
            </div>
            {image &&
            <ImageWithLoader url={image.url} style={{ width: '10em', height: '10em', overflow: 'hidden' }}/>
            }
            { /*language=CSS*/ }
            <style jsx>{`
                    .root {
                        width: 10em;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                        border-bottom: .5em solid ${backGroundOrange};
                        border-radius: 6px;
                        margin: 1em;
                        overflow: hidden;
                    }
                    .top {
                        color: white;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-weight: bold;
                        padding: .25em .5em;
                        background-color: ${backGroundOrange};
                        text-transform: capitalize;
                        font-size: 1.2em;
                    }
                    img {
                        height: .75em;
                    }
                `}</style>
        </div>
    )
}

export default CategorySummary