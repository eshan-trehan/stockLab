import { Link } from 'react-router-dom'
import logo from './flask.png'
import { useAuth } from '../context/authContext'

const Navbar = () => {
    const { currentUser, logout } = useAuth()

    return (
        <nav className="navbar">
            <div className="name">
                <h1>Stock Lab!</h1>
                <img src={logo} alt="logo"/>
            </div>
            <div className="links">
                {<Link to="/">Home</Link>}
                {currentUser && <Link to="/dashboard">Dashboard</Link>}
                {currentUser && <Link to="/" onClick={logout}>Logout</Link>}
                {!currentUser && <Link to="/signup">Sign Up</Link>}
                {!currentUser && <Link to="/login">Login</Link>}
            </div>
        </nav>
    );
}

export default Navbar;