import React, {useState } from 'react'
import prodimg from '../images/Default.png'
import DataTable from 'react-data-table-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {connect} from 'react-redux'
import { addProductThunk, deleteProductThunk, updateProductThunk} from '../actions/IMSAction'
import { DatePicker } from 'antd';
import '../styles/Stock.css'

const { RangePicker } = DatePicker;

function ViewStock(props){

    const [records, setRecords] = useState(props.products)
    const [selecaddcategory, setSelecaddcategory] = useState('');
    const [selectfilterCategory, setSelectfilterCategory] = useState('');
    const [selectaddbrand, setSelectaddbrand] = useState('');
    const [selectfilterBrand, setSelectfilterBrand] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [deleteCondition, setDeleteCondition] = useState(null)
    const [equivalent, setEquivalent] = useState('')
    const [extentionMsg, setExtentionMsg] = useState( '')

    const columns = [
        {
            name : 'Name',
            selector : row => row.product_name,
            sortable : true
        },
        {
            name : 'Created At',
            selector : row => row.product_date,
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

    function handleCloseModal(){ 
           
        document.getElementById("addproduct").classList.remove("show", "d-block");
        document.getElementById("update").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
    }
    
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
        const ids = ['upname', 'upref', 'upquantity', 'upprice','updesc', 'upcategory', 'upbrand', 'upimage']
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
                case 'upimage':
                    inp.src = row.product_image != null
                          ? `http://localhost:3005/uploads/${row.product_image}`
                          : prodimg
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
        const ids = ['upname', 'upref', 'upquantity', 'upprice','updesc', 'upcategory', 'upbrand', 'upimage']
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
            }else if (inp.id === 'upimage' && inp.files.length > 0) {
                values.push(inp.files[0].name);
            }else{
                values.push(inp.value);
            }
        })
        
        const formData = new FormData();
        formData.append('name', values[0]);
        formData.append('ref', values[1]);
        formData.append('quantity', values[2]); 
        formData.append('price', values[3]);
        formData.append('desc', values[4]);
        formData.append('category', values[5]);
        formData.append('brand', values[6]);
        formData.append('condition', deleteCondition);
        if (inputs[7].type === "file" && inputs[7].files.length > 0) {
            formData.append("image", inputs[7].files[0]);
        }

        function getExtension(filename) {
            return filename.split('.').pop()
        }  
        let extention = getExtension(inputs[7].files[0].name).toLowerCase()
        if(extention === 'jpg' || extention === 'png' || extention === 'webp' || extention === 'jpeg'){
            console.log('accepted')
            props.updateProduct(formData)
        }else{
            console.log('not accepted')
            setExtentionMsg('File extention not suported plase enter a file with(jpg, png or webp)')
            if (extentionMsg) {
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            } 
        }
        if (props.updateMsg) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } 
        handleCloseModal()     
        setRecords(props.products) 
    }

    const handleDelete=(row)=>{
        props.deleteProduct(row.product_ref)
        if (props.deleteMsg) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }  
        setRecords(props.products)
    }

    const handleShow=(row)=>{
        setEquivalent({category : row.category_name, ref : row.product_ref, quantity : row.product_stock})
        const ids = ['detailName', 'detailRef', 'detailQuantity', 'detailPrice','detailDescription', 'detailCategory', 'detailBrand', 'prodImg']
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
                case 'prodImg':
                    sp.src = row.product_image != null
                          ? `http://localhost:3005/uploads/${row.product_image}`
                          : prodimg
                        break;
                default :
                    sp.textContent = ''
            }
        })
    }
    
    const HandellAddItem = (e)=>{
        e.preventDefault()
        const values = [];
        const ids = ['name', 'ref', 'quantity', 'price', 'desc', 'category', 'brand', 'image'];
        const inputs = ids.map((id) => document.getElementById(id));

        inputs.forEach((inp) => {
        if (inp.id === 'category') {
            const category = props.categories.find((item) => item.name === inp.value);
            if (category) {
            values.push(category.id);
            }
        } else if (inp.id === 'brand') {
            const brand = props.brands.find((item) => item.name === inp.value);
            if (brand) {
            values.push(brand.id);
            }
        } else if (inp.id === 'image' && inp.files.length > 0) {
            values.push(inp.files[0].name);
        } else {
            values.push(inp.value);
        }
        });

        const formData = new FormData();
        formData.append('name', values[0]);
        formData.append('ref', values[1]);
        formData.append('quantity', values[2]); 
        formData.append('price', values[3]);
        formData.append('desc', values[4]);
        formData.append('category', values[5]);
        formData.append('brand', values[6]);

        if (inputs[7].type === "file" && inputs[7].files.length > 0) {
            formData.append("image", inputs[7].files[0]);
        }

        function getExtension(filename) {
            return filename.split('.').pop()
        }  
        let extention = getExtension(inputs[7].files[0].name).toLowerCase()
        if(extention === 'jpg' || extention === 'png' || extention === 'webp' || extention === 'jpeg'){
            props.addProduct(formData)
        }else{
            setExtentionMsg('File extention not suported plase enter a file with(jpg, png or webp)')
            if (extentionMsg) {
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            } 
        }
    
        if (props.addMsg) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } 
        handleCloseModal()     
        setRecords(props.products)
    }

    const handleShowinsideView=()=>{
        
    }

    const tableCustomStyles = {
        headRow: {
          style: {
            color:'#223336',
            backgroundColor: 'lightBlue'
          },
        },
        rows: {
          style: {
            color: "STRIPEDCOLOR",
            backgroundColor: "STRIPEDCOLOR"
          },
          stripedStyle: {
            color: "NORMALCOLOR",
            backgroundColor: "NORMALCOLOR"
          }
        }
    }

    const handeleReset =(e)=>{
        e.preventDefault()
        const ids = ['filterName', 'filterRef', 'filterCategory', 'filterBrand', 'filterDate']
        const inputs = ids.map((id)=> document.getElementById(id))
        inputs.forEach((inp)=> {
            switch(inp.id){
                case 'filterName': inp.value = ''; break;
                case 'filterRef': inp.value = ''; break;
                case 'filterCategory': inp.selectedIndex = 0; break;
                case 'filterBrand': inp.selectedIndex = 0; break;
                case 'filterDate': inp.value = []; break;
                default: inp.value = ''
            }
        })
        setRecords(props.products)
    }

    return(
        <div className='products bg-light' id='stock'>
            <div className='container'>
                <h2>Stock Manager</h2>
                <div className='dates mt-5'>
                    {showAlert && props.addMsgMsg && ( <div className="alert alert-success" role="alert"> {props.addMsgMsg} </div> )}
                    {showAlert && extentionMsg && ( <div className="alert alert-danger" role="alert"> {extentionMsg} </div> )}
                    {showAlert && props.updateMsg && ( <div className="alert alert-success" role="alert"> {props.updateMsg} </div> )}
                    {showAlert && props.deleteMsg &&( <div className="alert alert-success" role="alert"> {props.deleteMsg} </div> )}
                    <RangePicker
                        id='filterDate'
                        onChange={(values) =>{
                            if (values && values.length === 2) {
                                let startDate = values[0].format('YYYY-MM-DD')
                                let endDate = values[1].format('YYYY-MM-DD')
                                const theRest = props.products.filter((row)=>{

                                    const date = new Date(row.product_date);
                                    const year = date.getFullYear();
                                    const month = String(date.getMonth() + 1).padStart(2, '0');
                                    const day = String(date.getDate()).padStart(2, '0');
                                    const formattedDate = `${year}-${month}-${day}`;
                                    
                                    return (startDate <= formattedDate && formattedDate<= endDate)
                                })
                                setRecords(theRest)
                            }else {
                                setRecords(props.products)
                            }
                        }}
                    />
                    <span className='refresh py-2  px-3' onClick={handeleReset}><FontAwesomeIcon className='reload' icon="fa-solid fa-rotate-right" /></span>
                </div>
                <div className='filters'>
                    <input id='filterName' className='filterinp py-2' type='text' placeholder='Filter by Name' onChange={filterByName}/>
                    <input id='filterRef' className='filterinp py-2' type='text' placeholder='Filter by Ref' onChange={filterByRef} />
                    <select id='filterCategory' className='filterinp py-2' value= {selectfilterCategory} onChange={filterByCategory}>
                        <option disabled={true} value=""> Category</option>
                        {props.categories.map((category, index)=>(
                            <option name='option' key={index}> {category.name}</option>
                        ))}
                    </select>
                    <select id='filterBrand' className='filterinp py-2' value= {selectfilterBrand} onChange={filterByBrand} >
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
                        customStyles={tableCustomStyles}
                        actions ={<button type="button" className="btn btn-info" data-toggle="modal" data-target="#addproduct" >Add Product</button>}
                    >
                    </DataTable>
                </div>
                {/* Add Item Modal */}
                <div className="modal fade" id="addproduct" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
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
                            <div className="roo">
                                <label htmlFor="image">Image :</label> 
                                <input id="image" type="file"  name="image" />
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
                            <div className="roo">
                                <label htmlFor="image">Image :</label> 
                                <input id="upimage" type="file"  name="image" />
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
                                    <div className='productImage'> <img id='prodImg' src= '' alt='product'/> </div>
                                    <div className=''>
                                        <span className='text-primary'>Price : </span><span id='detailPrice'  className='price'> </span>
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
                                                <span className='detail'>Quantity:</span><span className='result'  style={{color : (product.product_stock === 0)? 'red': 'black'}}> {product.product_stock} </span>
                                            </div>
                                            <div className='lines'>
                                                <span className='detail'>Price :</span><span className='result text-danger'> {product.product_price}DH </span>
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
        users : state.users,
        brands : state.brands,
        addMsg : state.addMsg,
        deleteMsg : state.deleteMsg,
        updateMsg : state.updateMsg
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
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
