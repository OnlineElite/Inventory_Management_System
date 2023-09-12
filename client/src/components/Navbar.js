import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/Navbar.css'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {LogOutThunk, logout} from '../actions/IMSAction'

function Navbar(props){

    const handleLogout =(e)=>{
        props.fetchlogout(props.userEmail)
        props.logoutset()
    }

    return(
        <div className='Navbarr'>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <div className='logo'> <Link className='Link_logo' to= '/'> <FontAwesomeIcon className='icon' icon="fa-brands fa-r-project" /> </Link></div>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className='navs'>
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
                    <form className="form-inline my-2 my-lg-0 ">
                        {props.isAuthenticated ? 
                        (
                            <>
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn  my-2 my-sm-0" type="submit">Search</button>
                                <ul className='rightInfo mx-3'>
                                    <li className='mx-3'>
                                        <span className=' cart d-flex align-items-center text-white ' data-toggle="modal" data-target="#cartModal">
                                            <i class="bi bi-cart-fill text-white"></i> Cart
                                        </span>
                                    </li>
                                    <li>
                                        <div className='user dropdown-toggle ' role="button" data-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-person-circle"></i>
                                            {props.userfullName[0] } {props.userfullName[1] }
                                        </div>
                                        <div class="dropdown-menu">
                                            <Link className='userLink d-block' >
                                                <i class="bi bi-person-lines-fill text-black mx-2"></i>
                                                <span class="text-black" >You profile</span>
                                            </Link>
                                            <Link className='userLink d-block' >
                                                <i class="bi bi-heart-fill text-black mx-2"></i>
                                                <span class="text-black" >You Favories</span>
                                            </Link>
                                            <div class="dropdown-divider"></div>
                                            <Link className='userLink' to='/login' >
                                                <i className="bi bi-box-arrow-right mx-2 text-black"></i>
                                                <span className=' text-black' onClick={handleLogout}>Logout</span> 
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                                {/* cart Modal */}
                                <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Shopping Cart</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            put body here
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ):
                        (   <>
                                <ul className='rightInfo'>
                                    <div className='buttons '>                            
                                        <Link className='Link' to='/login' >
                                            <button className='btn btn-primary'>Login</button> 
                                        </Link>
                                        <Link className='Link' to='/register' >
                                            <button className='btn btn-primary'>Register</button>
                                        </Link>
                                    </div>
                                </ul>
                            </>
                        )}
                    </form>
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps =(state)=>{
    return{
        response : state.error,
        isAuthenticated : state.isAuthenticated,
        isAdmin : state.isAdmin,
        userEmail : state.userEmail,
        userfullName : state.userfullName
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        fetchlogout : (user)=>{
            dispatch(LogOutThunk(user))
        },
        logoutset : ()=>{
            dispatch(logout())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Navbar);