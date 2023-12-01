import React, {useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import DataTable from 'react-data-table-component'
import { DatePicker } from 'antd';
import ClipLoader from "react-spinners/ClipLoader";
import {updateUserThunk, deleteUserThunk, bringUsersThunk} from '../actions/IMSAction'
import userimg from '../images/Default.png'
import '../styles/Users.css'

const { RangePicker } = DatePicker;

function Users(props){
    
    const [records, setRecords] = useState(props.users)
    const [condition, setCondition] = useState(null)
    const [selectedRange, setSelectedRange] = useState(null);
    const [isfiltred, setIsfiltred] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        props.getUsers()
        if (props.users !== records) {
            if(!isfiltred){
                setRecords(props.users);
                setIsfiltred(false)
            }
        }

        if(props.users.length !== 0){
            setIsLoading(false)
        }
    }, [props.users])

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
            selector : row => row.admin ? "Yes": "No",
            sortable : true
        },
        {
            name : 'Created At',
            selector : row =>{
            let year = new Date(row.created_date).getFullYear();
            let month = new Date(row.created_date).getMonth();
            let day = new Date(row.created_date).getDay();
            let hour = new Date(row.created_date).getHours();
            let minute = new Date(row.created_date).getMinutes();
            //let seconds = new Date(row.created_date).getSeconds();
            return `${day+12}-${month+1}-${year} ${hour+1}:${minute}`
        },
            sortable : true
        },
        {
            name: 'Actions',
            cell: (row) => (
              <div className='d-flex'>
                <span className='btn text-primary' data-toggle="modal" data-target="#viewUser" onClick={() => handleShow(row)}><i className="bi bi-eye-fill"></i></span>
                <span className="btn" data-toggle="modal" data-target="#updateUser" onClick={() => clickUpdateButton(row)}><i className="bi bi-pencil-fill"></i></span>
                <span className='btn text-danger'   onClick={() => handleDelete(row)}><i className="bi bi-trash-fill"></i></span>
              </div>
            ),
            ignoreRowClick: true,
            allowoverflow: true,
            center: 'true'
        }
    ];

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
        setIsfiltred(true)
    }

    const filterByUsername =(e)=>{
        const newData = props.users.filter(row =>{ 
            return row.username.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(newData)
        setIsfiltred(true)
    }

    const filterByemail=(e)=>{
        const newData = props.users.filter(row =>{ 
            return row.email.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(newData)
        setIsfiltred(true)
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
                    (row.admin)? inp.selectedIndex = 2 : inp.selectedIndex = 1
                    break;
                default :
                    inp.value = null
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
        props.updateUser(itemInfo)
        props.updateMsg? toast.success(`${props.updateMsg}`) :  console.log('');
        props.response? toast.error(`${props.response}`) :  console.log('');
        handleCloseModal()     
        setRecords(props.users)
    }

    const handleDelete=(row)=>{
        console.log('condition', row.username)
        props.deleteUser(row.username)
        props.deleteMsg? toast.success(`${props.deleteMsg}`) :  console.log('');
        props.response? toast.error(`${props.response}`) :  console.log('');
    }

    const handleShow=(row)=>{
        const ids = ['detailFname', 'detailLName', 'detailUsername', 'detailEmail', 'detailIsAdmin', 'detailCreatedDate']
        const spans = ids.map((id)=> document.getElementById(id))
        spans.forEach((sp)=>{
            switch(sp.id){
                case 'detailFname':
                    sp.textContent = row.first_name; break;
                case 'detailLName':
                    sp.textContent = row.last_name; break;
                case 'detailUsername':
                    sp.textContent = row.username; break;
                case 'detailEmail':
                    sp.textContent = row.email; break;
                case 'detailIsAdmin':
                    row.admin?  sp.textContent = 'Yes' :  sp.textContent = 'No'; break;
                case 'detailCreatedDate':
                    let year = new Date(row.created_date).getFullYear();
                    let month = new Date(row.created_date).getMonth();
                    let day = new Date(row.created_date).getDay();
                    let hour = new Date(row.created_date).getHours();
                    let minute = new Date(row.created_date).getMinutes();
                    let seconds = new Date(row.created_date).getSeconds();
                    const formattedDate = `${year}-${month+1}-${day+12}  ${hour+1}:${minute}:${seconds}`
                    sp.textContent = formattedDate; break;
                default : 
                    sp.textContent = null
            }
        })
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
        const ids = ['filterName', 'filterDate', 'filterEmail', 'filterUsername']
        const inputs = ids.map((id)=> document.getElementById(id))
        inputs.forEach((inp)=> {
            switch(inp.id){
                case 'filterName': inp.value = ''; break;
                case 'filterEmail': inp.value = ''; break;
                case 'filterUsername': inp.value = ''; break;
                case 'filterDate': 
                    setSelectedRange(null);
                    setRecords(props.users);; 
                    break;
                default: inp.value = ''
            }
        })
        setRecords(props.users)
    }

    return(
        <div className='Users' id='users'>
            {isLoading? <div className='loadind '><ClipLoader color={'#36d7b7'} loading={isLoading} size={60} />Loading... </div>:
            <div className='container mt-3'>
                <h4 className=''>Users Management</h4>
                <div className='filters'>
                    <div className='dates'>
                        <RangePicker
                            value={selectedRange}
                            id = 'filterDate'
                            onChange={(values) =>{
                                if (values && values.length === 2) {
                                    let startDate = values[0].format('YYYY-MM-DD')
                                    let endDate = values[1].format('YYYY-MM-DD')
                                    const theRest = props.users.filter((row)=>{

                                        let year = new Date(row.created_date).getFullYear();
                                        let month = new Date(row.created_date).getMonth();
                                        let day = new Date(row.created_date).getDay();
                                        const formattedDate = `${year}-${month+1}-${day+12}`
                                        /*const date = new Date(row.created_date);
                                        const year = date.getFullYear();
                                        const month = String(date.getMonth() + 1).padStart(2, '0');
                                        const day = String(date.getDate()).padStart(2, '0');
                                        const formattedDate = `${year}-${month}-${day}`;*/
                                        
                                        return (startDate <= formattedDate && formattedDate<= endDate)
                                    })
                                    setRecords(theRest)
                                    setSelectedRange(values);
                                }else {
                                    setRecords(props.users)
                                    setSelectedRange(null);
                                }
                            }}
                        />
                    </div>
                    <input id='filterName' className='filterinp py-2' type='text' placeholder='Filter by Name' onChange={filterByName}/>
                    <input id='filterUsername' className='filterinp py-2' type='text' placeholder='Filter by Usename' onChange={filterByUsername}/>
                    <input id='filterEmail' className='filterinp py-2' type='text' placeholder='Filter by email' onChange={filterByemail} />
                    <span className="btn btn-outline-primary mx-3 py-2" onClick={handeleReset}>Reset</span>
                </div>
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
            </div>}
            {/* Update user Modal */}
            <div className="modal fade" id="updateUser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
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
                                <select  id="admin" name="admin" >
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
            {/* View Item Modal */}
            <div className="modal fade " id="viewUser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg view">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">User Details</h3>
                        <span type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </span>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className=' left col-auto col-sm-6 col-md-6 col-lg-6'>
                                    <div className='lines'>
                                        <span className='detail ' >First Name:</span><span  id='detailFname' > </span>
                                    </div>
                                    <div className='lines'>
                                        <span className='detail'  >Last Name:</span><span id='detailLName' >  </span>
                                    </div>
                                    <div className='lines'>
                                        <span className='detail'  >Username:</span>
                                        <span id='detailUsername'   > </span>
                                    </div>
                                    <div className='lines'>
                                        <span className='detail'  >Email:</span><span id='detailEmail'>  </span>
                                    </div>
                                    <div className='lines'>
                                        <span className='detail'  >Is Admin:</span><span id='detailIsAdmin' className='leftR text-primary'>  </span>
                                    </div>
                                    <div className='lines'>
                                        <span className='detail'  >Created Date:</span><span id='detailCreatedDate' >  </span>
                                    </div>
                                    
                            </div>
                            <div className=' right col-auto col-sm-6 col-md-6 col-lg-6'>
                                <div className='productImage rounded'> <img id='userimg' src= {userimg} alt='product'/> </div>
                            </div>
                        </div>                  
                    </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
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
        deleteUser : (condition)=>{
            dispatch(deleteUserThunk(condition))
        },
        updateUser : (user)=>{
            dispatch(updateUserThunk(user))
        }
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps) (Users);
