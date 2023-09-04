import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import {connect} from 'react-redux'


function Users(props){
    const [showAlert, setShowAlert] = useState(false);
    const [records, setRecords] = useState(props.products)
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
    
    const handleDelete=()=>{

    }
    const clickUpdateButton=()=>{

    }
    const handleShow=()=>{

    }

    return(
        <div className='Users' id='users'>
            <h1>Welcome in Users</h1>
            <div className='container mt-3'>
                { showAlert? ( <div className="alert alert-success" role="alert"> {props.deleteMsg} </div> ):''}
                <DataTable 
                    title = {'Manage Users'}
                    columns ={columns}
                    data ={records} 
                    selectableRows 
                    selectableRowsHighlight
                    highlightOnHover
                    fixedHeader 
                    bordered
                    pagination
                >
                </DataTable>
            </div>
        </div>
    )
}

const mapStateToProps =(state)=>{
    
    return{
        response : state.error,
        products : state.products,
        isAuthenticated : state.isAuthenticated,
        isAdmin : state.isAdmin,
        deleteMsg : state.deleteMsg,
        updateMsg : state.updateMsg
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        getUsers : ()=>{
            dispatch()
        },

        deleteProduct : ()=>{
            dispatch()
        },
        changeUserStatus : ()=>{
            dispatch()
        }
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps) (Users);
