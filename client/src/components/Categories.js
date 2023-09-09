import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { DatePicker } from 'antd';
import {connect} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {bringCategoriesThunk, addCategoryThunk, updateCategoryThunk, deleteCategoryThunk} from '../actions/IMSAction'
//import 'antd/dist/antd.css';
import '../styles/Categories.css'
const { RangePicker } = DatePicker;

function Categories(props){
    const [showAlert, setShowAlert] = useState(false);
    const [records, setRecords] = useState(props.categories)
    const [condition, setCondition] = useState(null)

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
    }

    const HandellAddCategory =(e)=>{
        e.preventDefault()
        let newCategory = document.getElementById('name').value
        props.addCategory(newCategory)
        handleCloseModal()
        props.getCategories()
        setRecords(props.categories)
    }

    const clickUpdateButton=(row)=>{
        let newCategory = document.getElementById('upname')
        newCategory.value = row.name;
        setCondition(row.name)
    }
    const HandellUpdateCategory=(row)=>{
        let newCategory = document.getElementById('upname')
        props.updateCategory({newValue: newCategory.value, condition : condition})
        handleCloseModal()
        props.getCategories()
        setRecords(props.categories)
    }
    
    const handleDelete=(row)=>{
        console.log('befor', props.categories)
        props.deleteCategory(row.name)
        if (props.deleteMsg) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
            props.getCategories()
            setRecords(props.categories)
            console.log('after', props.categories)
        }  
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
        <div className='Category' id='Category'>
            <h1 className='px-3'>Categories Manager </h1>
            <div className='filters'>
                <div className='dates mt-3 mx-3 '>
                    <RangePicker
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
                            }else {
                                setRecords(props.categories)
                            }
                        }}
                    />
                    
                </div>
                <input className='filterinp py-2' type='text' placeholder='Filter by Name' onChange={filterByName}/>
                <span className='refresh py-2 '><FontAwesomeIcon className='reload' icon="fa-solid fa-rotate-right" /></span>
            </div>
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
                    customStyles={tableCustomStyles}
                    pagination
                    actions ={<button type="button" className="btn btn-info" data-toggle="modal" data-target="#addCategory" >Add Category</button>}
                >
                </DataTable>
                
            </div>
            {/* Add category Modal */}
            <div className="modal fade" id="addCategory" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                    {showAlert && ( <div className="alert alert-success" role="alert"> {props.addMsgMsg} </div> )} 
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
                    {showAlert && ( <div className="alert alert-success" role="alert"> {props.updateMsg} </div> )} 
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
        },
        getCategories : ()=>{
            dispatch(bringCategoriesThunk())
        }
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps) (Categories);

