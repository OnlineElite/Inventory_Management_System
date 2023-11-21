import React,{useState, useEffect} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import { DatePicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import Modal from 'react-modal';
import DataTable from 'react-data-table-component'
import ClipLoader from "react-spinners/ClipLoader";
import { bringOrdersThunk, bringStatusThunk} from '../actions/IMSAction'

import '../styles/Orders.css'
const { RangePicker } = DatePicker;

function Orders(props){

    const [selectedRange, setSelectedRange] = useState(null);
    const [records, setRecords] = useState(props.orders)
    const [isLoading, setIsLoading] = useState(true)
    const [selectfilterStatus, setSelectfilterStatus] = useState('');
    const [isfiltred, setIsfiltred] = useState(false);
    //const [modalIsOpen, setModalIsOpen] = useState(false);
    //const [selectedRowData, setSelectedRowData] = useState(null);

    useEffect(()=>{
        if (props.orders.length === 0 || props.orders !== records) {
            props.getOrders()
            props.getStatus()
            if(!isfiltred){
              setRecords(props.orders)
              setIsfiltred(false)
            }
        }
       
        if(props.orders.length !== 0 && props.status.length !== 0){
            setIsLoading(false)
        }
    }, [])
    const columns = [
        {
            name : 'Order ID',
            selector : row => row.order_id,
            sortable : true,
            
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
            sortable : true,
            
        },
        {
            name : 'Customer',
            selector : row => row.customer_name,
            sortable : true,
            
        },
        {
            name : 'Total items',
            selector : row => row.total_item,
            sortable : true,
            center: true
        },
        {
            name : 'Total amount',
            selector : row => row.total_amount + ' DH',
            sortable : true,
          
        },
        {
            name : 'Payment',
            selector : row => row.payment_method,
            sortable : true,
            
        },
        {
            name : 'Delivery',
            selector : row => row.delivery_method,
            sortable : true,
            
        },
        {
            name : 'Status',  
            cell: (row) => (
                <div>
                    <span  className="status" id={row.orders_status} style={{backgroundColor: row.status_color}}>
                        {row.orders_status}
                    </span>
                </div>
    
            ),
            sortable : true,
            right: true
        },
      
    ];
    /*const usercolumns = [
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
                <span className='btn text-primary' data-toggle="modal" data-target="#viewUser" onClick={''}><i className="bi bi-eye-fill"></i></span>
                <span className="btn" data-toggle="modal" data-target="#updateUser" onClick={''}><i className="bi bi-pencil-fill"></i></span>
                <span className='btn text-danger'   onClick={''}><i className="bi bi-trash-fill"></i></span>
              </div>
            ),
            ignoreRowClick: true,
            allowoverflow: true,
            center: true
        }
    ];

    const handleRowClick = (row) => {
        setSelectedRowData(row);
        setModalIsOpen(true);
    };
    
    const closeModal = () => {
        setModalIsOpen(false);
    };*/
  
    const tableCustomStyles = {
        headRow: {
          style: {
            color:'#223336',
            backgroundColor: 'lightBlue',
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
        },
        
    }

    const filterByStatus =(e)=>{
        const newData = props.orders.filter(order =>{ 
          if(e.target.value === 'Status'){
              return props.orders
          }else{
              return order.orders_status.toLowerCase() === e.target.value.toLowerCase()
          }
        })
        setRecords(newData)
        setIsfiltred(true)
        setSelectfilterStatus(e.target.value)
    }

    const filterByCustomerName =(e)=>{
        const newData = props.orders.filter(order =>{ 
            return order.customer_name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(newData)
        setIsfiltred(true)
    }
    
    const filterByPymentMethod =(e)=>{
        const newData = props.orders.filter(order =>{ 
            return order.payment_method.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(newData)
        setIsfiltred(true)
    }

    const handeleReset =(e)=>{
        e.preventDefault()
        const ids = ['filterName', 'filterPayment', 'filterStatus', 'filterDate']
        const inputs = ids.map((id)=> document.getElementById(id))
        inputs.forEach((inp)=> {
          switch(inp.id){
            case 'filterName': inp.value = ''; break;
            case 'filterPayment': inp.value = ''; break;
            case 'filterStatus': setSelectfilterStatus(inp.firstChild.value); break;
            case 'filterDate': 
              setSelectedRange(null);
              setRecords(props.orders);; 
              break;
            default: inp.value = ''
          }
        })
        setRecords(props.orders)
    }
    
    return(
        <div className='orders' id='orders'>
            {isLoading? <div className='loadind '><ClipLoader color={'#36d7b7'} loading={isLoading} size={60} />Loading... </div>:
            <div className='container '>
                <h4 className=''>Orders Management</h4>
                {props.states.map((items, index)=>(
                    <div className="cartBox" key={index}>
                        <div className="cart">
                            <div className='texto'>
                                {items.total_pending ? <div style={{color: '#ffa500'}} className="numbers">{items.total_pending}</div>: <div style={{color: '#ffa500'}} className="numbers">0</div>}
                                <div className="cartName">Pending</div>
                            </div>

                            <div className="iconBx" style={{color: '#ffa500'}}>
                                <i class="bi bi-clock-history"></i>
                            </div>
                        </div>

                        <div className="cart">
                            <div className='texto'>
                                {items.total_in_progress? <div style={{color: '#0099ff'}} className="numbers">{items.total_in_progress}</div>: <div style={{color: '#0099ff'}} className="numbers">0</div>}
                                <div className="cartName">In Progress</div>
                            </div>

                            <div className="iconBx" style={{color: '#0099ff'}}>
                                <i class="bi bi-stopwatch-fill"></i>
                            </div>
                        </div>

                        <div className="cart">
                            <div className='texto'>
                                {items.total_delivered? <div style={{color: '#07d407'}} className="numbers">{items.total_delivered}</div>: <div style={{color: '#07d407'}} className="numbers">0</div>}
                                <div className="cartName">Delivered</div>
                            </div>

                            <div className="iconBx" style={{color: '#07d407'}}>
                                <FontAwesomeIcon icon="fa-solid fa-truck-fast" />
                            </div>
                        </div>

                        <div className="cart">
                            <div className='texto'>
                                {items.total_return? <div style={{color: '#ff0000'}} className="numbers">{items.total_return}</div>: <div style={{color: '#ff0000'}} className="numbers">0</div>}
                                <div className="cartName">Return</div>
                            </div>

                            <div className="iconBx" style={{color: '#ff0000'}}>
                                <i class="bi bi-x-circle-fill"></i>
                            </div>
                        </div>
                    </div>
                ))}
                <div className='filters '>
                    <div className='dates'>
                        <RangePicker
                            value={selectedRange}
                            id = 'filterDate'
                            onChange={(values) =>{
                                if (values && values.length === 2) {
                                    let startDate = values[0].format('YYYY-MM-DD')
                                    let endDate = values[1].format('YYYY-MM-DD')
                                    const theRest = props.orders.filter((row)=>{

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
                                    setRecords(props.orders)
                                    setSelectedRange(null);
                                }
                            }}
                        />
                    </div>
                    <input id='filterName' className='filterinp py-2' type='text' placeholder='Filter by customer name' onChange={filterByCustomerName} />
                    <input id='filterPayment' className='filterinp py-2' type='text' placeholder='Filter by payment method' onChange={filterByPymentMethod} />
                    <select id="filterStatus" className="filterinp py-2" value={selectfilterStatus} onChange={filterByStatus}>
                        <option disabled={true} value=""> {" "} Status </option>
                        {props.status.map((statu, index) => (
                            <option name="option" key={index}> {" "}{statu.name} </option>
                        ))}
                    </select>
                    <span className="btn btn-outline-primary mx-3py-2" onClick={handeleReset}>Reset</span>
                </div>
                <DataTable 
                    title = {'Manage Orders'}
                    columns ={columns}
                    data ={records} 
                    selectableRows 
                    selectableRowsHighlight
                    //onRowClicked={handleRowClick}
                    highlightOnHover
                    fixedHeader 
                    bordered
                    pagination
                    customStyles={tableCustomStyles}
                >
                </DataTable>
                {/*<Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Example Modal">
                    {selectedRowData && (
                        <div className=' '>
                            <div className='w-100 bg-danger d-flex align-items-center justify-content-between'>
                                <h2>{`Order ID: ${selectedRowData.order_id}`}</h2>
                                <p>{`Customer name: ${selectedRowData.customer_name}`}</p>
                                <p>{`Order status: ${selectedRowData.orders_status}`}</p>
                                <button onClick={closeModal}>Close Modal</button>
                            </div>
                            <DataTable 
                                title = {'Manage Orders'}
                                columns ={usercolumns}
                                data ={props.users} 
                                
                                selectableRowsHighlight
                                onRowClicked={handleRowClick}
                                highlightOnHover
                                fixedHeader 
                                bordered
                                pagination
                                customStyles={tableCustomStyles}
                            >
                            </DataTable>
                        </div>
                    )}
                </Modal>*/}
            </div>}
            
        </div>
    )
}

const mapStateToProps =(state)=>{
    //console.log(state.states)
    return{
        response : state.error,
        isAuthenticated : state.isAuthenticated,
        isAdmin : state.isAdmin,
        deleteMsg : state.deleteMsg,
        updateMsg : state.updateMsg,
        orders : state.orders,
        status : state.status,
        states : state.states,
        //users : state.users,
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        getOrders: ()=>{
            dispatch(bringOrdersThunk())
        },
        getStatus: ()=>{
            dispatch(bringStatusThunk())
        }
    }
    
}
export default connect(mapStateToProps, mapDispatchToProps) (Orders);


