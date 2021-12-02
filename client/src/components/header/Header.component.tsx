import "./Header.style.css"

const Header = ({licensePlate}: {licensePlate: string | undefined}) => {

    return (
        <div className="headerMessage">
            <div>License Number: {licensePlate}</div>
        </div>
    )
}

export default Header
