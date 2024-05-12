import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import prodimg from '../images/Default.png'
import {bringProductsThunk} from '../actions/IMSAction'
import ClipLoader from "react-spinners/ClipLoader";
import '../styles/Products.css'
function Products(props){
    const [records, setRecords] = useState(props.products)
    const [selectfilterBrand, setSelectfilterBrand] = useState('');
    const [selectfilterCategory, setSelectfilterCategory] = useState('');
    const [equivalent, setEquivalent] = useState('')
    const [isfiltred, setIsfiltred] = useState(true);
    const [isLoading, setIsLoading] = useState(true)
    const imagesURL = process.env.REACT_APP_API_IMAGES_URL;

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 18;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    useEffect(() => {
      if (props.products !== records) {
        //props.getProducts()
        if(isfiltred){
          setRecords(props.products)
          setIsfiltred(false)
        } 
      }

      if(props.products.length !== 0){
        setIsLoading(false)
      }
    }, [props.products]);
 
    const currentProducts = ((records.length === 0)? props.products :records ).slice(indexOfFirstProduct, indexOfLastProduct);

    const nextPage = () => {
      if (currentPage < Math.ceil(((records.length === 0)? props.products :records ).length / productsPerPage)) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const prevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const filterByName =(e)=>{
      const newData = props.products.filter(prod =>{ 
          return prod.product_name.toLowerCase().includes(e.target.value.toLowerCase())
      })
      setRecords(newData)
      setIsfiltred(true)
    }
    
    const filterByRef =(e)=>{
        const newData = props.products.filter(prod =>{ 
            return prod.product_ref.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(newData)
        setIsfiltred(true)
    }

    const filterByCategory =(e)=>{
        const newData = props.products.filter(prod =>{ 
          if(e.target.value === 'Category'){
              return props.products
          }else{
              return prod.category_name.toLowerCase() === e.target.value.toLowerCase()
          }
        })
        setRecords(newData)
        setIsfiltred(true)
        setSelectfilterCategory(e.target.value)
    }

    const filterByBrand =(e)=>{
        const newData = props.products.filter(prod =>{ 
          if(e.target.value === 'Brand'){
              return props.products
          }else{         
              return prod.brand_name.toLowerCase() === e.target.value.toLowerCase()
          }
        })
        setRecords(newData)
        setIsfiltred(true)
        setSelectfilterBrand(e.target.value)
    }

    const handleShow=(ref)=>{
        let row = props.products.filter((product)=> product.product_ref === ref)
        //console.log('row', row)
        setEquivalent({category : row[0].category_name, ref : row[0].product_ref, quantity : row[0].product_stock})
        const ids = ['detailName', 'detailRef', 'detailQuantity', 'detailPrice','detailDescription', 'detailCategory', 'detailBrand', 'prodImage']
        const spans = ids.map((id) => document.getElementById(id))
        spans.forEach((sp) => { 
            switch(sp.id){
                case 'detailName':
                    sp.textContent = row[0].product_name
                    break;
                case 'detailRef':
                    sp.textContent = row[0].product_ref 
                    break;
                case 'detailQuantity':
                    sp.textContent = row[0].product_stock
                    break;
                case 'detailPrice':
                    sp.textContent = row[0].product_price+'DH'
                    break;
                case 'detailDescription':
                    sp.textContent = row[0].product_desc
                    break;
                case 'detailCategory':
                    sp.textContent = row[0].category_name
                    break;
                case 'detailBrand':
                    sp.textContent = row[0].brand_name
                    break;
                  case 'prodImage':
                    sp.src = row[0].product_image === "" || row[0].product_image === undefined || row[0].product_image === null
                          ? prodimg 
                          : `${imagesURL}/${row[0].product_image}`
                    break;
                default :
                    sp.textContent = ''
            }
        })
    }

    const handeleReset =(e)=>{
        e.preventDefault()
        const ids = ['filterName', 'filterRef', 'filterCategory', 'filterBrand']
        const inputs = ids.map((id)=> document.getElementById(id))
        inputs.forEach((inp)=> {
            switch(inp.id){
                case 'filterName': inp.value = ''; break;
                case 'filterRef': inp.value = ''; break;
                case 'filterCategory': setSelectfilterCategory(inp.firstChild.value); break;
                case 'filterBrand':setSelectfilterBrand(inp.firstChild.value); break;
                default: inp.value = ''
            }
        })
        setRecords(props.products)
    }

    return (
      <div className="ProductsWindow" id="products bg-light">
        <div className="container ">
          <h4>products Management</h4>
          <div className="filters">
            <input
              id="filterName"
              className="filterinp"
              type="text"
              placeholder="Filter by Name"
              onChange={filterByName}
            />
            <input
              id="filterRef"
              className="filterinp"
              type="text"
              placeholder="Filter by Ref"
              onChange={filterByRef}
            />
            <select
              id="filterCategory"
              className="filterinp"
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
              className="filterinp"
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
            <span className="btn btn-outline-primary " onClick={handeleReset}>Reset</span>
          </div>
          {isLoading? <div className='loadind '><ClipLoader color={'#36d7b7'} loading={isLoading} size={60} />Loading... </div>:
          <div className="prod w-100 rounded bg-light">
            {currentProducts.map((product) => (
                (
                  <div
                    className="card"
                    key={product.product_ref}
                    onClick={() => handleShow(product.product_ref)}
                    data-toggle="modal"
                    data-target="#viewproducts"
                  >
                    <img
                      src={
                        product.product_image === "" || product.product_image === undefined || product.product_image === null
                          ? prodimg 
                          : `${imagesURL}/` + product.product_image
                      }
                      className="card-img-top"
                      alt="product"
                    />
                    <div className="card-body">
                        <div className="line_desc">
                          {product.product_desc}
                        </div>
                        <div className="line_prices ">
                          <span className='prices'> {((product.product_price)-(product.product_price)*20/100).toFixed(2)+'Dhs'}</span>
                        </div>
                        <div className="line_old_price">
                          <span className="old_price"> {" "}{product.product_price}Dhs{" "} </span>
                          <span className='remise'>-20%</span>
                        </div>
                     
                    </div>
                    {/* <div className="card-footer text-muted">
                      <button className="btn btn-primary showMore">
                        Show Details
                      </button>
                    </div> */}
                  </div>
                )
              )
            )}
          </div>}
          {/* Pagination controls */}
          <div className='pagination'>
            <button onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <button onClick={nextPage} disabled={currentPage === Math.ceil(((records.length === 0)? props.products :records ).length / productsPerPage)}>
              Next
            </button>
          </div>
          {/* View Item Modal */}
          <div
            className="modal fade "
            id="viewproducts"
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
                    style={{fontSize : '2rem'}}
                  >
                    <span aria-hidden="true">&times;</span>
                  </span>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className=" left col-auto col-sm-6 col-md-6 col-lg-6 ">
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
                      <div className="lines d-flex ">
                        <span className="detail"  style={{width : 'fit-content'}}>Recommended:</span>
                        <span id="detailBrand" className="leftR px-1  ">
                          {props.products.map((product) =>
                            product.category_name === equivalent.category &&
                            product.product_ref !== equivalent.ref ? (
                              <span
                                className="text-primary"
                                key={product.product_ref}
                              >
                                {" "}
                                {product.product_ref},{" "}
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
                        <img id='prodImage' src='' alt="product" />{" "}
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
                  {/*<div className="equivals">
                    {props.products.map((product) =>
                      product.category_name === equivalent.category &&
                      product.product_ref !== equivalent.ref ? (
                        <div
                          className="card border-primary mb-3"
                          key={product.product_ref}
                          style={{ maxWidth: "9.2rem" }}
                        >
                          <div className="card-body text-primary infor ">
                            <div className="lines">
                              <span className="detail">Reference:</span>
                              <span className="result">
                                {" "}
                                {product.product_ref}{" "}
                              </span>
                            </div>
                            <div className="lines">
                              <span className="detail">Name:</span>
                              <span className="result">
                                {" "}
                                {product.product_name}{" "}
                              </span>
                            </div>
                            <div className="lines">
                              <span className="detail">Brand:</span>
                              <span className="result">
                                {" "}
                                {product.brand_name}{" "}
                              </span>
                            </div>
                            <div className="lines">
                              <span className="detail">Quantity:</span>
                              <span
                                className="result"
                                style={{
                                  color:
                                    product.product_stock === 0
                                      ? "red"
                                      : "black",
                                }}
                              >
                                {" "}
                                {product.product_stock}{" "}
                              </span>
                            </div>
                            <div className="lines">
                              <span className="detail">Price :</span>
                              <span className="result text-danger">
                                {" "}
                                {product.product_price}DH{" "}
                              </span>
                            </div>
                          </div>
                          <div className=" c-footer">
                            <button
                              className="btn text-primary"
                              data-toggle="modal"
                              data-target="#viewproduct"
                              onClick={() => handleShow(product.product_ref)}
                            >
                              <i className="bi bi-eye-fill"></i>
                            </button>
                          </div>
                        </div>
                      ) : (
                        ""
                      )
                    )}
                  </div>*/}
                  <div className="equivals">
                    {props.products.map((product) =>
                      product.category_name === equivalent.category &&
                      product.product_ref !== equivalent.ref ? (
                        <div
                          className="card border-primary mb-3"
                          key={product.product_ref}
                          style={{ maxWidth: "12rem" }}
                          onClick={() => handleShow(product.product_ref)}
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
                          <div className="card-body">
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
                          {/* <div className=" c-footer">
                            <button
                              className="btn text-primary p-0"
                              data-toggle="modal"
                              data-target="#viewproduct"
                              onClick={() => handleShow(product.product_ref)}
                            >
                              <i className="bi bi-eye-fill"></i>
                            </button>
                          </div> */}
                        </div>
                      ) : (
                        ''
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      }
  }
  
}
export default connect(mapStateToProps, mapDispatchToProps)(Products);