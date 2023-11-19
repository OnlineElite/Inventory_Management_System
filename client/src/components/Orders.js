import React,{useState, useEffect} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import { DatePicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { ToastContainer, toast } from 'react-toastify';
import DataTable from 'react-data-table-component'
//import ClipLoader from "react-spinners/ClipLoader";
import { bringOrdersThunk, bringStatusThunk} from '../actions/IMSAction'

import '../styles/Orders.css'
const { RangePicker } = DatePicker;

function Orders(props){

    const [selectedRange, setSelectedRange] = useState(null);
    //const [StatusColor, setStatusColor] = useState('')
    var colore;
    useEffect(()=>{
        props.getOrders()
        props.getStatus()
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
            name : 'Customer Name',
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
            name : 'Payment method',
            selector : row => row.payment_method,
            sortable : true,
            
        },
        {
            name : 'Status',  
            cell: (row) => (
                <div>
                    
                    {props.status.map((statu)=>{
                        
                        if(row.status === statu.name){
                            colore = statu.color
                        }
                    })}
                    <span  className="status" id={row.status} style={{backgroundColor: colore}}>
                        {row.status}
                    </span>
                </div>
    
            ),
            sortable : true,
            right: true
        },
      
    ];
  
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
        },
        
    }
    
    return(
        <div className='orders' id='orders'>
            <div className='container '>
                {props.states.map((items, index)=>(
                    <div className="cartBox" key={index}>
                        <div className="cart">
                            <div className='texto'>
                                {items.total_Pending? <div className="numbers">{items.total_Pending}</div>: <div className="numbers">0</div>}
                                <div className="cartName">Pending</div>
                            </div>

                            <div className="iconBx">
                                <i class="bi bi-clock-history"></i>
                            </div>
                        </div>

                        <div className="cart">
                            <div className='texto'>
                                {items.total_In_Progress? <div className="numbers">{items.total_In_Progress}</div>: <div className="numbers">0</div>}
                                <div className="cartName">In Progress</div>
                            </div>

                            <div className="iconBx">
                                <i class="bi bi-stopwatch-fill"></i>
                            </div>
                        </div>

                        <div className="cart">
                            <div className='texto'>
                                {items.total_Delivered? <div className="numbers">{items.total_Delivered}</div>: <div className="numbers">0</div>}
                                <div className="cartName">Delivered</div>
                            </div>

                            <div className="iconBx">
                                <FontAwesomeIcon icon="fa-solid fa-truck-fast" />
                            </div>
                        </div>

                        <div className="cart">
                            <div className='texto'>
                                {items.total_Return? <div className="numbers">{items.total_Return}</div>: <div className="numbers">0</div>}
                                <div className="cartName">Return</div>
                            </div>

                            <div className="iconBx">
                                <i class="bi bi-x-circle-fill"></i>
                            </div>
                        </div>
                    </div>
                ))}
                <h4 className=''>Orders Management</h4>
                <div className='filters '>
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
                                    //setRecords(theRest)
                                    setSelectedRange(values);
                                }else {
                                    //setRecords(props.users)
                                    setSelectedRange(null);
                                }
                            }}
                        />
                    </div>
                    <input id='filterName' className='filterinp py-2' type='text' placeholder='Filter by Name'  />
                    <input id='filterUsername' className='filterinp py-2' type='text' placeholder='Filter by Usename'  />
                    <input id='filterEmail' className='filterinp py-2' type='text' placeholder='Filter by email'  />
                    <span className="btn btn-outline-primary mx-3py-2">Reset</span>
                </div>
                <DataTable 
                    title = {'Manage Orders'}
                    columns ={columns}
                    data ={props.orders} 
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
            
        </div>
    )
}

const mapStateToProps =(state)=>{
    
    return{
        response : state.error,
        isAuthenticated : state.isAuthenticated,
        isAdmin : state.isAdmin,
        deleteMsg : state.deleteMsg,
        updateMsg : state.updateMsg,
        orders : state.orders,
        status : state.status,
        states : state.states
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


