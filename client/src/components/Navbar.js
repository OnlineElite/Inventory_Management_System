import React, {useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/Navbar.css'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {LogOutThunk, logout, deleteFromCartThunk, addToCartThunk,addToFavoriesThunk, deleteFromFavoriesThunk} from '../actions/IMSAction'
import prodimg from '../images/Inventory-Management.png'
function Navbar(props){

    const [showAlert, setShowAlert] = useState(false);

    const handleLogout =(e)=>{
        props.fetchlogout(props.userEmail)
        props.logoutset()
    }

    const handledeleteFromCart =(ref)=>{
        props.deleteFromCart(ref)
        if (props.deleteMsg) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
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

    const handledeleteFromFavories =(ref)=>{
        props.deleteFromFavories(ref)
        if (props.deleteMsg) {
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


    return(
        <div className='Navbarr' id='navbar'>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className='logo'> <Link className='Link_logo' to= '/'> <FontAwesomeIcon className='icon' icon="fa-brands fa-r-project" /> </Link></div>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className='navs'>
                        <li>
                            <Link className='Link'  to= {props.isAuthenticated? '/userInterface' : '/' } > Home </Link>
                        </li>
                        <li>
                            <Link className='Link' to='/' > About </Link> 
                        </li>
                        <li>
                            <Link className='Link' to='/' > Contact </Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0 ">
                        {props.isAuthenticated ? 
                        (
                            <>
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn  my-2 my-sm-0" type="submit">Search</button>
                                <ul className='rightInfo mx-3'>
                                    <li className='mx-3'>
                                        <span className=' cart d-flex align-items-center text-white ' data-toggle="modal" data-target="#cartModal">
                                            <i class="bi bi-cart-fill text-white mx-1"></i> Cart
                                        </span>
                                    </li>
                                    <li>
                                        <div className='user dropdown-toggle ' role="button" data-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-person-circle"></i>
                                            {props.userfullName[0] } {props.userfullName[1] }
                                        </div>
                                        <div class="dropdown-menu">
                                            <Link className='userLink d-block' >
                                                <i class="bi bi-person-lines-fill text-black mx-2"></i>
                                                <span class="text-black" >You profile</span>
                                            </Link>
                                            <Link className='userLink d-block' >
                                                <i class="bi bi-heart-fill text-black mx-2"></i>
                                                <span class="text-black"  data-toggle="modal" data-target="#FavoriesModal">You Favories</span>
                                            </Link>
                                            <div class="dropdown-divider"></div>
                                            <Link className='userLink' to='/login' >
                                                <i className="bi bi-box-arrow-right mx-2 text-black"></i>
                                                <span className=' text-black' onClick={handleLogout}>Logout</span> 
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                                {/* cart Modal */}
                                <div class="modal fade " id="cartModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-xl">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title  text-primary m-auto" id="exampleModalLabel">Shopping Cart</h5>
                                            {showAlert && props.deleteMsg &&( <div className="alert alert-success" role="alert"> {props.deleteMsg} </div> )}
                                            {showAlert && props.updateMsg && ( <div className="alert alert-success" role="alert"> {props.updateMsg} </div> )}
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span  aria-hidden="true ">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body " id='cart_modal_body'>
                                            <div className='row'>
                                                <div className=' prods col-12 col-sm-5 col-md-7 col-lg-7 col-xl-8'>
                                                    {props.products.map((product)=>(
                                                       (product.product_incart === true)? 
                                                        (
                                                            <div>
                                                                <div className='product_row' id="cart-page">
                                                                    <div className='prodInfo'>
                                                                        <div className='prodimg'>
                                                                            <div className='imag'> 
                                                                                <img src={product.product_image != null
                                                                                    ? `http://localhost:3005/uploads/${product.product_image}`
                                                                                    : prodimg} alt='prodimage'/>
                                                                            </div>
                                                                            <div className='imgBotom'>
                                                                                <button onClick={()=>handledeleteFromCart(product.product_ref)} className='text-white bg-danger px-2'><i className="text-white bi bi-trash-fill"></i>DELETE</button>
                                                                                <i onClick={()=>handeleAddToFavories(product.product_ref)} className=" mx-2 bi bi-heart-fill" style={{color : product.product_liked === true? 'red' : 'black'}}></i>
                                                                            </div>
                                                                        </div>
                                                                        <div className='prodName'>
                                                                            <p className=' descrip text-black'> {product.product_desc} </p>
                                                                            <p className='text-warning'> {product.product_name} </p>
                                                                            <p className= {(product.product_stock !== 0)? 'greenColor' : 'redColor'}> {(product.product_stock !== 0)? 'Available': 'not Available' } </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className='prodPrice'>
                                                                        <p className='price'> {((product.product_price)-(product.product_price)*20/100).toFixed(2)+'DH'}</p>
                                                                        <div><span className='oldPrice'>{product.product_price}DH</span><span className='remise'>-20%</span></div>
                                                                        <div className='buttns'>
                                                                            <button className='bg-danger'>+</button>
                                                                            <span>1</span>
                                                                            <button className='bg-danger'>–</button>
                                                                        </div>
                                                                    </div>
                                                                </div> 
                                                                <hr/>
                                                            </div>
                                                        ) : '' 
                                                    ))}
                                                    
                                                </div>
                                                <div className=' total col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3'>
                                                <div id="checkout" >
                                                    <div className='ro title '>CART SUMMARY</div>
                                                    <hr/>
                                                    <div className='ro'><p id="total-item">Total item :</p><span>0</span></div>
                                                    <hr/>
                                                    <div className='ro'><p id="total-price">Total Amount :</p><span>0$</span></div>
                                                    <hr/>
                                                    <div className='ro '><p id="delievery">Free Delievery abouve</p><span id='delev' >40$</span></div>
                                                    <hr/>
                                                    <button class="cart-btn bg-danger">Checkout</button>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                {/* favories Modal */}
                                <div class="modal fade " id="FavoriesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-xl">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h3 class="modal-title  text-primary m-auto" id="exampleModalLabel">Favories</h3>
                                            {showAlert && props.deleteMsg &&( <div className="alert alert-success" role="alert"> {props.deleteMsg} </div> )}
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span  aria-hidden="true ">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body " id='cart_modal_body'>
                                            <div className='rows'>
                                                <div className=' prods'>
                                                    {props.products.map((product)=>(
                                                       (product.product_liked === true)? 
                                                        (
                                                            <div>
                                                                <div className='product_row' id="cart-page">
                                                                    <div className='prodInfo'>
                                                                        <div className='prodimg h-100'>
                                                                            <div className='imag h-100'> 
                                                                                <img src={product.product_image != null
                                                                                    ? `http://localhost:3005/uploads/${product.product_image}`
                                                                                    : prodimg} alt='prodimage'/>
                                                                            </div>
                                                                        </div>
                                                                        <div className='prodName'>
                                                                            <p className=' descrip text-black'> {product.product_desc} </p>
                                                                            <p className='text-warning'> {product.product_name} </p>
                                                                            <p className= {(product.product_stock !== 0)? 'greenColor' : 'redColor'}> {(product.product_stock !== 0)? 'Available': 'not Available' } </p>
                                                                            {product.product_stock !== 0?
                                                                                <button onClick={()=>HandeleAddToCart(product.product_ref)} className='text-white my-2 bg-danger'><i className=" mx-2 bi bi-cart-plus-fill"></i>Add to cart</button>
                                                                                :<button  className='text-white my-2' style={{backgroundColor: "gray" }} disabled ><i className=" mx-2 bi bi-cart-plus-fill"></i>Add to cart</button>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className='prodPrice'>
                                                                        <p className='price'> {((product.product_price)-(product.product_price)*20/100).toFixed(2)+'DH'}</p>
                                                                        <div><span className='oldPrice'>{product.product_price}DH</span><span className='remise'>-20%</span></div>
                                                                        <div className='buttns'>
                                                                            <button onClick={()=>handledeleteFromFavories(product.product_ref)} className='text-white bg-danger'><i className="text-white bi bi-trash-fill"></i>DELETE</button>
                                                                        </div>
                                                                    </div>
                                                                </div> 
                                                                <hr/>
                                                            </div>
                                                        ) : '' 
                                                    ))}
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ):
                        (   <>
                                <ul className='rightInfo'>
                                    <div className='buttons '>                            
                                        <Link className='Link' to='/login' >
                                            <button className='btn btn-primary'>Login</button> 
                                        </Link>
                                        <Link className='Link' to='/register' >
                                            <button className='btn btn-primary'>Register</button>
                                        </Link>
                                    </div>
                                </ul>
                            </>
                        )}
                    </form>
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps =(state)=>{
    console.log('navbar' ,state.products)
    return{
        response : state.error,
        isAuthenticated : state.isAuthenticated,
        isAdmin : state.isAdmin,
        userEmail : state.userEmail,
        products : state.products,
        deleteMsg : state.deleteMsg,
        updateMsg : state.updateMsg,
        userfullName : state.userfullName
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        fetchlogout : (user)=>{
            dispatch(LogOutThunk(user))
        },
        logoutset : ()=>{
            dispatch(logout())
        },
        deleteFromCart : (ref)=>{
            dispatch(deleteFromCartThunk(ref))
        },
        addToCart : (ref)=>{
          dispatch(addToCartThunk(ref))
        },
        deleteFromFavories : (ref)=>{
            dispatch(deleteFromFavoriesThunk(ref))
        },
        addToFavories : (ref)=>{
          dispatch(addToFavoriesThunk(ref))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Navbar);