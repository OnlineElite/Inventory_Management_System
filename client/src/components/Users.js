import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import {connect} from 'react-redux'
import {bringUsersThunk} from '../actions/IMSAction'
import '../styles/Users.css'

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
            name : 'Full Name',
            selector : row => row.first_name +' '+ row.last_name,
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

    const filterByName =(e)=>{
        const newData = props.users.filter(row =>{ 
            return (row.first_name.toLowerCase().includes(e.target.value.toLowerCase())
            || row.last_name.toLowerCase().includes(e.target.value.toLowerCase())) 
        })
        setRecords(newData)
    }

    const filterByUsername =(e)=>{
        const newData = props.users.filter(row =>{ 
            return row.username.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(newData)
    }

    const filterByemail=(e)=>{
        const newData = props.users.filter(row =>{ 
            return row.email.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(newData)
    }
    
    const handleDelete=()=>{

    }
    const clickUpdateButton=()=>{

    }
    const handleShow=()=>{

    }

    return(
        <div className='Users' id='users'>
            <h1>Users Manager</h1>
            <div className='filters'>
                <div className='dates mt-3'>
                    <div className='date'><label>From:</label><input type='date' name='from' id='from'></input></div>
                    <div className='date'><label>To:</label><input type='date' name='to' id='to'></input></div>
                </div>
                <input className='filterinp' type='text' placeholder='Filter by Name' onChange={filterByName}/>
                <input className='filterinp' type='text' placeholder='Filter by Usename' onChange={filterByUsername}/>
                <input className='filterinp' type='text' placeholder='Filter by email' onChange={filterByemail} />
            </div>
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
