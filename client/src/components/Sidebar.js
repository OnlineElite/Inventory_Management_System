import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Sidebar.css'
function Sidebar(){


    return(
        <div className=' sidebar d-flex justify-content-between flex-column bg-dark text-white'>
            <div className='userInfo'>
               <div className='userImage'> <i className="bi bi-person-fill"></i></div> 
               <div className='username'>
                    <h3> User Name</h3>
                    <p>(admin)</p>
               </div>
            </div>
            <button className='btn'><i class="bi bi-door-open-fill"></i> Log Out</button>
            <div className='lines'> <div className='line'></div>MAIN<div className='line'></div></div>
            <ul className='mainlinks'>
                <li><i className="bi bi-house-door-fill"></i> Dashboard</li>
                <li><i className="bi bi-tags-fill"></i> View Stock</li>
                <li><i className="bi bi-award-fill"></i> Products</li>
                <li><i className="bi bi-people-fill"></i> Users</li>
            </ul>
            <div className='lines'> <div className='line'></div>CUSTOMIZE<div className='line'></div></div>
            <ul className='mainlinks'>
                <li><i className="bi bi-bookmark-fill"></i> Categories</li>
                <li><i className="bi bi-flag-fill"></i> Brands</li>
                <li><i className="bi bi-gear-wide-connected"></i> Settings</li>
            </ul>
        </div>
    )
}

export default Sidebar;