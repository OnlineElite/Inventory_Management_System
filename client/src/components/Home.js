import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.js';
import ClipLoader from "react-spinners/ClipLoader";
import '../styles/Home.css'
function Home(props){

    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        if(props.states.length !== 0){
            setIsLoading(false)
        }
    },[props.states])

    const stiling = {
        borderRadius: '15px',
        padding: '20px',
        color:'white',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'space-between',
        backgroundColor : '#022a61',
        boxShadow: '0 4px 8px 0 rgb(59, 59, 59)'
    }

    const last ={
        backgroundColor : 'rgb(11,217,11)',
    }

    return(
        <div className=' home p-3 bg-white' id='home'>
            <h3 className=' px-3 '>Inventory State</h3>
            {isLoading? 
            <div className='loadind ' style={{width:'100%', height:'50vh', textAlign:'center', paddingTop:'3rem'}}>
                <ClipLoader color={'#36d7b7'} loading={isLoading} size={60} />Loading... </div>:
            <div className='container-fluid'>
                {props.states.map((items, index)=>(
                    < div className="cartBox" key={index}>
                        <div className="cart bg-success">
                            <div className='texto'>
                                {items.total_products ? <div className="numbers ">{items.total_products}</div>: <div className="numbers">0</div>}
                                <div className="cartName">Total Products</div>
                            </div>
                            <div className="iconBx" >
                                <i className="bi bi-award-fill"></i>
                            </div>
                        </div>
                        <div className="cart bg-warning">
                            <div className='texto'>
                                {items.total_values ? <div className="numbers ">{Number(items.total_values).toFixed(0)}DH</div>: <div  className="numbers ">0</div>}
                                <div className="cartName">Total Stock Amount</div>
                            </div>
                            <div className="iconBx" >
                                <i className="bi bi-coin"></i>
                            </div>
                        </div>
                        <div className="cart bg-danger">
                            <div className='texto'>
                                {items.total_outofstock ? <div className="numbers">{items.total_outofstock}</div>: <div className="numbers">0</div>}
                                <div className="cartName">Total Out Of Stock</div>
                            </div>
                            <div className="iconBx ">
                                <i className="bi bi-cart-x-fill"></i>
                            </div>
                        </div>
                        <div className="cart bg-primary">
                            <div className='texto'>
                                {items.total_categories ? <div className="numbers">{items.total_categories}</div>: <div className="numbers ">0</div>}
                                <div className="cartName ext-primary">Total Categories</div>
                            </div>
                            <div className="iconBx ">
                                <i className="bi bi-grid-3x3-gap-fill"></i>
                            </div>
                        </div>
                        <div className="cart " style={{backgroundColor : '#6F0791'}}>
                            <div className='texto'>
                                {items.total_brands ? <div className="numbers">{items.total_brands}</div>: <div className="numbers">0</div>}
                                <div className="cartName">Total Brands</div>
                            </div>
                            <div className="iconBx ">
                                <i className="bi bi-flag-fill"></i>
                            </div>
                        </div>
                        <div className="cart bg-info">
                            <div className='texto'>
                                {items.total_users ? <div className="numbers">{items.total_users}</div>: <div className="numbers ">0</div>}
                                <div className="cartName">Total Users</div>
                            </div>
                            <div className="iconBx ">
                                <i className="bi bi-people-fill"></i>
                            </div>
                        </div>
                        <div className="cart" style={{backgroundColor: '#022a61'}}>
                            <div className='texto' >
                                {items.total_orders ? <div  className="numbers">{items.total_orders}</div>: <div className="numbers">0</div>}
                                <div className="cartName">Total Orders</div>
                            </div>
                            <div className="iconBx">
                                <i className="bi bi-boxes"></i>
                            </div>
                        </div>
                        <div className="cart" style={{backgroundColor: 'rgb(11,217,11)'}}>
                            <div className='texto'>
                                {items.total_delivered ? <div  className="numbers">{items.total_delivered}</div>: <div  className="numbers">0</div>}
                                <div className="cartName">Total Sales</div>
                            </div>
                            <div className="iconBx" >
                                <i className="bi bi-cart-check"></i>
                            </div>
                        </div>
                    </ div>                   
                ))}
            </div>}
            
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


export default connect(mapStateToProps) (Home);
