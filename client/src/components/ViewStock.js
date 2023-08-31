import React, {useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import {connect} from 'react-redux'
import {bringProductsThunk, bringCategoriesThunk, bringBrandsThunk} from '../actions/IMSAction'
import '../styles/Stock.css'

function ViewStock(props){

    const [records, setRecords] = useState(props.products)

    useEffect(()=>{
        props.getProducts()
        props.getCategories()
        props.getBrands()
    }, [props])

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
                <span className='btn text-primary' onClick={() => handleShow(row)}><i class="bi bi-eye-fill"></i></span>
                <span className='btn' onClick={() => handleUpdate(row)}><i class="bi bi-pencil-fill"></i></span>
                <span className='btn text-danger' onClick={() => handleDelete(row)}><i class="bi bi-trash-fill"></i></span>
              </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
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
    }

    const handleUpdate=()=>{

    }

    const handleDelete=()=>{

    }

    const handleShow=()=>{

    }

    const HandellAddItem = ()=>{

    }

    return(
        <div className='products bg-light'>
            <div className='container'>
                <h1>Welcome in Products</h1>
                <div className='filters'>
                    <input type='text' placeholder='Filter by Name' onChange={filterByName}/>
                    <input type='text' placeholder='Filter by Ref' onChange={filterByRef} />
                    <select onChange={filterByCategory}>
                        <option > Category</option>
                        {props.categories.map((category, index)=>(
                            <option name='option' key={index}> {category.name}</option>
                        ))}
                    </select>
                    <select onChange={filterByBrand} >
                        <option > Brand</option>
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
                        actions ={<button type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModal" onClick={HandellAddItem}>Add Item</button>}
                    >
                    </DataTable>
                </div>
                {/* Add Item Modal */}
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
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
        brands : state.brands
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ViewStock);
