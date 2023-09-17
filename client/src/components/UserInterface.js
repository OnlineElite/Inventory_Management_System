import React,{useEffect,useState} from 'react'
import Navbar from './Navbar';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import prodimg from '../images/Default.png'
import {connect} from 'react-redux'
import {bringProductsThunk, bringCategoriesThunk, bringBrandsThunk, bringUsersThunk, addToCartThunk, addToFavoriesThunk} from '../actions/IMSAction'

//import prodimg from '../images/Default.png'
import  '../styles/UserInterface.css'

function UserInterface(props){
    const callActions =()=>{
        props.getProducts()
        props.getCategories()
        props.getBrands()
        props.getUsers()
    }
    useEffect(()=>{
      props.getProducts()
      props.getCategories()
      props.getBrands()
      props.getUsers()
    }, [props])
    const [records, setRecords] = useState(props.products)
    const [equivalent, setEquivalent] = useState('')
    const [addToCart, setAddToCart] = useState('')
    const [addToFavories, setAddToFavories] = useState('')
    const [showAlert, setShowAlert] = useState(false);
    const [isLiked, setIsLiked] = useState(false);


    const handleShow=(ref)=>{
        let row = props.products.filter((product)=> product.product_ref === ref)
         setIsLiked(row[0].product_liked)
        setAddToCart(row[0].product_ref)
        setAddToFavories(row[0].product_ref)
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
                          ? `http://localhost:3005/uploads/${row[0].product_image}`
                          : prodimg  
                    break;
                default :
                    sp.textContent = ''
            }
        })
    }

    const HandeleAddToCart =(ref)=>{
      props.addToCart(ref)
      if (props.updateMsg) {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
      }      
    }

    const handeleAddToFavories =(ref)=>{
      props.addToFavories(ref)
      if (props.updateMsg) {
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
      (inputs.some((inp)=> inp.checked))? setRecords(NewData) : setRecords(props.products);
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
      (inputs.some((inp)=> inp.checked))? setRecords(NewData) : setRecords(props.products);
    };
  
    return(
        <div className='userInterface'>
            <Navbar callActions = {callActions()} />
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
                            <i onClick={()=>handeleAddToFavories(addToFavories)} className=" mx-2 bi bi-heart-fill" style={{color : isLiked === true? 'red' : 'black'}}></i>
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
        updateMsg : state.updateMsg
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        getProducts : ()=>{
            dispatch(bringProductsThunk())
        },
        getUsers : ()=>{
            dispatch(bringUsersThunk())
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