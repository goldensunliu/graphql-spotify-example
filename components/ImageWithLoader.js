import React, {Component} from 'react'
import Image from 'react-image'

import Spinner from '../components/spinner'

const ImageWithLoader = ({url, style}) => (
    <div className="image-with-loader" style={style}>
        <Image src={url} loader={<Spinner/>}/>
        { /*language=CSS*/ }
        <style jsx>{`
            .image-with-loader {
                display: grid;
            }
            .image-with-loader :global(.spinner) {
                width: 100%;
            }
            .image-with-loader :global(img) {
                width: 100%;
                height: 100%;
                border-radius: 2px;
                object-fit: cover;
            }
        `}
        </style>
    </div>
)

export default ImageWithLoader