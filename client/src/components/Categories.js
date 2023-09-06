import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import {connect} from 'react-redux'
import {bringCategoriesThunk} from '../actions/IMSAction'


function Categories(props){
    const [showAlert, setShowAlert] = useState(false);
    const [records, setRecords] = useState(props.categories)
    const callCategory =()=>{
        props.getCategories()
    }
    useEffect(()=>{
        callCategory()
    }, [])
    const columns = [
        {
            name : 'Name',
            selector : row => row.name,
            sortable : true
        },
        {
            name : 'Created At',
            selector : row => row.created_date,
            sortable : true
        },
        {
            name : 'Updated At',
            selector : row => row.updated_date,
            sortable : true
        },
        {
            name : 'Deleted At',
            selector : row => row.deleted_date,
            sortable : true
        },
        {
            name: 'Actions',
            cell: (row) => (
              <div className='d-flex'>
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

    return(
        <div className='Category' id='Category'>
            <h1>Manage Categories</h1>
            <div className='container mt-3'>
                { showAlert? ( <div className="alert alert-success" role="alert"> {props.deleteMsg} </div> ):''}
                <DataTable 
                    title = {'Manage categories'}
                    columns ={columns}
                    data ={records} 
                    selectableRows 
                    selectableRowsHighlight
                    highlightOnHover
                    fixedHeader 
                    bordered
                    pagination
                    actions ={<button type="button" className="btn btn-info" data-toggle="modal" data-target="#addproduct" >Add category</button>}
                >
                </DataTable>
            </div>
        </div>
    )
}

const mapStateToProps =(state)=>{
    console.log('categs',state.categories )
    return{
        response : state.error,
        isAuthenticated : state.isAuthenticated,
        categories : state.categories,
        addMsg : state.addMsg,
        deleteMsg : state.deleteMsg,
        updateMsg : state.updateMsg
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        getCategories : ()=>{
            dispatch(bringCategoriesThunk())
        },
        addCategory : ()=>{
            dispatch()
        },
        updateCategory : ()=>{
            dispatch()
        },
        deleteCategory : ()=>{
            dispatch()
        }
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps) (Categories);

