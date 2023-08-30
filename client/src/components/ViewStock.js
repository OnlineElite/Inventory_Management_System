import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import {connect} from 'react-redux'
import {bringProductsThunk} from '../actions/IMSAction'
import '../styles/Stock.css'

function ViewStock(props){

    useEffect(()=>{
        props.getProducts()
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
        }
    ];


    /*const data = [
        {
            id : 1,
            name : 'Galaxy s8',
            ref : 'rtxs8',
            stock : 9,
            price : 1200,
            category : 'phone',
            brand : 'Samsung'
        },
        {
            id : 2,
            name : 'Iphone 11 pro',
            ref : 'i0011',
            stock : 5,
            price : 1200,
            category : 'phone',
            brand : 'Apple'
        },
        {
            id : 3,
            name : 'HP Elite book',
            ref : 'hp000u5b',
            stock : 3,
            price : 1200,
            category : 'PC portable',
            brand : 'HP'
        },
        {
            id : 4,
            name : 'Galaxy A10',
            ref : 'rtx00r7',
            stock : 11,
            price : 1200,
            category : 'phone',
            brand : 'Samsung'
        },
        {
            id : 5,
            name : 'Think pad',
            ref : 'tn00x5r',
            stock : 7,
            price : 1200,
            category : 'PC portable',
            brand : 'Lenovo'
        },
        {
            id : 6,
            name : 'Galaxy s8',
            ref : 'rtxs8',
            stock : 9,
            price : 1200,
            category : 'phone',
            brand : 'Samsung'
        },
        {
            id : 7,
            name : 'Ultra 8 pro',
            ref : 'i0011',
            stock : 5,
            price : 1200,
            category : 'watch',
            brand : 'Apple'
        },
        {
            id : 8,
            name : 'HP Elite book',
            ref : 'hp000u5b',
            stock : 3,
            price : 1200,
            category : 'PC portable',
            brand : 'HP'
        },
        {
            id : 9,
            name : 'Galaxy A10',
            ref : 'rtx00r7',
            stock : 11,
            price : 1200,
            category : 'phone',
            brand : 'Samsung'
        },
        {
            id : 10,
            name : 'Think pad',
            ref : 'tn00x5r',
            stock : 7,
            price : 1200,
            category : 'PC portable',
            brand : 'Lenovo'
        }
    ]*/
    const [records, setRecords] = useState(props.products)
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
            return row.category_name.toLowerCase() === e.target.value.toLowerCase()
        })
        setRecords(newData)
    }

    const filterByBrand =(e)=>{
        const newData = props.products.filter(row =>{ 
            return row.brand_name.toLowerCase() === e.target.value.toLowerCase()
        })
        setRecords(newData)
    }

    return(
        <div className='products'>
            <div className='container'>
                <h1>Welcome in Products</h1>
                <div className='filters'>
                    <input type='text' placeholder='Filter by Name' onChange={filterByName}/>
                    <input type='text' placeholder='Filter by Ref' onChange={filterByRef} />
                    <select onChange={filterByCategory}>
                        <option > Category</option>
                        <option>Phone</option>
                        <option>Pc portable</option>
                        <option>Smart TV</option>
                        <option>Watch</option>
                    </select>
                    <select onChange={filterByBrand} >
                        <option > Brand</option>
                        <option>Samsung</option>
                        <option>HP</option>
                        <option>Lenovo TV</option>
                        <option>Apple</option>
                    </select>
                </div>
                <div className='container mt-3'>
                    <DataTable 
                    columns ={columns} 
                    data ={records} 
                    selectableRows 
                    fixedHeader 
                    pagination>

                    </DataTable>
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
        products : state.products
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        getProducts : ()=>{
            dispatch(bringProductsThunk())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ViewStock);
