import React, { Component } from 'react'
import Color from 'color'

import { backGroundOrange } from '../utils/colors'

const colors = {
    orange: backGroundOrange
}

export default class Button extends Component {
    static defaultProps = {
        color: 'orange',
        size: 'large'
    }
    render() {
        const color = colors[this.props.color]
        return (
            <div className={`btn ${this.props.size}`} onClick={this.props.onClick}>
                { /*language=CSS*/ }
                <style jsx>{`
                    .btn {
                        border-radius: .25em;
                        font-weight: bold;
                        text-decoration: none;
                        color: #fff;
                        position: relative;
                        display: inline-block;
                        font-size: 1em;
                        transition: all .25s;
                    }
                    .btn.large {
                        padding: 10px 20px;
                        font-size: 1.85em;
                    }
                    .btn.mid {
                        padding: 5px 10px;
                        font-size: 1.4em;
                    }
                    .btn.small {
                        padding: .25em .5em;
                        font-size: 1.2em;
                    }
                `}
                </style>
                { /*language=CSS*/ }
                <style jsx>{`
                    .btn:active {
                      transform: translate(0px, 5px);
                      -webkit-transform: translate(0px, 5px);
                      box-shadow: 0 1px 0 0;
                    }

                    .btn {
                      background-color: ${color};
                      box-shadow: 0 2px 4px 0 ${Color(color).darken(.5).hsl().string()};
                      display: flex;
                      align-items: center;
                    }

                    .btn:hover {
                      background-color: ${Color(color).lighten(.2).hsl().string()};
                    }
                `}
                </style>
                {this.props.children}
            </div>
        )
    }
}