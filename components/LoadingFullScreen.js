import Spinner from '../components/spinner'

const LoadingFullScreen = () => (
    <div>
        <Spinner/>
        { /*language=CSS*/ }
        <style jsx>{`
            div {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
            }
        `}</style>
    </div>
)

export default LoadingFullScreen