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
import Settings from './Orders';
import Users from './Users'
import Brands from './Brands'
import {connect} from 'react-redux'
import {
  bringStatesThunk,
} from "../actions/General/generalActions";
import {
  bringCategoriesThunk,
  bringBrandsThunk,
  bringProductsThunk,
  bringUsersThunk,
  bringStatusThunk,
  bringOrdersThunk,
} from "../actions/IMSAction";
import '../styles/Dashboard.css'

function Dashboard(props){

    const [toggle, setToggle] = useState(false)
    function Toggle(){
      setToggle(!toggle)
    }
    useEffect(()=>{
        props.getCategories()
        props.getBrands()
        props.getStates()
        props.getProducts()
        props.getUsers()
        props.getOrders()
        props.getStatus()
    }, [])
    
    
    return(
        <div>
           <div className=" d-flex">
                <div className= '' style={toggle? {width: '5rem'}: {width : '14rem'} } >
                    <Sidebar toggle = {toggle} />
                </div>
                {/*<div className= {toggle? "d-block" :"invisible"}>
                    <Sidebar/>
                </div>*/}
                <div className="col overflow-auto bg-light" style={toggle? {width: '80rem'}: {width : '71rem'} }>
                    <Header Toggle={Toggle}/> 
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/products" element={<Products/>} />
                        <Route path="/categories" element={<Categories/>} />
                        <Route path="/stock" element={<ViewStock/>} />
                        <Route path="/users" element={<Users/>} />
                        <Route path="/brands" element={<Brands/>} />
                        <Route path="/orders" element={<Settings/>} />
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
        },
        getProducts : ()=>{
            dispatch(bringProductsThunk())
        },
        getUsers : ()=>{
            dispatch(bringUsersThunk())
        },
        getOrders: ()=>{
            dispatch(bringOrdersThunk())
        },
        getStatus: ()=>{
            dispatch(bringStatusThunk())
        }
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);
