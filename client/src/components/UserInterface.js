import React,{useEffect,useState} from 'react'
import Navbar from './Navbar';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import prodimg from '../images/Default.png'
import {connect} from 'react-redux'
import {bringProductsThunk, bringCategoriesThunk, bringBrandsThunk, addToCartThunk, addToFavoriesThunk} from '../actions/IMSAction'
import Footer from '../components/Footer'
import  '../styles/UserInterface.css'

function UserInterface(props){
    useEffect(()=>{
      props.getProducts()
      props.getCategories()
      props.getBrands()
      if(!isfiltred){
        setRecords(props.products)
        setIsfiltred(false)
      }
    
    }, [props.products])

    const [isfiltred, setIsfiltred] = useState(false);
    const [records, setRecords] = useState(props.products)
    const [equivalent, setEquivalent] = useState('')
    const [addToCart, setAddToCart] = useState('')
    const [addToFavories, setAddToFavories] = useState('')
    const [showAlert, setShowAlert] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const imagesURL = process.env.REACT_APP_API_IMAGES_URL; 

    const handleShow=(ref)=>{
        let row = props.products.filter((product)=> product.product_ref === ref)
        let isIn = props.infavories.some(item => item.product_ref === ref )
        setIsLiked(isIn)
            
        setAddToCart(row[0].product_id)
        setAddToFavories(row[0].product_id)
        setEquivalent({category : row[0].category_name, ref : row[0].product_ref, quantity : row[0].product_stock})
        const ids = [ 'detailQuantity', 'detailPrice','detailDescription', 'prodImage','detailOldPrice']
        const spans = ids.map((id) => document.getElementById(id))
        spans.forEach((sp) => {
            switch(sp.id){
                case 'detailQuantity':
                    sp.textContent = 'units left '+row[0].product_stock
                    break;
                case 'detailPrice':
                    sp.textContent = ((row[0].product_price)-(row[0].product_price)*20/100).toFixed(2)+'DH'
                    break;
                case 'detailDescription':
                    sp.textContent = row[0].product_desc
                    break;
                case 'detailOldPrice':
                    sp.textContent =row[0].product_price+'DH'
                    break;
                  case 'prodImage':
                    sp.src = row[0].product_image != null
                          ? `${imagesURL}/${row[0].product_image}`
                          : prodimg  
                    break;
                default :
                    sp.textContent = ''
            }
        })
    }

    const HandeleAddToCart =(id)=>{
      props.addToCart({product_id : id, user_id : props.userfullName[2] })
      if (props.response || props.updateMsg) {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
      }      
    }

    const handeleAddToFavories =(id)=>{
      props.addToFavories({product_id : id, user_id : props.userfullName[2] })
      if (props.response || props.updateMsg ) {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
      } 
    }

    const filterByCategory =()=>{
      let inputs = []
      let inpChecked = [];
      props.categories.forEach((category) => {
        let id = category.name;
        let input = document.getElementById(id);
        inputs.push(input)
        if (input) {
          let label = input.parentElement.querySelector('label');
          if (input.checked) {
            label.style.color = 'blue';
            label.style.fontWeight = 'bold';
            inpChecked.push(category.name);
          } else {
            label.style.color = 'black';
            label.style.fontWeight = 'normal';
          }
        }
      });
      console.log('inpChecked', inpChecked)
      let NewData = props.products.filter((product)=>{
        return inpChecked.includes(product.category_name)
      })
      console.log('toDisplay', NewData);
      if(inputs.some((inp)=> inp.checked)){
        setRecords(NewData)
        setIsfiltred(true)
      }else{
        setRecords(props.products);
      }
    }

    const filterByBrand = () => {
      let inputs = []
      let inpChecked = [];
      props.brands.forEach((brand) => {
        let id = brand.name;
        let input = document.getElementById(id);
        inputs.push(input)
        if (input) {
          let label = input.parentElement.querySelector('label');
          if (input.checked) {
            label.style.color = 'blue';
            label.style.fontWeight = 'bold';
            inpChecked.push(brand.name);
          } else {
            label.style.color = 'black';
            label.style.fontWeight = 'normal';
          }
        }
      });
      console.log('inpChecked', inpChecked)
      let NewData = props.products.filter((product)=>{
        return inpChecked.includes(product.brand_name)
      })
      console.log('toDisplay', NewData);
      if(inputs.some((inp)=> inp.checked)) {
        setRecords(NewData)
        setIsfiltred(true)
      }else{
        setRecords(props.products)
      }
    }
  
    return(
        <div className='userInterface'>
        <Navbar/>

            <div id='proods'>
              <div className='row px-3'>
                <div className=' col-12 col-sm-3 col-md-2 col-l-2 col-xl-2'>
                  <div className=' container sideFilter px-2 border bg-light rounded'>
                    <h5 className='w-100 text-dark '>Filter by category</h5>
                    <ul className='categs'>
                      {props.categories.map((categ, index)=>(
                        <li key={index}>
                          <input  onChange={filterByCategory} id={categ.name} type='checkbox' name={categ.name} />
                          <label className='mx-1' htmlFor={categ.name}>{categ.name}</label>
                        </li>
                      ))}
                    </ul>
                    <h5 className='w-100 text-dark'>Filter by brands</h5>
                    <ul className='categs'>
                      {props.brands.map((brand, index)=>(
                        <li key={index}>
                          <input onChange={filterByBrand} id={brand.name} type='checkbox' name={brand.name} />
                          <label className='mx-1' htmlFor={brand.name}>{brand.name}</label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className='  col-12 col-sm-9 col-md-10 col-l-10 col-xl-10'>
                  <div className='container bg-light prod border rounded' >
                      {records.map((product)=>(
                          <div
                          className="card "
                          key={product.product_ref}
                          onClick={() => handleShow(product.product_ref)}
                          data-toggle="modal"
                          data-target="#viewproducts"
                        >
                          <img
                            src={
                              product.product_image != null
                                ? `${imagesURL}/` + product.product_image
                                : prodimg
                            }
                            className="card-img-top"
                            alt="product"
                          />
                          <div className="card-body">
                            <div className="line_desc">
                              {/*<span className="detail">Reference:</span>*/}
                              {product.product_name} {product.product_desc}
                            </div>
                            <div className="line_prices ">
                              {/*<span className="detail">Brand:</span>
                              <span className="result"> {product.brand_name} </span>*/}
                              <span className='prices '> {((product.product_price)-(product.product_price)*20/100).toFixed(2)+'DH'}</span>
                            </div>
                            <div className="line_old_price">
                              {/*<span className="detail">Name:</span>
                              <span className="result"> {product.product_name} </span>*/}
                              <span className="old_price"> {" "}{product.product_price}DH{" "} </span>
                            </div>
                           { /*<div className="lines">
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
                            </div>*/}
                            {/*<div className="lines">
                              <span className="detail">Price :</span>
                              <span className="result price"> {" "}{product.product_price}DH{" "} </span>
                            </div>*/}
                          </div>
                          <div className="card-footer text-muted">
                            <button className="btn btn-primary showMore">
                              Show Details
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className='container'>            
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
                        {showAlert && props.updateMsg && ( <div className="alert alert-success" role="alert"> {props.updateMsg} </div> )}
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
                        <div className=" information col-12 col-sm-6 col-md-8 col-lg-8">
                          <div className="  my-1">
                            <span id="detailDescription" className="desc">{" "}</span>
                          </div>
                          <div className=' hr'></div>
                          <div className=" likePrices w-100 my-1">
                            <i onClick={()=>handeleAddToFavories(addToFavories)} className=" mx-2 bi bi-heart-fill" 
                            style={{color : isLiked? 'red' : 'black'}}></i>
                            <div className='prices'>
                              <span className='remise mx-'>-20%</span>
                              <span id="detailOldPrice" className="Oldprice mx-2">{" "}</span>
                              <span id="detailPrice" className="price">{" "}</span>
                            </div>
                          </div>
                          
                          <div className=" my-1">
                            <span  id="detailQuantity" className="quant" style={{color: equivalent.quantity === 0 ? "gray" : "orange" }}>{" "}</span>
                          </div>
                          {equivalent.quantity === 0 ? 
                            <button style={{backgroundColor: "gray" }} disabled ><i className="bi bi-cart-plus-fill mx-2"></i>Add to cart</button> 
                            :<button onClick={()=>HandeleAddToCart(addToCart)} className='bg-danger'><i className=" mx-2 bi bi-cart-plus-fill"></i>Add to cart</button>
                          }
                        </div>
                        <div className=" right col-12 col-sm-6 col-md-4 col-lg-4">
                          <div className="productImage">
                            {" "}
                            <img id='prodImage' src='' alt="product" />{" "}
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
            <Footer/>
        </div>
    )
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
        updateMsg : state.updateMsg,
        userfullName : state.userfullName,
        infavories : state.infavories
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        getProducts : ()=>{
            dispatch(bringProductsThunk())
        },
        getCategories : ()=>{
            dispatch(bringCategoriesThunk())
        },
        getBrands : ()=>{
            dispatch(bringBrandsThunk())
        },
        addToCart : (ref)=>{
          dispatch(addToCartThunk(ref))
        },
        addToFavories : (ref)=>{
          dispatch(addToFavoriesThunk(ref))
        }
    }
    
}
export default connect(mapStateToProps, mapDispatchToProps)(UserInterface);