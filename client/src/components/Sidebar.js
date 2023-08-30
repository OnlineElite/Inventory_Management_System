import React, { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Sidebar.css'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {LogOutThunk, logout} from '../actions/IMSAction'
function Sidebar(props){
    const [active, setActive] = useState("dashboard");

    const handelLogout =(e)=>{
        e.preventDefault()
        props.fetchlogout(props.userEmail)
        props.logoutset()
    }

    return (
      <div className=" sidebar d-flex justify-content-between flex-column bg-dark text-white">
        <div className="userInfo">
          <div className="userImage">
            {" "}
            <i className="bi bi-person-fill"></i>
          </div>
          <div className="username">
            <h3>
              {props.userfullName[0]} {props.userfullName[1]}{" "}
            </h3>
            <p>(admin)</p>
          </div>
        </div>

        <ul className="mainlinks">
          <Link to="/dashboard">
            <li
              className={active === "dashboard" ? "active link" : "link"}
              onClick={(e) => setActive("dashboard")}
            >
              <i className="bi bi-grid-1x2-fill"></i> Dashboard
            </li>
          </Link>
          <Link to="/dashboard/stock">
            <li
              className={active === "stock" ? "active link" : "link"}
              onClick={(e) => setActive("stock")}
            >
              <i className="bi bi-tags-fill"></i> View Stock
            </li>
          </Link>
          <Link to="/dashboard/products">
            <li
              className={active === "products" ? "active link" : "link"}
              onClick={(e) => setActive("products")}
            >
              <i className="bi bi-award-fill"></i> Products
            </li>
          </Link>
          <Link to="/dashboard/users">
            <li
              className={active === "users" ? "active link" : "link"}
              onClick={(e) => setActive("users")}
            >
              <i className="bi bi-people-fill"></i> Users
            </li>
          </Link>
          <Link to="/dashboard/categories">
            <li
              className={active === "categories" ? "active link" : "link"}
              onClick={(e) => setActive("categories")}
            >
              <i className="bi bi-grid-3x3-gap-fill"></i> Categories
            </li>
          </Link>
          <Link to="/dashboard/brands">
            <li
              className={active === "brands" ? "active link" : "link"}
              onClick={(e) => setActive("brands")}
            >
              <i className="bi bi-flag-fill"></i> Brands
            </li>
          </Link>
          <Link to="/dashboard/settings">
            <li
              className={active === "settings" ? "active link" : "link"}
              onClick={(e) => setActive("settings")}
            >
              <i className="bi bi-gear-wide-connected"></i> Settings
            </li>
          </Link>
        </ul>

        <hr />
        <ul className="mainlinks ">
          <Link className=" logout" to="/login" onClick={handelLogout}>
            <li
              className={active === "login" ? "active link" : "link "}
              onClick={(e) => setActive("login")}
            >
              <i className="bi bi-box-arrow-right "></i> Log Out
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
