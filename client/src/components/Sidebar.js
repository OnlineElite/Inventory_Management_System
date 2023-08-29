import React, { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Sidebar.css'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {LogOutThunk, logout} from '../actions/IMSAction'
function Sidebar(props){
    const [active, setActive] = useState(1)

    const handelLogout =(e)=>{
        e.preventDefault()
        props.fetchlogout(props.userEmail)
        props.logoutset()
    }

    return(
        <div className=' sidebar d-flex justify-content-between flex-column bg-dark text-white'>
            <div className='userInfo'>
               <div className='userImage'> <i className="bi bi-person-fill"></i></div> 
               <div className='username'>
                    <h3>{props.userfullName[0]} {props.userfullName[1]} </h3>
                    <p>(admin)</p>
               </div>
            </div>

            <ul className='mainlinks'>
                <li className={active === 1 ? 'active link': 'link'} onClick={e => setActive(1)}>
                    <Link to='/dashboard'  className='link'><i className="bi bi-grid-1x2-fill"></i> Dashboard</Link>
                </li>
                <li className={active === 2 ? 'active link': 'link'} onClick={e => setActive(2)}>                   
                    <Link to='/dashboard/stock' className='link'><i className="bi bi-tags-fill"></i> View Stock</Link>
                </li>
                <li className={active === 3 ? 'active link': 'link'} onClick={e => setActive(3)}>                    
                    <Link to='/dashboard/products' className='link'><i className="bi bi-award-fill"></i> Products</Link>
                </li>
                <li className={active === 4 ? 'active link': 'link'} onClick={e => setActive(4)}>                    
                    <Link to='/dashboard/users' className='link'><i className="bi bi-people-fill"></i> Users</Link>
                </li>
                <li className={active === 5 ? 'active link': 'link'} onClick={e => setActive(5)}>                    
                    <Link to='/dashboard/categories' className='link'><i className="bi bi-grid-3x3-gap-fill"></i> Categories</Link>
                </li>
                <li className={active === 6 ? 'active link': 'link'} onClick={e => setActive(6)}>                   
                    <Link to='/dashboard/brands' className='link'><i className="bi bi-flag-fill"></i> Brands</Link>
                </li>
                <li className={active === 7 ? 'active link': 'link'} onClick={e => setActive(7)}>
                    <Link to="/dashboard/settings" className='link'><i className="bi bi-gear-wide-connected"></i> Settings</Link>
                </li>
            </ul>
             
            <hr/>
            <ul className='mainlinks '>
                <li className={active === 8 ? 'active link': 'link '} onClick={e => setActive(8)}>
                    <Link className='Link logout' to='/login' onClick={handelLogout}>
                        <i className="bi bi-box-arrow-right "></i> Log Out 
                    </Link>              
                </li>
            </ul>
            <hr/>
            
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

export default connect(mapStateToProps, mapDispatchToProps) (Sidebar);
