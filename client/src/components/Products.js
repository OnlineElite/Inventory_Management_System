import React, {useState} from 'react'
import {connect} from 'react-redux'
import prodimg from '../images/Default.png'
import '../styles/Products.css'
function Products(props){
    const [records, setRecords] = useState(props.products)
    const [selectfilterBrand, setSelectfilterBrand] = useState('');
    const [selectfilterCategory, setSelectfilterCategory] = useState('');
    const [equivalent, setEquivalent] = useState('')

    const filterByName =(e)=>{
        const newData = props.products.filter(prod =>{ 
            return prod.product_name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(newData)
    }
    
    const filterByRef =(e)=>{
        const newData = props.products.filter(prod =>{ 
            return prod.product_ref.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(newData)
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
        setSelectfilterBrand(e.target.value)
    }

    const handleShow=(ref)=>{
        let row = props.products.filter((product)=> product.product_ref === ref)
        console.log('row', row)
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
                    sp.src = row[0].product_image != null
                          ? `http://localhost:3005/uploads/${row[0].product_image}`
                          : prodimg
                        
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
                case 'filterCategory': inp.selectedIndex = 0; break;
                case 'filterBrand': inp.selectedIndex = 0; break;
                default: inp.value = ''
            }
        })
        setRecords(props.products)
    }

    return (
      <div className="ProductsWindow" id="products">
        <div className="container bg-light">
          <h1>Manage products</h1>
          <div className="filters px-3">
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
            <span className="btn btn-outline-primary mx-3" onClick={handeleReset}>Reset</span>
          </div>
          <div className="prod bg-light">
            {records.map(
              (product) => (
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
                        product.product_image != null
                          ? "http://localhost:3005/uploads/" + product.product_image
                          : prodimg
                      }
                      className="card-img-top"
                      alt="product"
                    />
                    <div className="card-body">
                      <div className="lines">
                        <span className="detail">Reference:</span>
                        <span className="result"> {product.product_ref} </span>
                      </div>
                      <div className="lines">
                        <span className="detail">Name:</span>
                        <span className="result"> {product.product_name} </span>
                      </div>
                      <div className="lines">
                        <span className="detail">Brand:</span>
                        <span className="result"> {product.brand_name} </span>
                      </div>
                      <div className="lines">
                        <span className="detail">Quantity:</span>
                        <span
                          className="result"
                          style={{
                            color:
                              product.product_stock === 0 ? "red" : "black",
                          }}
                        >
                          {" "}
                          {product.product_stock}{" "}
                        </span>
                      </div>
                      <div className="lines">
                        <span className="detail">Price :</span>
                        <span className="result price">
                          {" "}
                          {product.product_price}DH{" "}
                        </span>
                      </div>
                    </div>
                    <div className="card-footer text-muted">
                      <button className="btn btn-primary showMore">
                        Show Details
                      </button>
                    </div>
                  </div>
                )
              )
            )}
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
                      <div className="lines">
                        <span className="detail">Equivalents:</span>
                        <span id="detailBrand" className="leftR">
                          {props.products.map((product) =>
                            product.category_name === equivalent.category &&
                            product.product_ref !== equivalent.ref ? (
                              <span
                                className="text-success"
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
                  <h3 className="text-dark equivalet">Equivalents:</h3>
                  <div className="equivals">
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
export default connect(mapStateToProps)(Products);