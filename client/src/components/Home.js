import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
function Home(props){
    const [outOfStock, setOutOfStock] = useState(null)
    const [totalStockValue, setTotalStockValue] = useState(null)
    const [totalProducts, setTotalProducts] = useState(null)
    const [totalCategories, setTotalCategories] = useState(null)

    useEffect(()=>{
        console.log(props.products);
        setTotalCategories(props.categories.length)
        setTotalProducts(props.products.length)
        const total = props.products.reduce((accumulator, product) => {
            return accumulator + Number(product.product_price);
        }, 0);
        setTotalStockValue(total)

        const outOfStock = props.products.filter((product)=>{
            return product.product_stock === 0
        })
        setOutOfStock(outOfStock.length)
        
    },[props])
    return(
        <div className=' home p-3 bg-light'>
            <h2 className=' px-3 '>Inventory State</h2>
            <div className='container-fluid'>
                <div className='row'>
                    <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 bg-white ' >
                        <div className='d-flex justify-content-between align-items-center text-white bg-success p-3 border border-secondary shadow-sm'>
                            <i className="bi bi-cart4" style={{fontSize: '2rem'}}></i>
                            <div className=''>
                                <p>Total Products</p>
                                <h2> {totalProducts} </h2>
                            </div>
                        </div>
                    </div>
                    <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 bg-white ' >
                        <div className='d-flex justify-content-between align-items-center text-white bg-warning p-3 border border-secondary shadow-sm'>
                            <i className="bi bi-coin" style={{fontSize: '2rem'}}></i>
                            <div className=''>
                                <p>Total Stock Values</p>
                                {totalStockValue? <h2>{totalStockValue} $</h2>: <h2> </h2>}
                            </div>
                        </div>
                    </div>
                    <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 bg-white ' >
                        <div className='d-flex justify-content-between align-items-center text-white bg-danger p-3 border border-secondary shadow-sm'>
                            <i className="bi bi-cart-x-fill" style={{fontSize: '2rem'}}></i>
                            <div className=''>
                                <p>Out Of Stock</p>
                                <h2> {outOfStock} </h2>
                            </div>
                        </div>
                    </div>
                    <div className=' cart col-md-4 col-12 col-sm-6 col-lg-3 p-3 bg-white ' >
                        <div className='d-flex justify-content-between align-items-center text-white bg-primary p-3 border border-secondary shadow-sm'>
                            <i className="bi bi-tags " style={{fontSize: '2rem'}}></i>
                            <div className=''>
                                <p>All Categories</p>
                                <h2> {totalCategories} </h2>
                            </div>
                        </div>
                    </div>
                    
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
        products : state.products,
        categories : state.categories
    }
}

export default connect(mapStateToProps) (Home);
