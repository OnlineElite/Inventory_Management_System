import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/Navbar.css'
import {Link} from 'react-router-dom'
function Navbar(){
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light ">
                <div className='logo'> <Link className='Link_logo' to= '/'> <FontAwesomeIcon className='icon' icon="fa-brands fa-r-project" /> </Link></div>
                <div className="collapse navbar-collapse" >
                    <ul>
                        <li>
                            <Link className='Link' to= '/'> Home </Link>
                        </li>
                        <li>
                            <Link className='Link' to='/' > About </Link> 
                        </li>
                        <li>
                            <Link className='Link' to='/' > Contact </Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
                        <div className='buttons'>                            
                            <Link className='Link' to='/login' >
                                <button className='btn btn-primary'>Loging</button> 
                            </Link>
                            <Link className='Link' to='/register' >
                                <button className='btn btn-primary'>Register</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;