import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Routes, Route} from 'react-router-dom'
import Sidebar from "./Sidebar";
import Header from "./Header";
import Home from "./Home";
import Products from './Products'
import Categories from "./Categories";
import ViewStock from './ViewStock'
import Settings from './Settings';
import Users from './Users'
import Brands from './Brands'
import { useState } from "react";
function Dashboard(){

    const [toggle, setToggle] = useState(false)

    function Toggle(){
      setToggle(!toggle)
    }

    return(
        <div>
           <div className="d-flex">
                <div className= {toggle? "d-none" :"w-auto position-fixed"}>
                    <Sidebar/>
                </div>
                <div className= {toggle? "d-none" :"invisible"}>
                    <Sidebar/>
                </div>
                <div className="col overflow-auto">
                    <Header Toggle={Toggle}/>
                    
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/dashboard/products" element={<Products/>} />
                        <Route path="/dashboard/categories" element={<Categories/>} />
                        <Route path="/dashboard/stock" element={<ViewStock/>} />
                        <Route path="/dashboard/users" element={<Users/>} />
                        <Route path="/dashboard/brands" element={<Brands/>} />
                        <Route path="/dashboard/settings" element={<Settings/>} />
                    </Routes>
                </div>
                
            </div>
        </div>
    )
}

export default Dashboard;