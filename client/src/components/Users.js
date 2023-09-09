import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import {connect} from 'react-redux'
import { DatePicker } from 'antd';
import '../styles/Users.css'

const { RangePicker } = DatePicker;

function Users(props){
    const [showAlert, setShowAlert] = useState(false);
    const [records, setRecords] = useState(props.users)
    const [condition, setCondition] = useState(null)
    const [selecadmin, setSelecadmin] = useState('');

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
            name : 'IsAdmin',
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
                <span className="btn" data-toggle="modal" data-target="#updateUser" onClick={() => clickUpdateButton(row)}><i className="bi bi-pencil-fill"></i></span>
                <span className='btn text-danger'   onClick={() => handleDelete(row)}><i className="bi bi-trash-fill"></i></span>
              </div>
            ),
            ignoreRowClick: true,
            allowoverflow: true,
            
        }
    ];
    const addAdmin =(e)=>{
        setSelecadmin(e.target.value);
    }

    function handleCloseModal(){    
        document.getElementById("updateUser").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
    }

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
    const clickUpdateButton=(row)=>{
        const ids = ['fname', 'lname', 'username', 'email', 'admin']
        const inputs = ids.map((id) => document.getElementById(id))
        inputs.forEach((inp) => { 
            switch(inp.id){
                case 'fname':
                    inp.value = row.first_name
                    break;
                case 'lname':
                    inp.value = row.last_name 
                    break;
                case 'username':
                    inp.value = row.username
                    break;
                case 'email':
                    inp.value = row.email
                    break;
                case 'admin':
                    inp.value = row.admin
                    break;
                default :
                    inp.value = ''
            }
        })
        setCondition(row.username)
    }
    const hundeleUpdate=(e)=>{
        e.preventDefault()
        var values = [];
        const ids = ['fname', 'lname', 'username', 'email', 'admin']
        const inputs = ids.map((id) => document.getElementById(id))
        inputs.forEach((inp) => { 
            values.push(inp.value);
        })
        const itemInfo = {
            first_name: values[0],
            last_name: values[1],
            username: values[2],
            email: values[3],
            admin : values[4],
            condition : condition
        }
        //props.updateUser(itemInfo)
        console.log('itemInfo', itemInfo)
        if (props.updateMsg) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
        handleCloseModal()     
        setRecords(props.users)
    }

    const handleShow=()=>{

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

    return(
        <div className='Users' id='users'>
            <h1 className='px-3'>Users Manager</h1>
            <div className='filters'>
                <div className='dates mt-3'>
                    <RangePicker
                        onChange={(values) =>{
                            if (values && values.length === 2) {
                                let startDate = values[0].format('YYYY-MM-DD')
                                let endDate = values[1].format('YYYY-MM-DD')
                                const theRest = props.users.filter((row)=>{

                                    const date = new Date(row.created_date);
                                    const year = date.getFullYear();
                                    const month = String(date.getMonth() + 1).padStart(2, '0');
                                    const day = String(date.getDate()).padStart(2, '0');
                                    const formattedDate = `${year}-${month}-${day}`;
                                    
                                    return (startDate <= formattedDate && formattedDate<= endDate)
                                })
                                setRecords(theRest)
                            }else {
                                setRecords(props.users)
                            }
                        }}
                    />
                </div>
                <input className='filterinp py-2' type='text' placeholder='Filter by Name' onChange={filterByName}/>
                <input className='filterinp py-2' type='text' placeholder='Filter by Usename' onChange={filterByUsername}/>
                <input className='filterinp py-2' type='text' placeholder='Filter by email' onChange={filterByemail} />
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
                    customStyles={tableCustomStyles}
                >
                </DataTable>
            </div>
            {/* Update user Modal */}
            <div className="modal fade" id="updateUser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {showAlert && ( <div className="alert alert-success" role="alert"> {props.updateMsg} </div> )} 
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Update User</h3>
                            <span type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </span>
                        </div>
                        <div className="modal-body">
                            <div className="roo">
                                <label htmlFor="fname">First name:</label>
                                <input id="fname" type="text" name="fname"/>
                            </div>
                            <div className="roo">
                                <label htmlFor="lname">Last name :</label> 
                                <input id="lname" type="text" name="lname"/>
                            </div>
                            <div className="roo">
                                <label htmlFor="username" >Username :</label> 
                                <input className='bg-light' id="username" type="text" name="username" disabled />
                            </div>
                            <div className="roo">
                                <label htmlFor="email" >Email :</label> 
                                <input className='bg-light'  id="email" type="text" name="email" disabled/>
                            </div>
                            <div className="roo">
                                <label htmlFor="admin">Is Admin :</label> 
                                <select  id="admin" value={selecadmin} onChange={addAdmin} name="admin" >
                                    <option disabled={true} value=""> true/false</option>
                                    <option name='option' >false</option>
                                    <option name='option' >true</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={hundeleUpdate}>Update User</button>
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
        users : state.users,
        isAuthenticated : state.isAuthenticated,
        isAdmin : state.isAdmin,
        deleteMsg : state.deleteMsg,
        updateMsg : state.updateMsg
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        deleteProduct : ()=>{
            dispatch()
        },
        updateUser : ()=>{
            dispatch()
        }
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps) (Users);
