import React, {useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import {connect} from 'react-redux'
import {bringProductsThunk, bringCategoriesThunk, bringBrandsThunk, addProductThunk} from '../actions/IMSAction'
import '../styles/Stock.css'

function ViewStock(props){

    const [records, setRecords] = useState(props.products)
    const [selecaddcategory, setSelecaddcategory] = useState('');
    const [selectfilterCategory, setSelectfilterCategory] = useState('');
    const [selectaddbrand, setSelectaddbrand] = useState('');
    const [selectfilterBrand, setSelectfilterBrand] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const callActions =()=>{
        props.getProducts()
        props.getCategories()
        props.getBrands()
    }
    useEffect(()=>{
        callActions()
    }, [])

    const columns = [
        {
            name : 'Name',
            selector : row => row.product_name,
            sortable : true
        },
        {
            name : 'Ref',
            selector : row => row.product_ref,
            sortable : true
        },
        {
            name : 'Stock',
            selector : row => row.product_stock,
            sortable : true
        },
        {
            name : 'Price',
            selector : row => row.product_price,
            sortable : true
        },
        {
            name : 'Category',
            selector : row => row.category_name,
            sortable : true
        },
        {
            name : 'Brand',
            selector : row => row.brand_name,
            sortable : true
        },
        {
            name: 'Actions',
            cell: (row) => (
              <div className='d-flex'>
                <span className='btn text-primary' onClick={() => handleShow(row)}><i className="bi bi-eye-fill"></i></span>
                <span className='btn' onClick={() => handleUpdate(row)}><i className="bi bi-pencil-fill"></i></span>
                <span className='btn text-danger' onClick={() => handleDelete(row)}><i className="bi bi-trash-fill"></i></span>
              </div>
            ),
            ignoreRowClick: true,
            allowoverflow: true,
            
        }
    ];
    
    const filterByName =(e)=>{
        const newData = props.products.filter(row =>{ 
            return row.product_name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(newData)
    }

    const filterByRef =(e)=>{
        const newData = props.products.filter(row =>{ 
            return row.product_ref.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(newData)
    }

    const filterByCategory =(e)=>{
        const newData = props.products.filter(row =>{ 
            if(e.target.value === 'Category'){
                return props.products
            }else{
                return row.category_name.toLowerCase() === e.target.value.toLowerCase()
            }
        })
        setRecords(newData)
        setSelectfilterCategory(e.target.value)
        
    }

    const filterByBrand =(e)=>{
        const newData = props.products.filter(row =>{ 
            if(e.target.value === 'Brand'){
                return props.products
            }else{         
                return row.brand_name.toLowerCase() === e.target.value.toLowerCase()
            }
        })
        setRecords(newData)
        setSelectfilterBrand(e.target.value)
        
    }

    const addCategory =(e)=>{
        setSelecaddcategory(e.target.value);
    }
    const addBrand =(e)=>{
        setSelectaddbrand(e.target.value);
    }

    const handleUpdate=()=>{

    }

    const handleDelete=()=>{

    }

    const handleShow=()=>{

    }
    
    const HandellAddItem = (e)=>{
        e.preventDefault()
        var values = [];
        const ids = ['name', 'ref', 'quantity', 'price', 'category', 'brand']
        const inputs = ids.map((id) => document.getElementById(id))
        inputs.forEach((inp) => { 

            if(inp.name === 'category' ) {
                props.categories.forEach((item)=>{
                    if(item.name ===inp.value)
                    values.push(item.id);
                })
            }else if(inp.name === 'brand'){
                props.brands.forEach((item)=>{
                    if(item.name === inp.value) 
                    values.push(item.id);
                })
            }else{
                values.push(inp.value);
            }
        })
        const itemInfo = {
            product_name: values[0],
            product_ref: values[1],
            product_stock: values[2],
            product_price: values[3],
            category_name: values[4],
            brand_name: values[5]
        }
        props.addProduct(itemInfo)
        inputs.forEach((inp) => inp.value = ' ')
        if (props.response) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } 
    }

    return(
        <div className='products bg-light'>
            <div className='container'>
                <h1>Welcome in Products</h1>
                <div className='filters'>
                    <input type='text' placeholder='Filter by Name' onChange={filterByName}/>
                    <input type='text' placeholder='Filter by Ref' onChange={filterByRef} />
                    <select value= {selectfilterCategory} onChange={filterByCategory}>
                        <option disabled={true} value=""> Category</option>
                        {props.categories.map((category, index)=>(
                            <option name='option' key={index}> {category.name}</option>
                        ))}
                    </select>
                    <select value= {selectfilterBrand} onChange={filterByBrand} >
                        <option disabled={true} value=""> Brand</option>
                        {props.brands.map((brand, index)=>(
                            <option name='option' key={index}> {brand.name}</option>
                        ))}
                    </select>
                </div>
                <div className='container mt-3'>
                    <DataTable 
                        title = {'Manage Stock'}
                        columns ={columns} 
                        data ={records} 
                        selectableRows 
                        selectableRowsHighlight
                        highlightOnHover
                        fixedHeader 
                        bordered
                        pagination
                        actions ={<button type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModal" >Add Item</button>}
                    >
                    </DataTable>
                </div>
                {/* Add Item Modal */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        {showAlert && ( <div className="alert alert-success" role="alert"> {props.response} </div> )} 
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Add Item To Stock</h3>
                            <span type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </span>
                        </div>
                        <div className="modal-body">
                            <div className="roo">
                                <label htmlFor="name">Name:</label>
                                <input id="name" type="text" name="name"/>
                            </div>
                            <div className="roo">
                                <label htmlFor="ref">Ref :</label> 
                                <input id="ref" type="text" name="ref"/>
                            </div>
                            <div className="roo">
                                <label htmlFor="quantity">Quantity :</label> 
                                <input id="quantity" type="number" min={0} max={30} name="quantity"/>
                            </div>
                            <div className="roo">
                                <label htmlFor="price">Price :</label> 
                                <input id="price" type="text" name="price"/>
                            </div>
                            <div className="roo">
                                <label htmlFor="category">Category :</label> 
                                <select value= {selecaddcategory} id="category" name="category"  onChange={addCategory}>
                                <option disabled={true} value=""> Category</option>
                                    {props.categories.map((category)=>(
                                        <option name='option' key={category.id}> {category.name}</option>
                                    ))}
                                </select>
                                
                            </div>
                            <div className="roo">
                                <label htmlFor="brand">Brand :</label>
                                <select value= {selectaddbrand} id="brand" name="brand" onChange={addBrand}>
                                <option disabled={true} value=""> Brand</option>
                                    {props.brands.map((brand)=>(
                                        <option name='option' key={brand.id}> {brand.name}</option>
                                    ))}
                                </select>
        
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={HandellAddItem}>Add Item</button>
                        </div>
                        </div>
                    </div>
                </div>          

            </div>
        </div>
    )
}

const mapStateToProps =(state)=>{
    console.log('message add', state.addMsg)
    return{
        response : state.error,
        isAuthenticated : state.isAuthenticated,
        isAdmin : state.isAdmin,
        products : state.products,
        categories : state.categories,
        brands : state.brands,
        response : state.addMsg
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        getProducts : ()=>{
            dispatch(bringProductsThunk())
        },
        getCategories : ()=>{
            dispatch(bringCategoriesThunk())
        },
        getBrands : ()=>{
            dispatch(bringBrandsThunk())
        },
        addProduct : (product)=>{
            dispatch(addProductThunk(product))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ViewStock);
