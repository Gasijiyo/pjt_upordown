import { NavLink } from 'react-router-dom'
// import { useAuth } from './auth'
import "../App.css"
import { SearchBar } from './SearchBar'

export const Navbar = () => {

    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? 'bold' : 'normal',
            textDecoration: isActive ? 'none' : 'underline',
        }
    }
    
    return (
        <nav className='primary-nav'>
            <div className='Home'>
                <NavLink style={navLinkStyles} to='/'>Home</NavLink>
            </div>
            <div className='Nav_SearchBar'>
                <SearchBar/>
            </div>
            <div className='About'>
                <NavLink style={navLinkStyles} to='/about'>About</NavLink> 
            </div>            
        </nav>
    )
}