import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import prodimg from '../images/Default.png';
import DataTable from 'react-data-table-component';
import {connect} from 'react-redux';
import { addProductThunk, deleteProductThunk, updateProductThunk, bringProductsThunk} from '../actions/IMSAction';
import { DatePicker } from 'antd';
import ClipLoader from "react-spinners/ClipLoader";
import '../styles/Stock.css';

const { RangePicker } = DatePicker;

function ViewStock(props){

  const [records, setRecords] = useState(props.products);
  const [selecaddcategory, setSelecaddcategory] = useState('');
  const [selectfilterCategory, setSelectfilterCategory] = useState('');
  const [selectaddbrand, setSelectaddbrand] = useState('');
  const [selectfilterBrand, setSelectfilterBrand] = useState('');
  const [deleteCondition, setDeleteCondition] = useState(null);
  const [equivalent, setEquivalent] = useState('');
  const [extentionMsg, setExtentionMsg] = useState( '');
  const [selectedRange, setSelectedRange] = useState(null);
  const [imagetoUpdate, setImagetoUpdate] = useState(null); // old image path to update
  const [imageUrl, setImageUrl] = useState(null);
  const [isfiltred, setIsfiltred] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const imagesURL = process.env.REACT_APP_API_IMAGES_URL;

  useEffect(() => {
    if (props.products.length === 0 || props.products !== records) {
      props.getProducts()
      if(isfiltred){
        setRecords(props.products)
        setIsfiltred(false)
      }
    }

    if(props.products.length !== 0){
      setIsLoading(false)
    }
  }, [props.products]);

  const columns = [
    {
      name : 'Name',
      selector : row => row.product_name,
      sortable : true,
    },
    {
      name : 'Created At',
      selector : row => {

        var originalDate = row.product_date;
        var dateObject = new Date(originalDate);
        var formattedDate = dateObject.getFullYear() + "/" + ('0' + (dateObject.getMonth() + 1)).slice(-2) + "/" + ('0' + dateObject.getDate()).slice(-2) + "   " + ('0' + dateObject.getHours()).slice(-2) + ":" + ('0' + dateObject.getMinutes()).slice(-2) + ":" + ('0' + dateObject.getSeconds()).slice(-2);
        return formattedDate

      },
      width : '16%',
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
    /*{
      name : 'Description',
      selector : row => row.product_desc,
      sortable : true
    },*/
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
      name: 'Actions',
      cell: (row) => (
        <div className='d-flex'>
          <span className='btn text-primary' data-toggle="modal" data-target="#viewproduct" onClick={(e) => handleShow(row, e)}><i className="bi bi-eye-fill"></i></span>
          <span className="btn" data-toggle="modal" data-target="#update" onClick={() => clickUpdateButton(row)}><i className="bi bi-pencil-fill"></i></span>
          <span className='btn text-danger'   onClick={() => handleDelete(row)}><i className="bi bi-trash-fill"></i></span>
        </div>
      ),
      ignoreRowClick: true,
      allowoverflow: true, 
      center: 'true'     
    }
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };
  
  function handleCloseModal(){       
    document.getElementById("addproduct").classList.remove("show", "d-block");
    document.getElementById("update").classList.remove("show", "d-block");
    document.querySelectorAll(".modal-backdrop")
    .forEach(el => el.classList.remove("modal-backdrop"));
  }
  
  const filterByName =(e)=>{
    const newData = props.products.filter(row =>{ 
        return row.product_name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setRecords(newData)
    setIsfiltred(true)
  }

  const filterByRef =(e)=>{
      const newData = props.products.filter(row =>{ 
          return row.product_ref.toLowerCase().includes(e.target.value.toLowerCase())
      })
      setRecords(newData)
      setIsfiltred(true)
  }

  const filterByCategory =(e)=>{
      const newData = props.products.filter(row =>{
          if(e.target.value === 'Category'){
              return props.products
          }else{
              return row.category_name.toLowerCase() === e.target.value.toLowerCase()
          }
      })
      setRecords(newData)
      setIsfiltred(true)
      setSelectfilterCategory(e.target.value)

  }

  const filterByBrand =(e)=>{
      const newData = props.products.filter(row =>{
          if(e.target.value === 'Brand'){
              return props.products
          }else{
              return row.brand_name.toLowerCase() === e.target.value.toLowerCase()
          }
      })
      setRecords(newData)
      setSelectfilterBrand(e.target.value)
      setIsfiltred(true)
  }

  const addCategory =(e)=>{
      setSelecaddcategory(e.target.value);
  }

  const addBrand =(e)=>{
      setSelectaddbrand(e.target.value);
  }

  const clickUpdateButton=(row)=>{
    //console.log(row)
    const ids = ['upname', 'upref', 'upquantity', 'upprice','updesc', 'upcategory', 'upbrand', 'selecImg']
    const inputs = ids.map((id) => document.getElementById(id))
    setImagetoUpdate(row.product_image)
    const chooseFile = document.getElementById("upimage");
    const imgPreview = document.getElementById("img-preview");
    const selecImg = document.getElementById("selecImg");
    chooseFile.addEventListener("change", function () {
      getImgData();
    });
    
    function getImgData(){
      const files = chooseFile.files[0];
      if (files) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
          imgPreview.style.display = "block";
          selecImg.src = this.result;
        });    
      }
    }

    inputs.forEach((inp) => {
      switch(inp.id){
        case 'upname':
          inp.value = row.product_name
          break;
        case 'upref':
          inp.value = row.product_ref
          break;
        case 'upquantity':
          inp.value = row.product_stock
          break;
        case 'upprice':
          inp.value = row.product_price
          break;
        case 'updesc':
          inp.value = row.product_desc
          break;
        case 'upcategory':
          inp.value = row.category_name
          break;
        case 'upbrand':
          inp.value = row.brand_name
          break;
        case 'selecImg':
          imgPreview.style.display = "block";
          selecImg.src = `${imagesURL}/${row.product_image}`;
          break;
        default :
          inp.value = ''
    }
    })
      setDeleteCondition(row.product_ref) 
  }

  const hundeleUpdate =(e)=>{
      e.preventDefault()
      var values = [];
      const ids = ['upname', 'upref', 'upquantity', 'upprice','updesc', 'upcategory', 'upbrand', 'upimage']
      const inputs = ids.map((id) => document.getElementById(id))

      let catName, brandName;

      inputs.forEach((inp) => { 
        if(inp.name === 'upcategory' ) {
            props.categories.forEach((item)=>{
                if(item.name === inp.value)
                values.push(item.id);
                catName = item.name;
            })
        }else if(inp.name === 'upbrand'){
            props.brands.forEach((item)=>{
                if(item.name === inp.value) 
                values.push(item.id);
                brandName = item.name;
            })
        }else if (inp.id === 'upimage' && inp.files.length > 0) {
            values.push(inp.files[0].name);
        }else{
            values.push(inp.value);
        }
      })
      
      const formData = new FormData();
      formData.append('name', values[0]);
      formData.append('ref', values[1]);
      formData.append('quantity', values[2]); 
      formData.append('price', values[3]);
      formData.append('desc', values[4]);
      formData.append('category', values[5]);
      formData.append('brand', values[6]);
      formData.append('categoryName', catName);
      formData.append("brandName", brandName);
      formData.append('condition', deleteCondition);
      if (inputs[7].type === "file" && inputs[7].files.length > 0) {
        formData.append("image", inputs[7].files[0]);
        formData.append("oldImageUrl", imagetoUpdate)
        function getExtension(filename) {
          return filename.split('.').pop()
        }  
        let extention = getExtension(inputs[7].files[0].name).toLowerCase()
        if(extention === 'jpg' || extention === 'png' || extention === 'webp' || extention === 'jpeg'){ 
          props.updateProduct(formData)
        }else{  
          setExtentionMsg('File extention not suported plase enter a file with(jpg, png or webp)')
          extentionMsg? toast.success(`${extentionMsg}`) :  console.log(''); 
        }
      }else{
        props.updateProduct(formData)
      }
      props.updateMsg? toast.success(`${props.updateMsg}`) :  console.log('');
      props.response? toast.error(`${props.response}`) :  console.log('');
      handleCloseModal()
      setRecords(props.products)
  }

  const handleDelete=(row)=>{
    if(row.product_image === null || row.product_image === undefined || row.product_image === ''){
      props.deleteProduct({
        product_ref: row.product_ref,
        image_src: null,
      });
    }else{
      props.deleteProduct({
        product_ref: row.product_ref,
        image_src: row.product_image,
      });
    }
    props.deleteMsg? toast.success(`${props.deleteMsg}`) :  console.log('');
    props.response? toast.error(`${props.response}`) :  console.log(''); 
    setRecords(props.products)
  }

  const handleShow=(row, e)=>{
    e.preventDefault();
      setEquivalent({category : row.category_name, ref : row.product_ref, quantity : row.product_stock})
      const ids = ['detailName', 'detailRef', 'detailQuantity', 'detailPrice','detailDescription', 'detailCategory', 'detailBrand', 'prodImg']
      const spans = ids.map((id) => document.getElementById(id))
      spans.forEach((sp) => { 
          switch(sp.id){
              case 'detailName':
                  sp.textContent = row.product_name
                  break;
              case 'detailRef':
                  sp.textContent = row.product_ref
                  break;
              case 'detailQuantity':
                  sp.textContent = row.product_stock
                  break;
              case 'detailPrice':
                  sp.textContent = row.product_price+'DH'
                  break;
              case 'detailDescription':
                  sp.textContent = row.product_desc
                  break;
              case 'detailCategory':
                  sp.textContent = row.category_name
                  break;
              case 'detailBrand':
                  sp.textContent = row.brand_name
                  break;
              case 'prodImg':
                  sp.src = row.product_image === null || row.product_image === undefined || row.product_image === ''
                        ? prodimg
                        : `${imagesURL}/${row.product_image}`
                      break;
              default :
                  sp.textContent = ''
          }
      })
  }

  const HandellAddItem = (e)=>{
    e.preventDefault()
    const values = [];
    const ids = ['name', 'ref', 'quantity', 'price', 'desc', 'category', 'brand', 'image'];
    const inputs = ids.map((id) => document.getElementById(id));
    let catName, brandName;

    inputs.forEach((inp) => {
      if (inp.id === 'category') {
        const category = props.categories.find((item) => item.name === inp.value);
        if (category){
          values.push(category.id);
          catName = category.name;
        }
      } else if (inp.id === 'brand') {
        const brand = props.brands.find((item) => item.name === inp.value);
        if (brand){
          values.push(brand.id);
          brandName = brand.name;
        }
      } else if (inp.id === 'image' && inp.files.length > 0) {
        values.push(inp.files[0].name);
      } else {
        values.push(inp.value);
      }
    });

    const formData = new FormData();
    formData.append('name', values[0]);
    formData.append('ref', values[1]);
    formData.append('quantity', values[2]);
    formData.append('price', values[3]);
    formData.append('desc', values[4]);
    formData.append('category', values[5]);
    formData.append('brand', values[6]);
    formData.append("categoryName", catName);
    formData.append("brandName", brandName);

    if (inputs[7].type === "file" && inputs[7].files.length > 0) {
      formData.append("image", inputs[7].files[0]);
    }

    function getExtension(filename) {
      return filename.split('.').pop()
    }

    if (inputs[7].type === "file" && inputs[7].files.length > 0) {
      let extention = getExtension(inputs[7].files[0].name).toLowerCase()
      if(extention === 'jpg' || extention === 'png' || extention === 'webp' || extention === 'jpeg'){
        props.addProduct(formData)
      }else{
        setExtentionMsg('File extention not suported plase enter a file with(.jpg, .png or .webp)')
        extentionMsg? toast.success(`${extentionMsg}`) :  console.log('');
      }
    }else{
      props.addProduct(formData)
    }
    props.addMsg? toast.success(`${props.addMsg}`) :  console.log('');
    props.response? toast.error(`${props.response}`) :  console.log('');
    //reset all fields
    const addImg = document.getElementById("addimage");
    inputs.forEach((inp) =>{
      switch(inp.id){
        case 'category': inp.selectedIndex = 0; break;
        case 'brand': inp.selectedIndex = 0; break;
        case 'image': addImg.src = ''; break;
        default: inp.value = ''; break;
      }
    });
    handleCloseModal()
    setRecords(props.products)
  }

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
          paddingRight: '0.8rem',
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
    const ids = ['filterName', 'filterRef', 'filterCategory', 'filterBrand', 'filterDate']
    const inputs = ids.map((id)=> document.getElementById(id))
    inputs.forEach((inp)=> {
      switch(inp.id){
        case 'filterName': inp.value = ''; break;
        case 'filterRef': inp.value = ''; break;
        case 'filterCategory': setSelectfilterCategory(inp.firstChild.value); break;
        case 'filterBrand': setSelectfilterBrand(inp.firstChild.value); break;
        case 'filterDate':
          setSelectedRange(null);
          setRecords(props.products);
          break;
        default: inp.value = ''
      }
    })
    setRecords(props.products)
  }

  return (
    <div className="products bg-light" id="stock">
      <div className="container">
        <h4 className="">Stock Management</h4>
        {isLoading? <div className='loadind '><ClipLoader color={'#36d7b7'} loading={isLoading} size={60} />Loading... </div>:
        <div className="container p-0">
          <div className="dates">
            <RangePicker
              value={selectedRange}
              id="filterDate"
              onChange={(values) => {
                if (values && values.length === 2) {
                  let startDate = values[0].format("YYYY-MM-DD");
                  let endDate = values[1].format("YYYY-MM-DD");
                  const theRest = props.products.filter((row) => {

                    let year = new Date(row.product_date).getFullYear();
                    let month = new Date(row.product_date).getMonth();
                    let day = new Date(row.product_date).getDay();
                    const formattedDate = `${year}-${month+1}-${day+12}`
                  /* const date = new Date(row.product_date);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const day = String(date.getDate()).padStart(2, "0");
                    const formattedDate = `${year}-${month}-${day}`;*/
                    return (
                      startDate <= formattedDate && formattedDate <= endDate
                    );
                  });
                  setRecords(theRest);
                  setSelectedRange(values);
                } else {
                  setRecords(props.products);
                  setSelectedRange(null);
                }
              }}
            />
            <span
              className="btn btn-outline-primary mx-3 py-2"
              onClick={handeleReset}
            >
              Reset
            </span>
          </div>
          <div className="filters">
            <input
              id="filterName"
              className="filterinp py-2"
              type="text"
              placeholder="Filter by Name"
              onChange={filterByName}
            />
            <input
              id="filterRef"
              className="filterinp py-2"
              type="text"
              placeholder="Filter by Ref"
              onChange={filterByRef}
            />
            <select
              id="filterCategory"
              className="filterinp py-2"
              value={selectfilterCategory}
              onChange={filterByCategory}
            >
              <option disabled={true} value="">
                {" "}
                Category
              </option>
              {props.categories.map((category, index) => (
                <option name="option" key={index}>
                  {" "}
                  {category.name}
                </option>
              ))}
            </select>
            <select
              id="filterBrand"
              className="filterinp py-2"
              value={selectfilterBrand}
              onChange={filterByBrand}
            >
              <option disabled={true} value="">
                {" "}
                Brand
              </option>
              {props.brands.map((brand, index) => (
                <option name="option" key={index}>
                  {" "}
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <DataTable
            title={"Manage Stock"}
            columns={columns}
            data={records}
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            fixedHeader
            bordered
            pagination
            customStyles={tableCustomStyles}
            actions={
              <button
                type="button"
                className="btn btn-info"
                data-toggle="modal"
                data-target="#addproduct"
              >
                Add Product
              </button>
            }
          ></DataTable>
        </div>}
        {/* Add Item Modal */}
        <div
          className="modal fade"
          id="addproduct"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="exampleModalLabel">
                  Add Item To Stock
                </h3>
                <span
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </span>
              </div>
              <div className="modal-body">
                <div className="roo">
                  <label htmlFor="name">Name:</label>
                  <input id="name" type="text" name="name"/>
                </div>
                <div className="roo">
                  <label htmlFor="ref">Ref :</label>
                  <input id="ref" type="text" name="ref"/>
                </div>
                <div className="roo">
                  <label htmlFor="quantity">Quantity :</label>
                  <input
                    id="quantity"
                    type="number"
                    min={0}
                    max={30}
                    name="quantity"
                  />
                </div>
                <div className="roo">
                  <label htmlFor="price">Price :</label>
                  <input id="price" type="text" name="price" />
                </div>
                <div className="roo">
                  <label htmlFor="category">Category :</label>
                  <select
                    value={selecaddcategory}
                    id="category"
                    name="category"
                    onChange={addCategory}
                  >
                    <option disabled={true} value="">
                      {" "}
                      Category
                    </option>
                    {props.categories.map((category) => (
                      <option name="option" key={category.id}>
                        {" "}
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="roo">
                  <label htmlFor="brand">Brand :</label>
                  <select
                    value={selectaddbrand}
                    id="brand"
                    name="brand"
                    onChange={addBrand}
                  >
                    <option disabled={true} value="">
                      {" "}
                      Brand
                    </option>
                    {props.brands.map((brand) => (
                      <option name="option" key={brand.id}>
                        {" "}
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="roo">
                  <label htmlFor="desc">Description :</label>
                  <textarea id="desc" type="text" name="desc" />
                </div>
                <div className="roo" id="up_Image">
                  <label htmlFor="image">Image :</label>
                  <div className="img_roo">
                    <div className="">
                      <label htmlFor="image" className="bg-primary text-white p-1 border rounded">Choose File</label>
                      <input className="p-0 w-25 inpChoose" type="file" id="image" name="image" alt="Selected"  onChange={handleImageChange} accept="image/*" />
                    </div>
                    <div id="img-preview" className="selecImg">
                      {imageUrl? <img id="addimage"  src={imageUrl} alt="Selected" /> : <img className="d-none" id="addimage"  src='' alt="Selected" />}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={HandellAddItem}
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Update Item Modal */}
        <div
          className="modal fade"
          id="update"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="exampleModalLabel">
                  Update Item
                </h3>
                <span
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </span>
              </div>
              <div className="modal-body">
                <div className="roo">
                  <label htmlFor="upname">Name:</label>
                  <input id="upname" type="text" name="upname" />
                </div>
                <div className="roo">
                  <label htmlFor="upref">Ref :</label>
                  <input id="upref" type="text" name="upref" />
                </div>
                <div className="roo">
                  <label htmlFor="upquantity">Quantity :</label>
                  <input
                    id="upquantity"
                    type="number"
                    min={0}
                    max={30}
                    name="upquantity"
                  />
                </div>
                <div className="roo">
                  <label htmlFor="upprice">Price :</label>
                  <input id="upprice" type="text" name="upprice" />
                </div>
                <div className="roo">
                  <label htmlFor="upcategory">Category :</label>
                  <select id="upcategory" name="upcategory">
                    <option disabled={true} value="">
                      {" "}
                      Category
                    </option>
                    {props.categories.map((category) => (
                      <option name="option" key={category.id}>
                        {" "}
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="roo">
                  <label htmlFor="upbrand">Brand :</label>
                  <select id="upbrand" name="upbrand">
                    <option disabled={true} value="">
                      {" "}
                      Brand
                    </option>
                    {props.brands.map((brand) => (
                      <option name="option" key={brand.id}>
                        {" "}
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="roo">
                  <label htmlFor="updesc">Description :</label>
                  <textarea id="updesc" type="text" name="updesc" />
                </div>
                <div className="roo" id="up_Image">
                  <label htmlFor="upimage">Image :</label>
                  <div className="img_roo">
                    <div className="">
                      <label htmlFor="upimage" className="bg-primary text-white p-1 border rounded">Choose File</label>
                      <input className="p-0 w-25 inpChoose" type="file" id="upimage" name="choose-file" src={imageUrl} alt="Selected"  onChange={handleImageChange} accept="image/*" />
                    </div>
                    <div id="img-preview" className="selecImg">
                      {imageUrl? <img id="selecImg"  src={imageUrl} alt="Selected" /> : <img src="" id="selecImg" alt="Product_image"></img>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={hundeleUpdate}
                >
                  Update Item
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* View Item Modal */}
        <div
          className="modal fade "
          id="viewproduct"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg view">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="exampleModalLabel">
                  Product Details
                </h3>
                <span
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </span>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className=" left col-auto col-sm-6 col-md-6 col-lg-6">
                    <div className="lines">
                      <span className="detail ">Reference:</span>
                      <span id="detailRef" className="leftR text-primary">
                        {" "}
                      </span>
                    </div>
                    <div className="lines">
                      <span className="detail">Name:</span>
                      <span id="detailName" className="leftR">
                        {" "}
                      </span>
                    </div>
                    <div className="lines">
                      <span className="detail">Quantity:</span>
                      <span
                        id="detailQuantity"
                        className="leftR"
                        style={{
                          color: equivalent.quantity === 0 ? "red" : "black",
                        }}
                      >
                        {" "}
                      </span>
                    </div>
                    
                    <div className="lines">
                      <span className="detail">Category:</span>
                      <span id="detailCategory" className="leftR">
                        {" "}
                      </span>
                    </div>
                    <div className="lines">
                      <span className="detail">Brand:</span>
                      <span id="detailBrand" className="leftR">
                        {" "}
                      </span>
                    </div>
                    <div className="lines d-flex" >
                      <span className="detail" style={{width : 'fit-content'}}>Recommended:</span>
                      <span id="detailBrand" className="leftR px-1 ">
                        {props.products.map((product) =>
                          (
                            product.category_name === equivalent.category &&
                              product.product_ref !== equivalent.ref
                          ) ? (
                            <span className="text-primary" key={product.product_ref}>
                              {" "}
                              {product.product_ref},  {" "}
                            </span>
                          ) : (
                            ""
                          )
                        )}
                      </span>
                    </div>
                    <div className="lines">
                      <span className="detail">Description:</span>
                      <span id="detailDescription" className="leftR">
                        {" "}
                      </span>
                    </div>
                  </div>
                  <div className=" right col-auto col-sm-6 col-md-6 col-lg-6">
                    <div className="productImage">
                      {" "}
                      <img id="prodImg" src="" alt="product" />{" "}
                    </div>
                    <div className="">
                      <span className="text-primary">Price : </span>
                      <span id="detailPrice" className="price">
                        {" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <h3 className="text-dark equivalet">Recommended:</h3>
                <div className="equivals">
                  {props.products.map((product) =>
                    product.category_name === equivalent.category &&
                    product.product_ref !== equivalent.ref ? (
                      <div
                        className="card border-primary mb-3"
                        style={{ maxWidth: "9.2rem" }}
                        key={product.product_ref}
                        onClick={(e) => handleShow(product, e)}
                      >
                        <img
                          src={
                            product.product_image === null || product.product_image === undefined || product.product_image === ''
                              ? prodimg
                              : `${imagesURL}/` + product.product_image
                          }
                          className="card-img-top_equivalent"
                          alt="product"
                        />
                        <div className="card-body ">
                          <div className="line_desc_equivalent">
                            {product.product_name}
                          </div>
                          <div className="line_prices_equivalent ">
                            <span className='prices'> {((product.product_price)-(product.product_price)*20/100).toFixed(2)+'Dhs'}</span>
                          </div>
                          <div className="line_old_price">
                            <span className="old_price"> {" "}{product.product_price}Dhs{" "} </span>
                            <span className='remise'>-20%</span>
                          </div>
                        </div>
                        
                      </div>
                    ) : (
                      ""
                    )
                  )}
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
  );
}

const mapStateToProps =(state)=>{

    return{
        response : state.error,
        isAuthenticated : state.isAuthenticated,
        isAdmin : state.isAdmin,
        products : state.products,
        categories : state.categories,
        users : state.users,
        brands : state.brands,
        addMsg : state.addMsg,
        deleteMsg : state.deleteMsg,
        updateMsg : state.updateMsg
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        getProducts : ()=>{
          dispatch(bringProductsThunk())
        },
        addProduct : (product)=>{
            dispatch(addProductThunk(product))
        },
        deleteProduct : (product_ref)=>{
            dispatch(deleteProductThunk(product_ref))
        },
        updateProduct : (product)=>{
            dispatch(updateProductThunk(product))
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps) (ViewStock);
