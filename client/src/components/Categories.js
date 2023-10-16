import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DatePicker } from 'antd';
import {connect} from 'react-redux'
import ClipLoader from "react-spinners/ClipLoader";
import {bringCategoriesThunk, addCategoryThunk, updateCategoryThunk, deleteCategoryThunk} from '../actions/IMSAction'
//import 'antd/dist/antd.css';
import '../styles/Categories.css'
const { RangePicker } = DatePicker;

function Categories(props){
    
    const [records, setRecords] = useState(props.categories)
    const [condition, setCondition] = useState(null)
    const [selectedRange, setSelectedRange] = useState(null);
    const [isfiltred, setIsfiltred] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        if (props.categories !== records) {
            props.getCategories()
            if(!isfiltred){
                setRecords(props.categories);
                setIsfiltred(false)
            }
        }

        if(props.categories.length !== 0){
            setIsLoading(false)
        }
    }, [props.categories])

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
        /*{
            name : 'Deleted At',
            selector : row => row.deleted_date,
            sortable : true
        },*/
        {
            name: 'Actions',
            cell: (row) => (
              <div className='d-flex'>
                <span className="btn" data-toggle="modal" data-target="#updateCategory" onClick={() => clickUpdateButton(row)}><i className="bi bi-pencil-fill"></i></span>
                <span className='btn text-danger'   onClick={() => handleDelete(row)}><i className="bi bi-trash-fill"></i></span>
              </div>
            ),
            ignoreRowClick: true,
            allowoverflow: true,
            
        }
    ];

    function handleCloseModal(){ 
           
        document.getElementById("addCategory").classList.remove("show", "d-block");
        document.getElementById("updateCategory").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
    }

    const filterByName =(e)=>{
        const newData = props.categories.filter(row =>{ 
            console.log('dates', row.created_date)
            return row.name.toLowerCase().includes(e.target.value.toLowerCase()) 
        })
        setRecords(newData)
        setIsfiltred(true)
    }

    const HandellAddCategory =(e)=>{
        e.preventDefault()
        let newCategory = document.getElementById('name').value
        props.addCategory(newCategory)
        handleCloseModal()
        props.addMsg? toast.success(`${props.addMsg}`) :  console.log('');
        props.response? toast.error(`${props.response}`) :  console.log('');
    }

    const clickUpdateButton=(row)=>{
        let newCategory = document.getElementById('upname')
        newCategory.value = row.name;
        setCondition(row.name)
    }
    const HandellUpdateCategory=()=>{
        let newCategory = document.getElementById('upname')
        props.updateCategory({newValue: newCategory.value, condition : condition})
        handleCloseModal()
        props.updateMsg? toast.success(`${props.updateMsg}`) :  console.log('');
        props.response? toast.error(`${props.response}`) :  console.log(''); 
        setRecords(props.categories)
    }
    
    const handleDelete=(row)=>{
        props.deleteCategory(row.name)
        props.deleteMsg? toast.success(`${props.deleteMsg}`) :  console.log('');
        props.response? toast.error(`${props.response}`) :  console.log(''); 
        setRecords(props.categories)
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
                    setRecords(props.categories);; 
                    break;
                default: inp.value = ''
            }
        })
        setRecords(props.categories)
    }
    
    return(
        <div className='Category' id='Category'>
            <h1 className='px-3'>Categories Manager </h1>
            <div className='filters'>
                <div className='dates mt-3 mx-3 '>
                    <RangePicker
                        value={selectedRange}
                        id = 'filterDate'
                        onChange={(values) =>{
                            if (values && values.length === 2) {
                                let startDate = values[0].format('YYYY-MM-DD')
                                let endDate = values[1].format('YYYY-MM-DD')
                                const theRest = props.categories.filter((row)=>{

                                    const date = new Date(row.created_date);
                                    const year = date.getFullYear();
                                    const month = String(date.getMonth() + 1).padStart(2, '0');
                                    const day = String(date.getDate()).padStart(2, '0');
                                    const formattedDate = `${year}-${month}-${day}`;
                                    
                                    return (startDate <= formattedDate && formattedDate<= endDate)
                                })
                                setRecords(theRest)
                                setSelectedRange(values);
                            }else {
                                setRecords(props.categories)
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
                    title = {'Manage categories'}
                    columns ={columns}
                    data ={records} 
                    selectableRows 
                    selectableRowsHighlight
                    highlightOnHover
                    fixedHeader 
                    bordered
                    customStyles={tableCustomStyles}
                    pagination
                    actions ={<button type="button" className="btn btn-info" data-toggle="modal" data-target="#addCategory" >Add Category</button>}
                >
                </DataTable>
            </div>}
            {/* Add category Modal */}
            <div className="modal fade" id="addCategory" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Add New Category</h3>
                        <span type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </span>
                    </div>
                    <div className="modal-body">
                        <div className="roo">
                            <label htmlFor="name">Name:</label>
                            <input id="name" type="text" name="name" placeholder='New category name'/>
                        </div>
                    </div>
                    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={HandellAddCategory}>Add Category</button>
                    </div>
                    </div>
                </div>
            </div>
            {/* Update category Modal */}
            <div className="modal fade" id="updateCategory" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Update Category</h3>
                        <span type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </span>
                    </div>
                    <div className="modal-body">
                        <div className="roo">
                            <label htmlFor="upname">Name:</label>
                            <input id="upname" type="text" name="upname" placeholder='New category name'/>
                        </div>
                    </div>
                    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={HandellUpdateCategory}>Update Category</button>
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
        addCategory : (newCategory)=>{
            dispatch(addCategoryThunk(newCategory))
        },
        updateCategory : (newCategory)=>{
            dispatch(updateCategoryThunk(newCategory))
        },
        deleteCategory : (category_name)=>{
            dispatch(deleteCategoryThunk(category_name))
        }
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps) (Categories);

