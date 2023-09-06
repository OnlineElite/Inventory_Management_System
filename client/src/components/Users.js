import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import {connect} from 'react-redux'
import {bringUsersThunk} from '../actions/IMSAction'


function Users(props){
    const [showAlert, setShowAlert] = useState(false);
    const [records, setRecords] = useState(props.users)

    const callUsers =()=>{
        props.getUsers()
    }
    useEffect(()=>{
        callUsers()
    },[])

    const columns = [
        {
            name : 'First name',
            selector : row => row.first_name,
            sortable : true
        },
        {
            name : 'Last name',
            selector : row => row.last_name,
            sortable : true
        },
        {
            name : 'Usename',
            selector : row => row.username,
            sortable : true
        },
        {
            name : 'Email',
            selector : row => row.email,
            sortable : true
        },
        {
            name : 'Role',
            selector : row => row.admin,
            sortable : true
        },
        {
            name : 'Created At',
            selector : row => row.created_date,
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
        users : state.users,
        isAuthenticated : state.isAuthenticated,
        isAdmin : state.isAdmin,
        deleteMsg : state.deleteMsg,
        updateMsg : state.updateMsg
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        getUsers : ()=>{
            dispatch(bringUsersThunk())
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
