import React, {useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import {connect} from 'react-redux'
import {bringProductsThunk, bringCategoriesThunk, 
    bringBrandsThunk, addProductThunk, deleteProductThunk, updateProductThunk} from '../actions/IMSAction'
import '../styles/Stock.css'

function ViewStock(props){

    const [records, setRecords] = useState(props.products)
    const [selecaddcategory, setSelecaddcategory] = useState('');
    const [selectfilterCategory, setSelectfilterCategory] = useState('');
    const [selectaddbrand, setSelectaddbrand] = useState('');
    const [selectfilterBrand, setSelectfilterBrand] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [deleteCondition, setDeleteCondition] = useState(null)
    const [equivalent, setEquivalent] = useState('')

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
        /*{
            name : 'Description',
            selector : row => row.product_desc,
            sortable : true
        },*/
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
                <span className='btn text-primary' data-toggle="modal" data-target="#viewproduct" onClick={() => handleShow(row)}><i className="bi bi-eye-fill"></i></span>
                <span className="btn" data-toggle="modal" data-target="#update" onClick={() => clickUpdateButton(row)}><i className="bi bi-pencil-fill"></i></span>
                <span className='btn text-danger'   onClick={() => handleDelete(row)}><i className="bi bi-trash-fill"></i></span>
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

    const clickUpdateButton=(row)=>{      
        const ids = ['upname', 'upref', 'upquantity', 'upprice','updesc', 'upcategory', 'upbrand']
        const inputs = ids.map((id) => document.getElementById(id))
        inputs.forEach((inp) => { 
            switch(inp.id){
                case 'upname':
                    inp.value = row.product_name
                    break;
                case 'upref':
                    inp.value = row.product_ref 
                    break;
                case 'upquantity':
                    inp.value = row.product_stock
                    break;
                case 'upprice':
                    inp.value = row.product_price
                    break;
                case 'updesc':
                    inp.value = row.product_desc
                    break;
                case 'upcategory':
                    inp.value = row.category_name
                    break;
                case 'upbrand':
                    inp.value = row.brand_name
                    break;
                default :
                    inp.value = ''
            }
        })
        setDeleteCondition(row.product_ref)
    }

    const hundeleUpdate =(e)=>{
        e.preventDefault()
        var values = [];
        const ids = ['upname', 'upref', 'upquantity', 'upprice','updesc', 'upcategory', 'upbrand']
        const inputs = ids.map((id) => document.getElementById(id))
        inputs.forEach((inp) => { 

            if(inp.name === 'upcategory' ) {
                props.categories.forEach((item)=>{
                    if(item.name === inp.value)
                    values.push(item.id);
                })
            }else if(inp.name === 'upbrand'){
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
            product_desc : values[4],
            category_name: values[5],
            brand_name: values[6],
            condition : deleteCondition
        }
        props.updateProduct(itemInfo)
        
        if (props.updateMsg) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } 
    }

    const handleDelete=(row)=>{
        props.deleteProduct(row.product_ref)
        if (props.deleteMsg) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
        //window.location.reload();
    }

    const handleShow=(row)=>{
        setEquivalent({category : row.category_name, ref : row.product_ref, quantity : row.product_stock})
        const ids = ['detailName', 'detailRef', 'detailQuantity', 'detailPrice','detailDescription', 'detailCategory', 'detailBrand']
        const spans = ids.map((id) => document.getElementById(id))
        spans.forEach((sp) => { 
            switch(sp.id){
                case 'detailName':
                    sp.textContent = row.product_name
                    break;
                case 'detailRef':
                    sp.textContent = row.product_ref 
                    break;
                case 'detailQuantity':
                    sp.textContent = row.product_stock
                    break;
                case 'detailPrice':
                    sp.textContent = row.product_price+'DH'
                    break;
                case 'detailDescription':
                    sp.textContent = row.product_desc
                    break;
                case 'detailCategory':
                    sp.textContent = row.category_name
                    break;
                case 'detailBrand':
                    sp.textContent = row.brand_name
                    break;
                default :
                    sp.textContent = ''
            }
        })
    }
    
    const HandellAddItem = (e)=>{
        e.preventDefault()
        var values = [];
        const ids = ['name', 'ref', 'quantity', 'price','desc', 'category', 'brand']
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
            product_desc : values[4],
            category_name: values[5],
            brand_name: values[6]
        }
        props.addProduct(itemInfo)
        console.log(itemInfo)
        if (props.addMsg) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } 
        //window.location.reload();
    }

    const handleShowinsideView=()=>{

    }


    return(
        <div className='products bg-light'>
            <div className='container'>
                <h2>Stock Manager</h2>
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
                <div className='container mt-3'>
                { showAlert? ( <div className="alert alert-success" role="alert"> {props.deleteMsg} </div> ):''}
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
                        actions ={<button type="button" className="btn btn-info" data-toggle="modal" data-target="#addproduct" >Add Item</button>}
                    >
                    </DataTable>
                </div>
                {/* Add Item Modal */}
                <div className="modal fade" id="addproduct" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                        {showAlert && ( <div className="alert alert-success" role="alert"> {props.addMsgMsg} </div> )} 
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
                            <div className="roo">
                                <label htmlFor="desc">Description :</label> 
                                <textarea id="desc" type="text"  name="desc"/>
                            </div>
                        </div>
                        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={HandellAddItem}>Add Item</button>
                        </div>
                        </div>
                    </div>
                </div>
                {/* Update Item Modal */}
                <div className="modal fade" id="update" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                        {showAlert && ( <div className="alert alert-success" role="alert"> {props.updateMsg} </div> )} 
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Update Item</h3>
                            <span type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </span>
                        </div>
                        <div className="modal-body">
                            <div className="roo">
                                <label htmlFor="upname">Name:</label>
                                <input id="upname" type="text" name="upname"/>
                            </div>
                            <div className="roo">
                                <label htmlFor="upref">Ref :</label> 
                                <input id="upref" type="text" name="upref"/>
                            </div>
                            <div className="roo">
                                <label htmlFor="upquantity">Quantity :</label> 
                                <input id="upquantity" type="number" min={0} max={30} name="upquantity"/>
                            </div>
                            <div className="roo">
                                <label htmlFor="upprice">Price :</label> 
                                <input id="upprice" type="text" name="upprice"/>
                            </div>
                            <div className="roo">
                                <label htmlFor="upcategory">Category :</label> 
                                <select  id="upcategory" name="upcategory" >
                                <option disabled={true} value=""> Category</option>
                                    {props.categories.map((category)=>(
                                        <option name='option' key={category.id}> {category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="roo">
                                <label htmlFor="upbrand">Brand :</label>
                                <select id="upbrand" name="upbrand" >
                                <option disabled={true} value=""> Brand</option>
                                    {props.brands.map((brand)=>(
                                        <option name='option' key={brand.id}> {brand.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="roo">
                                <label htmlFor="updesc">Description :</label> 
                                <textarea id="updesc" type="text"  name="updesc"/>
                            </div>
                        </div>
                        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={hundeleUpdate}>Update Item</button>
                        </div>
                        </div>
                    </div>
                </div>
                {/* View Item Modal */}
                <div className="modal fade " id="viewproduct" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg view">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Product Details</h3>
                            <span type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </span>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className=' left col-auto col-sm-6 col-md-6 col-lg-6'>
                                        <div className='lines'>
                                            <span className='detail ' >Reference:</span><span  id='detailRef' className='leftR text-primary'> </span>
                                        </div>
                                        <div className='lines'>
                                            <span className='detail'  >Name:</span><span id='detailName' className='leftR'>  </span>
                                        </div>
                                        <div className='lines'>
                                            <span className='detail'  >Quantity:</span>
                                            <span id='detailQuantity' className='leftR' style={{color : (equivalent.quantity === 0)? 'red': 'black'}} > </span>
                                        </div>
                                        <div className='lines'>
                                            <span className='detail'  >Description:</span><span id='detailDescription' className='leftR'>  </span>
                                        </div>
                                        <div className='lines'>
                                            <span className='detail'  >Category:</span><span id='detailCategory' className='leftR'>  </span>
                                        </div>
                                        <div className='lines'>
                                            <span className='detail'  >Brand:</span><span id='detailBrand' className='leftR'>  </span>
                                        </div>
                                        <div className='lines'>
                                            <span className='detail'  >Equivalents:</span>
                                            <span id='detailBrand' className='leftR'> 
                                                {props.products.map((product)=>(
                                                    (product.category_name === equivalent.category && product.product_ref !== equivalent.ref)?
                                                    <span className='text-success'> {product.product_ref}, </span> : ''
                                                ))}
                                            </span>
                                        </div>
                                </div>
                                <div className=' right col-auto col-sm-6 col-md-6 col-lg-6'>
                                    <div className='productImage'></div>
                                    <div className=''>
                                        <span className='text-primary'>Price :</span><span id='detailPrice'  className='price'> </span>
                                    </div>
                                </div>
                            </div>                  
                        </div>
                        <div className="modal-footer">
                           <h3 className='text-dark equivalet'>Equivalents:</h3> 
                            <div className='equivals'>
                                {props.products.map((product)=>(
                                    (product.category_name === equivalent.category && product.product_ref !== equivalent.ref)?(
                                    <div className="card border-primary mb-3" style={{maxWidth: '9.2rem'}}>
                                        <div className="card-body text-primary infor ">
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
                                                <span className='detail'>Quantity:</span><span className='result'> {product.product_stock} </span>
                                            </div>
                                            <div className='lines'>
                                                <span className='detail'>Price :</span><span className='result'> {product.product_price}DH </span>
                                            </div>
                                        </div>
                                        <div className=" c-footer">
                                            <button className='btn text-primary' data-toggle="modal" data-target="#viewproduct" onClick={() => handleShowinsideView()}>
                                                <i className="bi bi-eye-fill"></i>
                                            </button>
                                        </div>
                                    </div>): ''
                                ))}
                            </div>
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
        categories : state.categories,
        brands : state.brands,
        addMsg : state.addMsg,
        deleteMsg : state.deleteMsg,
        updateMsg : state.updateMsg

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
        },
        deleteProduct : (product_ref)=>{
            dispatch(deleteProductThunk(product_ref))
        },
        updateProduct : (product)=>{
            dispatch(updateProductThunk(product))
        }
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps) (ViewStock);
