import ReactDOM from 'react-dom'
import './backdrop.style.css'

const Backdrop = ({children}) => {
    return ReactDOM.createPortal(
        <div className="backdrop">
            {children}
        </div>, document.getElementById('modal-root')
    )
}

export default Backdrop