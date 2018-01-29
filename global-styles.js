import css from 'styled-jsx/css'
import { backGroundBlue } from './utils/colors'

const backGroundMenuColor = backGroundBlue;
export const MenuStyles = {
    bmBurgerButton: {
        position: 'fixed',
        width: '40px',
        height: '40px',
        right: 10,
        top: 10
    },
    bmBurgerBars: {
        background: backGroundMenuColor
    },
    bmCrossButton: {
        height: '24px',
        width: '24px'
    },
    bmCross: {
        background: 'white'
    },
    bmMenu: {
        background: backGroundMenuColor,
        padding: '1.5em 0.5em 0',
    },
    bmMorphShape: {
        fill: backGroundMenuColor
    },
    bmItemList: {
        height: 'initial',
        color: '#b8b7ad',
        padding: '0.8em'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    }
}

{ /*language=CSS*/ }
const styles = css`
body {
    margin: 0;
    font-size: 13px;
}

.bm-burger-button * {
    fill: ${backGroundMenuColor}
}
@media (min-width: 600px) {
    body { font-size: 15px; }
}
a {
    color: inherit;
    text-decoration: none;
}
body {
    font-family: "Roboto","Helvetica","Arial",sans-serif;
}

body {
  opacity: 1;
  transition: filter 1s ease-in-out;
}
body.loading {
    filter: blur(20px);
}
`;

export default styles