import React, {useState} from 'react'
import {connect} from 'react-redux'
import prodimg from '../images/Example.webp'
import '../styles/Products.css'
function Products(props){
    const [records, setRecords] = useState(props.products)
    const [selectfilterBrand, setSelectfilterBrand] = useState('');
    const [selectfilterCategory, setSelectfilterCategory] = useState('');
    const handleShowinsideView=()=>{
        
    }

    const filterByName =(e)=>{
        const newData = props.products.filter(prod =>{ 
            return prod.product_name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(newData)
    }
    
    const filterByRef =(e)=>{
        const newData = props.products.filter(prod =>{ 
            return prod.product_ref.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(newData)
    }

    const filterByCategory =(e)=>{
        const newData = props.products.filter(prod =>{ 
            if(e.target.value === 'Category'){
                return props.products
            }else{
                return prod.category_name.toLowerCase() === e.target.value.toLowerCase()
            }
        })
        setRecords(newData)
        setSelectfilterCategory(e.target.value)
    }

    const filterByBrand =(e)=>{
        const newData = props.products.filter(prod =>{ 
            if(e.target.value === 'Brand'){
                return props.products
            }else{         
                return prod.brand_name.toLowerCase() === e.target.value.toLowerCase()
            }
        })
        setRecords(newData)
        setSelectfilterBrand(e.target.value)
    }


    return(
        <div className='ProductsWindow'>
            <div className='container bg-light'>
                <h1>Manage products</h1>
                <div className='filters'>
                    <input className='filterinp' type='text' placeholder='Filter by Name' onChange={filterByName}/>
                    <input className='filterinp' type='text' placeholder='Filter by Ref' onChange={filterByRef} />
                    <select className='filterinp' value= {selectfilterCategory} onChange={filterByCategory}>
                        <option disabled={true} value=""> Category</option>
                        {props.categories.map((category, index)=>(
                            <option name='option' key={index}> {category.name}</option>
                        ))}
                    </select>
                    <select className='filterinp' value= {selectfilterBrand} onChange={filterByBrand} >
                        <option disabled={true} value=""> Brand</option>
                        {props.brands.map((brand, index)=>(
                            <option name='option' key={index}> {brand.name}</option>
                        ))}
                    </select>
                </div>
                <div className='prod bg-white'>
                    {records.map((product, index)=>(
                        <div className="card" key={index}>
                            <img src= {prodimg} className="card-img-top" alt="product"/>
                            <div className="card-body">
                                <div className='lines'>
                                    <span className='detail'>Reference:</span ><span className='result'> {product.product_ref} </span>
                                </div>
                                <div className='lines'>
                                    <span className='detail'>Name:</span><span className='result'> {product.product_name} </span>
                                </div>
                                <div className='lines'>
                                    <span className='detail'>Brand:</span><span className='result'> {product.brand_name} </span>
                                </div>
                                <div className='lines'>
                                    <span className='detail'>Quantity:</span><span className='result'  style={{color : (product.product_stock === 0)? 'red': 'black'}}> {product.product_stock} </span>
                                </div>
                                <div className='lines'>
                                    <span className='detail'>Price :</span><span className='result price'> {product.product_price}DH </span>
                                </div>
                            </div>
                      </div>
                    ))}     
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
        categories : state.categories,
        brands : state.brands,
        addMsg : state.addMsg,
        deleteMsg : state.deleteMsg,
        updateMsg : state.updateMsg

    }
}
export default connect(mapStateToProps)(Products);