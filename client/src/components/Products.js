import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import '../styles/Products.css'
function Products(){
    
    const columns = [
        {
            name : 'Name',
            selector : row => row.name,
            sortable : true
        },
        {
            name : 'Ref',
            selector : row => row.ref,
            sortable : true
        },
        {
            name : 'Stock',
            selector : row => row.stock,
            sortable : true
        },
        {
            name : 'Category',
            selector : row => row.category,
            sortable : true
        },
        {
            name : 'Brand',
            selector : row => row.brand,
            sortable : true
        }
    ];
    const data = [
        {
            id : 1,
            name : 'Galaxy s8',
            ref : 'rtxs8',
            stock : 9,
            category : 'phone',
            brand : 'Samsung'
        },
        {
            id : 2,
            name : 'Iphone 11 pro',
            ref : 'i0011',
            stock : 5,
            category : 'phone',
            brand : 'Apple'
        },
        {
            id : 3,
            name : 'HP Elite book',
            ref : 'hp000u5b',
            stock : 3,
            category : 'PC portable',
            brand : 'HP'
        },
        {
            id : 4,
            name : 'Galaxy A10',
            ref : 'rtx00r7',
            stock : 11,
            category : 'phone',
            brand : 'Samsung'
        },
        {
            id : 5,
            name : 'Think pad',
            ref : 'tn00x5r',
            stock : 7,
            category : 'PC portable',
            brand : 'Lenovo'
        },
        {
            id : 6,
            name : 'Galaxy s8',
            ref : 'rtxs8',
            stock : 9,
            category : 'phone',
            brand : 'Samsung'
        },
        {
            id : 7,
            name : 'Iphone 11 pro',
            ref : 'i0011',
            stock : 5,
            category : 'phone',
            brand : 'Apple'
        },
        {
            id : 8,
            name : 'HP Elite book',
            ref : 'hp000u5b',
            stock : 3,
            category : 'PC portable',
            brand : 'HP'
        },
        {
            id : 9,
            name : 'Galaxy A10',
            ref : 'rtx00r7',
            stock : 11,
            category : 'phone',
            brand : 'Samsung'
        },
        {
            id : 10,
            name : 'Think pad',
            ref : 'tn00x5r',
            stock : 7,
            category : 'PC portable',
            brand : 'Lenovo'
        }
    ]
    const [records, setRecords] = useState(data)
    const filterByName =(e)=>{
        const newData = data.filter(row =>{ 
            return row.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(newData)
    }

    return(
        <div className='products'>
            <div className='container'>
                <h1>Welcome in Products</h1>
                <div className='filters'>
                    <input type='text' placeholder='Filter by Name' onChange={filterByName}/>
                    <input type='text' placeholder='Filter by Ref'/>
                    <select >
                        <option > Category</option>
                        <option>Phone</option>
                        <option>Pc portable</option>
                        <option>Smart TV</option>
                        <option>Watch</option>
                    </select>
                    <select >
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

export default Products;