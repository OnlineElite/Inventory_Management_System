import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DatePicker } from 'antd';
import {connect} from 'react-redux'
import ClipLoader from "react-spinners/ClipLoader";
import {bringBrandsThunk, addBrandThunk, updateBrandThunk, deleteBrandThunk} from '../actions/IMSAction'
import '../styles/Brands.css'

const { RangePicker } = DatePicker;

function Brands(props){

    const [records, setRecords] = useState(props.brands)
    const [condition, setCondition] = useState(null)
    const [selectedRange, setSelectedRange] = useState(null);
    const [isfiltred, setIsfiltred] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(()=>{
        props.getBrands()
        if (props.brands !== records) {
            if(!isfiltred){
                setRecords(props.brands);
                setIsfiltred(false)
            }
        }

        if(props.brands.length !== 0){
            setIsLoading(false)
        }
    }, [props.brands])
    
    const columns = [
        {
            name : 'Name',
            selector : row => row.name,
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
            name : 'Updated At',
            selector : row =>{
                let year = new Date(row.updated_date).getFullYear();
                let month = new Date(row.created_date).getMonth();
                let day = new Date(row.updated_date).getDay();
                let hour = new Date(row.updated_date).getHours();
                let minute = new Date(row.updated_date).getMinutes();
                //let seconds = new Date(row.updated_date).getSeconds();
                return `${day+12}-${month+1}-${year} ${hour+1}:${minute}`
            },
            sortable : true
        },
        {
            name: 'Actions',
            cell: (row) => (
              <div className='d-flex'>
                <span className="btn" data-toggle="modal" data-target="#updateBrand" onClick={() => clickUpdateButton(row)}><i className="bi bi-pencil-fill"></i></span>
                <span className='btn text-danger'   onClick={() => handleDelete(row)}><i className="bi bi-trash-fill"></i></span>
              </div>
            ),
            ignoreRowClick: true,
            allowoverflow: true,
            
        }
    ];

    function handleCloseModal(){ 
           
        document.getElementById("addBrand").classList.remove("show", "d-block");
        document.getElementById("updateBrand").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
    }
    const filterByName =(e)=>{
        const newData = props.brands.filter(row =>{ 
            return row.name.toLowerCase().includes(e.target.value.toLowerCase()) 
        })
        setRecords(newData)
        setIsfiltred(true)
    }

    const HandellAddBrand =(e)=>{
        e.preventDefault()
        let newBrand = document.getElementById('name').value
        props.addBrand(newBrand)
        handleCloseModal()
        props.addMsg? toast.success(`${props.addMsg}`) :  console.log('');
        props.response? toast.error(`${props.response}`) :  console.log('');     
        setRecords(props.brands)
    }

    const clickUpdateButton=(row)=>{
        let newBrand = document.getElementById('upname')
        newBrand.value = row.name;
        setCondition(row.name)
    }
    const HandellUpdateBrand=(row)=>{
        let newBrand = document.getElementById('upname')
        props.updateBrand({newValue: newBrand.value, condition : condition})
        handleCloseModal()
        props.updateMsg? toast.success(`${props.updateMsg}`) :  console.log('');
        props.response? toast.error(`${props.response}`) :  console.log(''); 
        setRecords(props.brands)
    }
    
    const handleDelete=(row)=>{
        props.deleteBrand(row.name)
        props.deleteMsg? toast.success(`${props.deleteMsg}`) :  console.log('');
        props.response? toast.error(`${props.response}`) :  console.log('');  
        setRecords(props.brands)
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
        const ids = ['filterName', 'filterDate']
        const inputs = ids.map((id)=> document.getElementById(id))
        inputs.forEach((inp)=> {
            switch(inp.id){
                case 'filterName': inp.value = ''; break;
                case 'filterDate': 
                    setSelectedRange(null);
                    setRecords(props.brands);; 
                    break;
                default: inp.value = ''
            }
        })
        setRecords(props.brands)
    }

    return(
        <div className='Brands bg-light' id='Brands'>
            <h1 className='mx-3'>Brands Manager</h1>
            <div className='filters'>
                <div className='dates mt-3 mx-3'>
                    <RangePicker
                        value={selectedRange}
                        id = 'filterDate'
                        onChange={(values) =>{
                            if (values && values.length === 2) {
                                let startDate = values[0].format('YYYY-MM-DD')
                                let endDate = values[1].format('YYYY-MM-DD')
                                const theRest = props.brands.filter((row)=>{

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
                                setRecords(props.brands)
                                setSelectedRange(null);
                            }
                        }}
                    />
                </div>
                <input id='filterName' className='filterinp py-2' type='text' placeholder='Filter by Name' onChange={filterByName}/>
                <span className="btn btn-outline-primary mx-3 py-2 mt-3" onClick={handeleReset}>Reset</span>
            </div>
            {isLoading? <div className='loadind '><ClipLoader color={'#36d7b7'} loading={isLoading} size={60} />Loading... </div>:
            <div className='container mt-3'>
                <DataTable 
                    title = {'Manage brands'}
                    columns ={columns}
                    data ={records} 
                    selectableRows 
                    selectableRowsHighlight
                    highlightOnHover
                    fixedHeader 
                    bordered
                    pagination
                    customStyles={tableCustomStyles}
                    actions ={<button type="button" className="btn btn-info" data-toggle="modal" data-target="#addBrand" >Add Brand</button>}
                >
                </DataTable>
            </div>}
            {/* Add brand Modal */}
            <div className="modal fade" id="addBrand" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Add New Brand</h3>
                        <span type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </span>
                    </div>
                    <div className="modal-body">
                        <div className="roo">
                            <label htmlFor="name">Name:</label>
                            <input id="name" type="text" name="name" placeholder='New brand name'/>
                        </div>
                    </div>
                    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={HandellAddBrand}>Add Item</button>
                    </div>
                    </div>
                </div>
            </div>
            {/* Update brand Modal */}
            <div className="modal fade" id="updateBrand" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Update Brand</h3>
                        <span type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </span>
                    </div>
                    <div className="modal-body">
                        <div className="roo">
                            <label htmlFor="upname">Name:</label>
                            <input id="upname" type="text" name="upname" placeholder='New brand name'/>
                        </div>
                    </div>
                    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={HandellUpdateBrand}>Update Brand</button>
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
        isAuthenticated : state.isAuthenticated,
        brands : state.brands,
        addMsg : state.addMsg,
        deleteMsg : state.deleteMsg,
        updateMsg : state.updateMsg
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        getBrands : ()=>{
            dispatch(bringBrandsThunk())
        },
        addBrand : (newBrand)=>{
            dispatch(addBrandThunk(newBrand))
        },
        updateBrand : (newBrand)=>{
            dispatch(updateBrandThunk(newBrand))
        },
        deleteBrand : (brand_name)=>{
            dispatch(deleteBrandThunk(brand_name))
        }
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps) (Brands);

