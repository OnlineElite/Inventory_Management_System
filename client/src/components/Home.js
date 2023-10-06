import React from 'react'
import { connect } from 'react-redux'
function Home(props){

    return(
        <div className=' home p-3 bg-light'>
            <h2 className=' px-3 '>Inventory State</h2>
            <div className='container-fluid'>
                {props.states.map((items, index)=>(
                    < div key={index}>
                        <div className='row'>
                            <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 bg-white ' >
                                <div className='d-flex justify-content-between align-items-center text-white bg-success p-3 border border-secondary shadow-sm'>
                                    <i className="bi bi-cart4" style={{fontSize: '2rem'}}></i>
                                    <div className=''>
                                        <p>Total Products</p>
                                        <h2> {items.total_products} </h2>
                                    </div>
                                </div>
                            </div>
                            <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 bg-white ' >
                                <div className='d-flex justify-content-between align-items-center text-white bg-warning p-3 border border-secondary shadow-sm'>
                                    <i className="bi bi-coin" style={{fontSize: '2rem'}}></i>
                                    <div className=''>
                                        <p>Total Stock Values</p>
                                        {items.total_values? <h2 style={{fontSize : '30px'}}>{items.total_values} $</h2>: <h2></h2>}
                                    </div>
                                </div>
                            </div>
                            <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 bg-white ' >
                                <div className='d-flex justify-content-between align-items-center text-white bg-danger p-3 border border-secondary shadow-sm'>
                                    <i className="bi bi-cart-x-fill" style={{fontSize: '2rem'}}></i>
                                    <div className=''>
                                        <p>Out Of Stock</p>
                                        <h2> {items.total_outofstock} </h2>
                                    </div>
                                </div>
                            </div>
                            <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 bg-white ' >
                                <div className='d-flex justify-content-between align-items-center text-white bg-primary p-3 border border-secondary shadow-sm'>
                                    <i className="bi bi-tags " style={{fontSize: '2rem'}}></i>
                                    <div className=''>
                                        <p>All Categories</p>
                                        <h2> {items.total_categories} </h2>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className='row'>
                            <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 bg-white ' >
                                <div className='d-flex justify-content-between align-items-center text-white bg-dark p-3 border border-secondary shadow-sm'>
                                    <i className="bi bi-flag-fill" style={{fontSize: '2rem'}}></i>
                                    <div className=''>
                                        <p>Total Brands</p>
                                        <h2> {items.total_brands} </h2>
                                    </div>
                                </div>
                            </div>
                            <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 bg-white ' >
                                <div className='d-flex justify-content-between align-items-center text-white bg-info p-3 border border-secondary shadow-sm'>
                                    <i className="bi bi-people-fill" style={{fontSize: '2rem'}}></i>
                                    <div className=''>
                                        <p>Total Users</p>
                                        <h2>{items.total_users}</h2>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </ div>                   
                ))}
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


export default connect(mapStateToProps) (Home);
