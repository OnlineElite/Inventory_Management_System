import React, { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Sidebar.css'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';
import loggo from '../images/TechWave.png'
import {
  LogOutThunk,
  logout,
} from "../actions/Authentication/authenticationActions";
function Sidebar(props){
    var url = window.location.href.split("/")
    let tab = url[url.length-1]

    const [active, setActive] = useState(`${tab}`);
    const ProjectName = process.env.REACT_APP_API_PROJECT_NAME;
 
    const handelLogout =(e)=>{
      e.preventDefault()
      props.fetchlogout(props.userEmail)
      props.logoutset()
    }

    return (
      <div className={props.toggle? 'sidebar short' : 'sidebar long'} >
        <div className="userInfo ">
           <img className='mx-2' src= {loggo} alt='logos'/>
           {!props.toggle? <span>{ProjectName} </span> : '' }
        </div>

        <ul className="mainlinks">
          
          <Link to="/dashboard">
            <li
              className={active === "dashboard" ? "active link" : "link"}
              onClick={(e) => setActive("dashboard")}
            >
              <i className="bi bi-grid-1x2-fill mx-2"></i>
              {!props.toggle? <span>Dashboard</span> : '' }
            </li>
          </Link>
          <Link to="/dashboard/stock">
            <li
              className={active === "stock" ? "active link" : "link"}
              onClick={(e) => setActive("stock")}
            >
              <i className="bi bi-tags-fill mx-2"></i>
              {!props.toggle? <span>View Stock</span> : '' }
            </li>
          </Link>
          <Link to="/dashboard/products">
            <li
              className={active === "products" ? "active link" : "link"}
              onClick={(e) => setActive("products")}
            >
              <i className="bi bi-award-fill mx-2"></i>
              {!props.toggle? <span>Products</span> : '' }
            </li>
          </Link>
          <Link to="/dashboard/users">
            <li
              className={active === "users" ? "active link" : "link"}
              onClick={(e) => setActive("users")}
            >
              <i className="bi bi-people-fill mx-2"></i>
              {!props.toggle? <span>Users</span> : '' }
            </li>
          </Link>
          <Link to="/dashboard/categories">
            <li
              className={active === "categories" ? "active link" : "link"}
              onClick={(e) => setActive("categories")}
            >
              <i className="bi bi-grid-3x3-gap-fill mx-2"></i>
              {!props.toggle? <span>Categories</span> : '' } 
            </li>
          </Link>
          <Link to="/dashboard/brands">
            <li
              className={active === "brands" ? "active link" : "link"}
              onClick={(e) => setActive("brands")}
            >
              <i className="bi bi-flag-fill mx-2"></i>
              {!props.toggle? <span>Brands</span> : '' }
            </li>
          </Link>
          <Link to="/dashboard/orders">
            <li
              className={active === "orders" ? "active link" : "link"}
              onClick={(e) => setActive("orders")}
            >
              <FontAwesomeIcon className="i mx-2" icon="fa-solid fa-cubes" />
              {!props.toggle? <span>Orders</span> : '' }
            </li>
          </Link>
        </ul>

        <hr />
        <ul className="mainlinks p-0 m-0" style = {{height : 'fitContent'}}>
          <Link className=" logout" to="/login" onClick={handelLogout}>
            <li
              className={active === "login" ? "active link" : "link "}
              onClick={(e) => setActive("login")}
            >
              <i className="bi bi-box-arrow-right mx-2"></i>
              {!props.toggle? <span>Log Out</span> : '' }
            </li>
          </Link>
        </ul>
        <hr />
      </div>
    );
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
