import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.js';
import ClipLoader from "react-spinners/ClipLoader";
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
        borderRadius: '15px',
        padding: '20px',
        color:'white',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'space-between',
        backgroundColor : 'rgb(11,217,11)',
        boxShadow: '0 4px 8px 0 rgb(59, 59, 59)'
    }

    return(
        <div className=' home p-3 bg-light'>
            <h3 className=' px-3 '>Inventory State</h3>
            {isLoading? 
            <div className='loadind ' style={{width:'100%', height:'50vh', textAlign:'center', paddingTop:'3rem'}}>
                <ClipLoader color={'#36d7b7'} loading={isLoading} size={60} />Loading... </div>:
            <div className='container-fluid'>
                {props.states.map((items, index)=>(
                    < div key={index}>
                        <div className='row'>
                            <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 ' >
                                <div className=' bg-success'  style={stiling}>
                                    <i className="bi bi-cart4" style={{fontSize: '2rem'}}></i>
                                    <div className=''>
                                        <p>Total Products</p>
                                        {items.total_products? <h3 >{items.total_products}</h3>: <h3>0</h3>}
                                    </div>
                                </div>
                            </div>
                            <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 ' >
                                <div className=' bg-warning' style={stiling}>
                                    <i className="bi bi-coin" style={{fontSize: '2rem'}}></i>
                                    <div className=''>
                                        <p>Total Stock Amount</p>
                                        {items.total_values? <h3 >{items.total_values}DH</h3>: <h3>0' DH'</h3>}
                                    </div>
                                </div>
                            </div>
                            <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 ' >
                                <div className=' bg-danger' style={stiling}>
                                    <i className="bi bi-cart-x-fill" style={{fontSize: '2rem'}}></i>
                                    <div className=''>
                                        <p>Total Out Of Stock</p>
                                        {items.total_outofstock? <h3 >{items.total_outofstock}</h3>: <h3>0</h3>}
                                    </div>
                                </div>
                            </div>
                            <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 ' >
                                <div className=' bg-primary' style={stiling}>
                                    <i className="bi bi-tags " style={{fontSize: '2rem'}}></i>
                                    <div className=''>
                                        <p>Total Categories</p>
                                        {items.total_categories? <h3 >{items.total_categories}</h3>: <h3>0</h3>}
                                    </div>
                                </div>
                            </div>
                            <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3  ' >
                                <div className=' bg-dark' style={stiling}>
                                    <i className="bi bi-flag-fill" style={{fontSize: '2rem'}}></i>
                                    <div className=''>
                                        <p>Total Brands</p>
                                        {items.total_brands? <h3 >{items.total_brands}</h3>: <h3>0</h3>}
                                    </div>
                                </div>
                            </div>
                            <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 ' >
                                <div className=' bg-info' style={stiling}>
                                    <i className="bi bi-people-fill" style={{fontSize: '2rem'}}></i>
                                    <div className=''>
                                        <p>Total Users</p>
                                        {items.total_users? <h3 >{items.total_users}</h3>: <h3>0</h3>}
                                    </div>
                                </div>
                            </div>
                            <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 ' >
                                <div className='' style={stiling} >
                                <i class="bi bi-boxes" style={{fontSize: '2rem'}}></i> 
                                    <div className=''>
                                        <p>Total Orders</p>
                                        {items.total_orders? <h3 >{items.total_orders}</h3>: <h3>0</h3>}
                                    </div>
                                </div>
                            </div>
                            <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 ' >
                                <div className='' style={last} >
                                <i class="bi bi-cart-check" style={{fontSize: '2rem'}}></i> 
                                    <div className=''>
                                        <p>Sales</p>
                                        {items.total_delivered? <h3 >{items.total_delivered}</h3>: <h3>0</h3>}
                                    </div>
                                </div>
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
