import React,{useState, useEffect} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import { DatePicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-modal';
import DataTable from 'react-data-table-component'
import ClipLoader from "react-spinners/ClipLoader";
import { bringOrdersThunk, changeOrderTotalAmountThunk, addProductToOrderThunk, bringProductsThunk, updateOrderProductThunk, bringStatusThunk, bringOrderProductsThunk, deleteProductFromOrderThunk, changeOrderStatusThunk} from '../actions/IMSAction'

import '../styles/Orders.css'
const { RangePicker } = DatePicker;

const CustomCheckbox = ({ checked, onChange }) => (
    <div>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <button onClick={() => alert('Delete clicked')}>Delete</button>
    </div>
);

function Orders(props){

    const [selectedRange, setSelectedRange] = useState(null);
    const [records, setRecords] = useState(props.orders)
    const [isLoading, setIsLoading] = useState(true)
    const [selectfilterStatus, setSelectfilterStatus] = useState('');
    const [isfiltred, setIsfiltred] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [totalItem, setTotalItem] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(()=>{
        if ( props.orders !== records) {
            props.getOrders()
            props.getStatus()
            props.getProducts()
            if(!isfiltred){
              setRecords(props.orders)
              setIsfiltred(false)
            }
        } 
        if(props.orders.length !== 0 && props.status.length !== 0){
            setIsLoading(false)
        }else{
            setTimeout(()=>{
                setIsLoading(false)
            },5000)
        }
    }, [props.orders, props.status ])
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

    const productscolumns = [
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
          selector : row => row.product_price+' DH',
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
        },
        {
            name : 'Ordered',
            cell: (row) =>(
                <div className='buttns ' id='incDec'>
                    <button className='bg-primary'  type='submit' onClick={(e)=>hundellSubmit(e, row.order_id)} data-btn = 'increase' data-id = {row.product_id} >+</button>
                    <span id={`count-${row.product_ref}`}> {row.order_quantity} </span>
                    <button className='bg-primary'  type='submit' onClick={(e)=>hundellSubmit(e, row.order_id)} data-btn = 'decrease' data-id = {row.product_id}>–</button>
                </div>
            ),
            selector : row => row.order_quantity,
            sortable : true
        },
        {
          name: 'Actions',
          cell: (row) => (
            <div className='d-flex'>
              <span className='btn text-danger' onClick={() => DeleteProductFromOrder(row.product_id, row.order_id)} ><i className="bi bi-trash-fill"></i></span>
            </div>
          ),
          ignoreRowClick: true,
          allowoverflow: true, 
          center: true     
        }
    ];

    const handleRowClick = (row) => {
        props.getOrderProducts(row.order_id)
        setSelectedRowData(row);
        setTimeout(()=>{
            setModalIsOpen(true);
        },600)
    };

    const hundellSubmit = async (e, order_id)=>{
        e.preventDefault()
        let btnType = e.target.dataset.btn;
        let id = parseInt(e.target.dataset.id) 
        let count = e.target.parentElement.children[1]
        let currentCounter = e.target.parentElement.children[1].textContent
        switch (btnType) {
            case "increase":
                if (currentCounter >= 100) {
                    count.textContent = currentCounter;
                } else {
                    count.textContent = Number(currentCounter) + 1;
                    await props.updateOrderProducts({
                        product_id : id,
                        order_id : order_id,
                        newValue :Number(currentCounter) + 1
                    })
                }
                break;
            case "decrease":
                if (currentCounter <= 1) {
                    count.textContent = 1;
                } else {
                    count.textContent = Number(currentCounter) - 1;
                    await props.updateOrderProducts({
                        product_id : id,
                        order_id : order_id,
                        newValue : Number(currentCounter) - 1
                    })
                }
                break;
            default:
            console.log("wrong button");
        }
        HandelTotalItem_TotalAmount(order_id);
    }

    const HandelTotalItem_TotalAmount= (order_id)=>{
        if(props.orderProducts){
            var total = 0;
            const orderProds = []
            props.orderProducts.forEach((prod)=>{
                if(prod.order_id === order_id){
                    orderProds.push(prod)
                }
            })
            orderProds.forEach((product)=>{
                const count = document.getElementById(`count-${product.product_ref}`)
                let quantity = props.isAuthenticated? count.textContent: ''
                total = total + Number(quantity) * Number(product.product_price);
            })
            let TotalAmount = (total - (total * 20) / 100).toFixed(2);
            setTotalAmount(TotalAmount)
            setTotalItem(orderProds.length)
            props.changeTotalAmount(
                {
                    total : TotalAmount,
                    or_id : order_id
                }
            )
        }
    }

    const handelCreatedDateAtModal =(date)=>{
        let year = new Date(date).getFullYear();
        let month = new Date(date).getMonth();
        let day = new Date(date).getDay();
        let hour = new Date(date).getHours();
        let minute = new Date(date).getMinutes();
        return `${day+19}-${month+1}-${year} ${hour+1}:${minute}`
    }

    const DeleteProductFromOrder =(product_id, order_id)=>{
        props.deleteProdFromOrder({pid: product_id, oid : order_id})
    }

    const handelStatusChange =(e, order_id)=>{
        let status_id;
        const value = e.target.value;
        props.status.map((statu)=>{
            if(value === statu.name){
                status_id =statu.id
                e.target.style.backgroundColor = `${statu.color}`
                e.target.style.color = 'white'
            }
        })
        setSelectedStatus(value)
        props.changeStaus({or_id:order_id, st_id:status_id})
    }
    
    const closeModal = () => {
        setModalIsOpen(false);
        setTotalAmount(null);
        setTotalItem(null);
    };
 
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
    
    const modalCustomStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width : '75vw',
          height : '90vh',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9,
        },
    };

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
    
    const handelRowSelected =(row)=>{
        console.log(row.selectedRows)
        setSelectedRows(row.selectedRows)
    }

    const hundellSubmitAddProduct = (e)=>{
        e.preventDefault()
        let btnType = e.target.dataset.btn;
        let count = e.target.parentElement.children[1]
        let currentCounter = e.target.parentElement.children[1].textContent
        switch (btnType) {
            case "increase":
                if (currentCounter >= 100) {
                    count.textContent = currentCounter;
                } else {
                    count.textContent = Number(currentCounter) + 1;
                }
                break;
            case "decrease":
                if (currentCounter <= 0) {
                    count.textContent = 0;
                } else {
                    count.textContent = Number(currentCounter) - 1;
                }
                break;
            default:
            console.log("wrong button");
        }
    }
    
    const addProductToOrder = (order_id)=>{
        let prodName = document.getElementById('prodName').value;
        let Counter = document.getElementById('count').textContent;
        props.products.map((prod)=>{
            if(prod.product_name === prodName){
                props.addProductToOrder({
                    order_id: order_id,
                    prod_ref: prod.product_ref,
                    prod_id: prod.product_id,
                    quantity: Number(Counter) 
                })
            }
        })
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
                                <i className="bi bi-clock-history"></i>
                            </div>
                        </div>

                        <div className="cart">
                            <div className='texto'>
                                {items.total_in_progress? <div style={{color: '#0099ff'}} className="numbers">{items.total_in_progress}</div>: <div style={{color: '#0099ff'}} className="numbers">0</div>}
                                <div className="cartName">In Progress</div>
                            </div>

                            <div className="iconBx" style={{color: '#0099ff'}}>
                                <i className="bi bi-stopwatch-fill"></i>
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
                                <i className="bi bi-x-circle-fill"></i>
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
                    onRowClicked={handleRowClick}
                    highlightOnHover
                    onSelectedRowsChange = {handelRowSelected}
                    //selectableRowsComponentProps={selectableRowsComponentProps}
                    bordered
                    pagination
                    customStyles={tableCustomStyles}
                >
                </DataTable>
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Example Modal" style={modalCustomStyles}>
                    {selectedRowData && (
                        <div className='ordermodal'>
                            <div className='row px-3'>
                                <div className='col-12 col-sm-6 col-md-3'>
                                    <p className='fw-bold text-secondary'> Order ID : <span className='fw-normal text-black'>{selectedRowData.order_id}</span></p>
                                    <p className='fw-bold text-secondary'> Status : <span className='fw-normal text-black'>{selectedRowData.orders_status}</span></p>
                                    <p className='fw-bold text-secondary'> City : <span className='fw-normal text-black'>{selectedRowData.city}</span></p>
                                </div>
                                <div className='col-12 col-sm-6 col-md-3'>
                                    <p className='fw-bold text-secondary'> Client : <span className='fw-normal text-black'>{selectedRowData.customer_name}</span></p>
                                    <p className='fw-bold text-secondary'> Payment : <span className='fw-normal text-black'>{selectedRowData.payment_method}</span></p>
                                    <p className='fw-bold text-secondary'> Delivery : <span className='fw-normal text-black'>{selectedRowData.delivery_method}</span></p>
                                </div>
                                <div className='col-12 col-sm-6 col-md-3'>
                                    <p className='fw-bold text-secondary'> Total Item : <span className='fw-normal text-black'>{totalItem? totalItem : selectedRowData.total_item}</span></p>
                                    <p className='fw-bold text-secondary'> Total Amount : <span className='fw-normal text-black'>{totalAmount? totalAmount : selectedRowData.total_amount} DH</span></p>
                                    <p className='fw-bold text-secondary'> Created Date : <span className='fw-normal text-black'>{handelCreatedDateAtModal(selectedRowData.created_date)}</span></p>
                                </div>
                                <div className='col-12 col-sm-6 col-md-3 d-flex flex-column justify-content-between align-items-end'>
                                    <button className='btn btn-outline-primary w-75'  data-toggle="modal" data-target="#addproductmodal" data-backdrop="false">Add product</button>
                                    <select id="statusId" className="w-75 py-1"  value={selectedStatus?selectedStatus : selectedRowData.orders_status} onChange={(e)=> handelStatusChange(e,selectedRowData.order_id )}
                                     style={{backgroundColor : selectedRowData.status_color, color : 'white',borderRadius: '5px'}} >
                                        {props.status.map((statu, index) => (
                                            <option className='bg-white' name="option" key={index} style={{color : statu.color}}> {" "} {statu.name} </option>
                                            ))}
                                    </select>
                                    <button className='btn btn-outline-success w-75' onClick={closeModal} >Done</button>
                                    <div className="modal fade" id="addproductmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                                        <div className="modal-dialog text-white" >
                                            <div className="modal-content" style={{backgroundColor: 'rgb(2, 42, 97)', color : 'white', }}>
                                            <div className="px-2 d-flex align-items-center justify-content-between">
                                                <h4 className="modal-title fs-5" id="exampleModalLabel">Add product </h4>
                                                <button type="button" className="btn-close" style={{backgroundColor: 'white'}} data-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <input id='prodName' className='px-2 py-1 rounded-1 border-0' list="brow" placeholder='Product name'/>
                                                <datalist id="brow">
                                                {props.products.map((prod, index) => (
                                                        <option name="option" value={prod.product_name} key={index}> {" "}{prod.product_name} </option>
                                                    ))}
                                                </datalist> 
                                                <div className='me-2 fw-semibold mt-3'>Quantity:</div>
                                                <div className='buttns ' id='incDec'>
                                                    <button className='bg-primary rounded-1'  type='submit' onClick={(e)=>hundellSubmitAddProduct(e)} data-btn = 'increase'>+</button>
                                                    <span id='count'> {''} 0 </span>
                                                    <button className='bg-primary rounded-1'  type='submit' onClick={(e)=>hundellSubmitAddProduct(e)} data-btn = 'decrease'>–</button>
                                                </div>
                                            </div>
                                            <div className="text-end p-2">
                                                <button type="button" className="btn btn-danger mx-1" data-dismiss="modal">Cancel</button>
                                                <button type="button" className="btn btn-primary mx-1" onClick={()=>addProductToOrder(selectedRowData.order_id)} >Add</button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <DataTable 
                                columns ={productscolumns}
                                data ={props.orderProducts}
                                selectableRowsHighlight
                                highlightOnHover
                                fixedHeader 
                                bordered
                                customStyles={tableCustomStyles}
                            >
                            </DataTable>
                        </div>
                    )}
                </Modal>
            </div>}
            
        </div>
    )
}

