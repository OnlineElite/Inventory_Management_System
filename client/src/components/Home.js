import React from 'react'
import '../styles/Home.css'
function Home(){


    return(
        <div className=' home p-3 bg-light'>
            <h2 className=' px-3 '>Inventory State</h2>
            <div className='container-fluid'>
                <div className='row'>
                    <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 bg-white ' >
                        <div className='d-flex justify-content-between align-items-center text-white bg-success p-3 border border-secondary shadow-sm'>
                            <i class="bi bi-cart4" style={{fontSize: '2rem'}}></i>
                            <div className=''>
                                <p>Total Products</p>
                                <h2>21</h2>
                            </div>
                        </div>
                    </div>
                    <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 bg-white ' >
                        <div className='d-flex justify-content-between align-items-center text-white bg-warning p-3 border border-secondary shadow-sm'>
                            <i class="bi bi-coin" style={{fontSize: '2rem'}}></i>
                            <div className=''>
                                <p>Total Stock Values</p>
                                <h2>53200.00$</h2>
                            </div>
                        </div>
                    </div>
                    <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 bg-white ' >
                        <div className='d-flex justify-content-between align-items-center text-white bg-danger p-3 border border-secondary shadow-sm'>
                            <i class="bi bi-cart-x-fill" style={{fontSize: '2rem'}}></i>
                            <div className=''>
                                <p>Out Of Stock</p>
                                <h2>2</h2>
                            </div>
                        </div>
                    </div>
                    <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 bg-white ' >
                        <div className='d-flex justify-content-between align-items-center text-white bg-primary p-3 border border-secondary shadow-sm'>
                            <i class="bi bi-tags " style={{fontSize: '2rem'}}></i>
                            <div className=''>
                                <p>All Categories</p>
                                <h2>3</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;