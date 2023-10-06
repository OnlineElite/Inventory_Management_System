import React, {useEffect, useState } from 'react'
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
import {connect} from 'react-redux'
import {bringCategoriesThunk, bringBrandsThunk, bringStatesThunk} from '../actions/IMSAction'


function Dashboard(props){

    const [toggle, setToggle] = useState(false)

    function Toggle(){
      setToggle(!toggle)
    }

    useEffect(()=>{
        props.getCategories()
        props.getBrands()
        props.getStates()
    }, [props])
    

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
                        <Route path="/products" element={<Products/>} />
                        <Route path="/categories" element={<Categories/>} />
                        <Route path="/stock" element={<ViewStock/>} />
                        <Route path="/users" element={<Users/>} />
                        <Route path="/brands" element={<Brands/>} />
                        <Route path="/settings" element={<Settings/>} />
                    </Routes>
                </div>               
            </div>
        </div>
    )
}

const mapStateToProps =(state)=>{
    
    return{
        response : state.error,
        isAuthenticated : state.isAuthenticated,
        isAdmin : state.isAdmin,
        states : state.states
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        getStates : ()=>{
            dispatch(bringStatesThunk())
        },
        getCategories : ()=>{
            dispatch(bringCategoriesThunk())
        },getBrands : ()=>{
            dispatch(bringBrandsThunk())
        }
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);