const mapStateToProps =(state)=>{
    //console.log('orders', state.orders)
    return{
        response : state.error,
        isAuthenticated : state.isAuthenticated,
        isAdmin : state.isAdmin,
        deleteMsg : state.deleteMsg,
        updateMsg : state.updateMsg,
        orders : state.orders,
        status : state.status,
        states : state.states,
        products : state.products,
        orderProducts : state.orderProducts
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        getOrders: ()=>{
            dispatch(bringOrdersThunk())
        },
        getStatus: ()=>{
            dispatch(bringStatusThunk())
        },
        getOrderProducts: (order_id)=>{
            dispatch(bringOrderProductsThunk(order_id))
        },
        deleteProdFromOrder:(ids)=>{
            dispatch(deleteProductFromOrderThunk(ids))
        },
        changeStaus:(ids)=>{
            dispatch(changeOrderStatusThunk(ids))
        },
        updateOrderProducts:(values)=>{
            dispatch(updateOrderProductThunk(values))
        },
        getProducts : ()=>{
            dispatch(bringProductsThunk())
        },
        changeTotalAmount:(vals)=>{
            dispatch(changeOrderTotalAmountThunk(vals))
        },
        addProductToOrder: (vals)=>{
            dispatch(addProductToOrderThunk(vals))
        }
    }
    
}
export default connect(mapStateToProps, mapDispatchToProps) (Orders);


