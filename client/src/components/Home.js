import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ClipLoader from "react-spinners/ClipLoader";
function Home(props){

    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        if(props.states.length !== 0){
            setIsLoading(false)
        }
    },[props.states])

    return(
        <div className=' home p-3 bg-light'>
            <h2 className=' px-3 '>Inventory State</h2>
            {isLoading? 
            <div className='loadind' style={{width:'100%', height:'50vh', textAlign:'center', paddingTop:'3rem'}}>
                <ClipLoader color={'#36d7b7'} loading={isLoading} size={60} />Loading... </div>:
            <div className='container-fluid'>
                {props.states.map((items, index)=>(
                    < div key={index}>
                        <div className='row'>
                            <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 bg-white ' >
                                <div className='d-flex justify-content-between align-items-center text-white bg-success p-3 border border-secondary shadow-sm'>
                                    <i className="bi bi-cart4" style={{fontSize: '2rem'}}></i>
                                    <div className=''>
                                        <p>Total Products</p>
                                        <h3> {items.total_products} </h3>
                                    </div>
                                </div>
                            </div>
                            <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 bg-white ' >
                                <div className='d-flex justify-content-between align-items-center text-white bg-warning p-3 border border-secondary shadow-sm'>
                                    <i className="bi bi-coin" style={{fontSize: '2rem'}}></i>
                                    <div className=''>
                                        <p>Total Stock Amount</p>
                                        {items.total_values? <h3 >{items.total_values}DH</h3>: <h3>''</h3>}
                                    </div>
                                </div>
                            </div>
                            <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 bg-white ' >
                                <div className='d-flex justify-content-between align-items-center text-white bg-danger p-3 border border-secondary shadow-sm'>
                                    <i className="bi bi-cart-x-fill" style={{fontSize: '2rem'}}></i>
                                    <div className=''>
                                        <p>Total Out Of Stock</p>
                                        <h3> {items.total_outofstock} </h3>
                                    </div>
                                </div>
                            </div>
                            <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 bg-white ' >
                                <div className='d-flex justify-content-between align-items-center text-white bg-primary p-3 border border-secondary shadow-sm'>
                                    <i className="bi bi-tags " style={{fontSize: '2rem'}}></i>
                                    <div className=''>
                                        <p>Total Categories</p>
                                        <h3> {items.total_categories} </h3>
                                    </div>
                                </div>
                            </div>
                            <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 bg-white ' >
                                <div className='d-flex justify-content-between align-items-center text-white bg-dark p-3 border border-secondary shadow-sm'>
                                    <i className="bi bi-flag-fill" style={{fontSize: '2rem'}}></i>
                                    <div className=''>
                                        <p>Total Brands</p>
                                        <h3> {items.total_brands} </h3>
                                    </div>
                                </div>
                            </div>
                            <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 bg-white ' >
                                <div className='d-flex justify-content-between align-items-center text-white bg-info p-3 border border-secondary shadow-sm'>
                                    <i className="bi bi-people-fill" style={{fontSize: '2rem'}}></i>
                                    <div className=''>
                                        <p>Total Users</p>
                                        <h3>{items.total_users}</h3>
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
