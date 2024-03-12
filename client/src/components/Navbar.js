import React, {useEffect, useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Collapse} from 'react-collapse';
import loggo from '../images/TechWave.png'
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Navbar.css'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {
  LogOutThunk,
  logout,
} from "../actions/Authentication/authenticationActions";
import {
  deleteFromCartThunk,
  addToCartThunk,
  addToFavoriesThunk,
  deleteFromFavoriesThunk,
  bringInfavoriesThunk,
  bringIncartThunk,
  updateInCartThunk,
  bringOrdersThunk,
} from "../actions/IMSAction";
import prodimg from '../images/Default.png'
//import {useQuery} from '@tanstack/react-query'
//import axios from 'axios'
//import jsPDF from 'jspdf'

function Navbar(props){
    //const baseURL = process.env.REACT_APP_API_PROD_URL;

    /*const {data : incart, isLoading, isError, refetch} = useQuery(['incart'], ()=>{
        const url = `${baseURL}/incart`;
        if(!props.isAdmin && props.isAuthenticated)
        return axios.post(url, {user_id : props.userfullName[2]}).then((res)=> res.data) 
    })*/

    //console.log('incart', incart.products)
    const [totalItem, setTotalItem] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [favRecords, setFavRecords] = useState(props.infavories)
    const [cartRecords, setCartRecords] = useState(props.incart)
    //const [orderrecords, setOrderrecords] = useState(props.orders)
    const [isLiked, setIsLiked] = useState(false);
    //const [isCollapsed, setIsCollapsed] = useState({});
    const imagesURL = process.env.REACT_APP_API_IMAGES_URL;
    const ProjectName = process.env.REACT_APP_API_PROJECT_NAME;

    function handleCloseModal(){    
        document.getElementById("cartModal").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
    }

    /*const handleOrderCollapseToggle = (order_id) => {
        
        setIsCollapsed((prev) => ({
            ...prev,
            [order_id]: !prev[order_id] || false,
        }));
    };*/

    useEffect(()=>{
        if(!props.isAdmin && props.isAuthenticated){
            props.getIncart(props.userfullName[2])
            props.getInfavories(props.userfullName[2])
            //props.getOrders()
            setFavRecords(props.infavories)
            setCartRecords(props.incart)
            //setOrderrecords(props.orders)
        }
    }, [])

    useEffect(()=>{
        if(!props.isAdmin && props.isAuthenticated){
            if (props.infavories !== favRecords) {
                props.getInfavories(props.userfullName[2])
                setFavRecords(props.infavories)
            }
        }
    }, [props.infavories, favRecords, props.getInfavories])

    useEffect(()=>{
        if(!props.isAdmin && props.isAuthenticated){         
            if (props.incart !== cartRecords){
                props.getIncart(props.userfullName[2])
                setCartRecords(props.incart)
            }
        }
    }, [props.incart, cartRecords, props.getIncart])

   /* useEffect(()=>{
        if(!props.isAdmin && props.isAuthenticated){         
            if (props.orders !== orderrecords){
                props.getOrders()
                setOrderrecords(props.orders)
            }
        }
    }, [props.orders, orderrecords, props.getOrders])*/

    const hundellSubmit =(e)=>{
        e.preventDefault()
        let btnType = e.target.dataset.btn;
        let id =e.target.dataset.id
        let count = e.target.parentElement.children[1]
        let currentCounter = e.target.parentElement.children[1].textContent
        switch (btnType) {
            case "increase":
                if (currentCounter >= 100) {
                    count.textContent = currentCounter;
                } else {
                    count.textContent = Number(currentCounter) + 1;
                    props.updateIncart({product_id : id, user_id : props.userfullName[2], newValue :Number(currentCounter) + 1 })
                }
                break;
            case "decrease":
                if (currentCounter <= 1) {
                    count.textContent = 1;
                } else {
                    count.textContent = Number(currentCounter) - 1;
                    props.updateIncart({product_id : id, user_id : props.userfullName[2], newValue : Number(currentCounter) - 1 })
                }
                break;
            default:
            console.log("wrong button");
        }
        HandelTotalItem_TotalAmount();
    }

    /*const handelOrderCreatedDate =(date)=>{
        let year = new Date(date).getFullYear();
        let month = new Date(date).getMonth();
        let day = new Date(date).getDay();
        let hour = new Date(date).getHours();
        let minute = new Date(date).getMinutes();
        return `${day+19}-${month+1}-${year} ${hour+1}:${minute}`
    }*/

    const handleLogout =(e)=>{
        props.fetchlogout(props.userEmail)
        props.logoutset()
    }

    const handledeleteFromCart =(id,e)=>{
        e.preventDefault()
        props.deleteFromCart({product_id : id, user_id : props.userfullName[2] })
        props.deleteMsg? toast.success(`${props.deleteMsg}`) :  console.log('');
        props.response? toast.error(`${props.response}`) :  console.log('');
        props.getIncart(props.userfullName[2])
       //return refetch
    }

    const HandeleAddToCart =(id,e)=>{
        e.preventDefault()
        props.addToCart({product_id : id, user_id : props.userfullName[2] })
        props.updateMsg? toast.success(`${props.updateMsg}`) :  console.log('');
        props.response? toast.error(`${props.response}`) :  console.log('');
        props.getIncart(props.userfullName[2])
        //return refetch
    }

    const handledeleteFromFavories =(id,e)=>{
        e.preventDefault()
        props.deleteFromFavories({product_id : id, user_id : props.userfullName[2] })
        props.deleteMsg? toast.success(`${props.deleteMsg}`) :  console.log('');
        props.response? toast.error(`${props.response}`) :  console.log('');
        props.getInfavories(props.userfullName[2])
        setFavRecords(props.infavories)
        
    }

    const handeleAddToFavories =(id, e)=>{
        props.addToFavories({product_id : id, user_id : props.userfullName[2] })
        props.updateMsg? toast.success(`${props.updateMsg}`) : console.log('');
        props.response? toast.error(`${props.response}`) :  console.log('');
        props.getInfavories(props.userfullName[2])
        e.target.style.color = 'red'
    }
    // handel Total Item & Total Amount
    const HandelTotalItem_TotalAmount=()=>{
        

        if(props.incart){
            var total = 0;
            props.incart.forEach((product)=>{
                const count = document.getElementById(`count-${product.product_ref}`)
                let quantity = props.isAuthenticated? count.textContent: ''
                total = total + Number(quantity) * Number(product.product_price);
            })
            let TotalAmount = (total - (total * 20) / 100).toFixed(2);
            setTotalAmount(TotalAmount)
            setTotalItem(props.incart.length)
        }

    }

    useEffect(()=>{
        HandelTotalItem_TotalAmount()
        props.infavories.forEach((prod)=>{
            let isIn = props.incart.some(item => item.product_ref === prod.product_ref )
            setIsLiked(isIn)
        })
    }, [])

    const handelCheckout =(e)=>{
        e.preventDefault();
        handleCloseModal()
        /*var doc = new jsPDF()
        doc.text(20,20, 'this the default text');
        doc.setFont('courier');
        doc.text(20,30,`The total items is : ${totalItem === null? 0 : totalItem}`);
        doc.text(20,40,`The total Amount is : ${totalAmount === null? 0 : totalAmount}`);
        doc.save('Facture.pdf')*/
    }

    const showSearsh =(e)=>{
        let value = e.target.parentElement.firstChild.value;
        props.navSearch(value)
        e.target.parentElement.firstChild.value  = ''
    }
    
    return(
        <div className='Navbarr ' id='navbar'>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid px-4">
                    <ul className='logo'>
                        <li className=''>
                            <Link className='Link_logo' to= '/'> 
                                <img className='mx-2' src= {loggo} alt='logos'/>
                                <span> {ProjectName} </span>
                            </Link>
                        </li>
                    </ul>
                    <div className='nav_body'>
                        <button className="navbar-toggler bg-white mb-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="offcanvas offcanvas-end " tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                            <div className='offcanvas-body'>
                                <ul className=" navs navbar-nav me-auto mb-2 mb-lg-0">
                                    <li>
                                        <Link className='Link'  to= {props.isAuthenticated ? '/userInterface' : '/'}> Home </Link>
                                    </li>
                                    <li>
                                        <Link className='Link' to='/about' > About </Link> 
                                    </li>
                                    <li>
                                        <Link className='Link' to='/contact' > Contact </Link>
                                    </li>
                                </ul>
                                <form className= {props.display} role="search">
                                    <input className="form-control mx-1 bg-white "  laceholder='Search' type='text' name='HeaderSearsh' aria-label="Search"/>
                                    <i onClick={showSearsh} className='bi bi-search btn btn-outline-light'/>
                                </form>
                            </div>
                        </div>
                        {props.isAuthenticated ? 
                        (<>
                            <ul className='rightInfo '>                            
                                <li className='mx-3'>
                                    <span onClick={HandelTotalItem_TotalAmount} className=' cart d-flex align-items-center text-white ' data-toggle="modal" data-target="#cartModal">
                                        <i className="bi bi-cart-fill text-white mx-1">
                                            <span className="badge badge-danger">{props.incart.length !== 0 && props.isAuthenticated? props.incart.length : 0}</span>
                                        </i> Cart
                                    </span>
                                </li>
                                <li>
                                    <div className='user dropdown-toggle ' role="button" data-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-person-circle"></i>
                                        {props.userfullName[0] } {props.userfullName[1] }
                                    </div>
                                    <div className="dropdown-menu">
                                        <Link className='userLink d-block' >
                                            <i className="bi bi-person-lines-fill text-black mx-2"></i>
                                            <span className="text-black" >Profile</span>
                                        </Link>
                                        <Link className='userLink d-block' >
                                            <i className="bi bi-heart-fill text-black mx-2"></i>
                                            <span className="text-black"  data-toggle="modal" data-target="#FavoriesModal">Favories</span>
                                        </Link>
                                        <Link className='userLink d-block' >
                                            <FontAwesomeIcon className="i mx-2  text-black " icon="fa-solid fa-cubes" />
                                            <span className="text-black"  data-toggle="modal" data-target="#OrdersModal">Orders</span>
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <Link className='userLink' to='/login' >
                                            <i className="bi bi-box-arrow-right mx-2 text-black"></i>
                                            <span className=' text-black' onClick={handleLogout}>Logout</span> 
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </>):
                        (<>
                            <ul className='rightInfo'>
                                <li className='mx-3'>
                                    <span onClick={HandelTotalItem_TotalAmount} className=' cart d-flex align-items-center text-white ' data-toggle="modal" data-target="#cartModal">
                                        <i className="bi bi-cart-fill text-white mx-1">
                                            <span className="badge badge-danger">{props.incart.length !== 0 && props.isAuthenticated? props.incart.length : 0}</span>
                                        </i> Cart
                                    </span>
                                </li>
                                <li className='buttons '>                            
                                    <Link className='' to='/login' >
                                        <button className='rounded-0 border-0 text-white'>Login</button> 
                                    </Link>
                                    <Link className='' to='/register' >
                                        <button className='rounded-0 border-0 text-white'>Register</button>
                                    </Link>
                                </li>
                            </ul>
                        </>)}
                    </div>
                </div>
            </nav>
            {/***********************/}
            {/* cart Modal */}
            <div className="modal fade " id="cartModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title  text-primary m-auto" id="exampleModalLabel">Shopping Cart</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span  aria-hidden="true ">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body " id='cart_modal_body'>
                        <div className='row'>
                            <div className=' prods col-12 col-sm-12 col-md-12 col-lg-8 col-xl-9 my-2'>
                                {cartRecords && props.isAuthenticated?
                                cartRecords.map((product)=>(                                                      
                                    <div key={product.product_ref}>
                                        <div className='product_row product-carts' id="cart-page " data-ref={product.product_ref}>
                                            <div className='prodInfo'>
                                                <div className='prodimg'>
                                                    <div className='imag'> 
                                                        <img src={product.product_image === null || product.product_image === undefined || product.product_image === ''
                                                            ? prodimg
                                                            : `${imagesURL}/${product.product_image}`} alt='prodimage'/>
                                                    </div>
                                                </div>

                                                <div className='prodName'>
                                                    <p className=' descrip text-black d-none d-md-block d-sm-none d-lg-block d-xl-block '> {product.product_desc} </p>
                                                    <p className='text-warning'> {product.product_name} </p>
                                                    <p className= {(product.product_stock !== 0)? 'greenColor' : 'redColor'}> {(product.product_stock !== 0)? 'Available': 'not Available' } </p>
                                                    <div className='imgBotom'>
                                                        <button onClick={(e)=>handledeleteFromCart(product.product_id, e)} className='text-danger px-2 '><i className="text-danger bi bi-trash-fill"></i></button>
                                                        <i onClick={(e)=>handeleAddToFavories(product.product_id, e)} className=" mx-2 bi bi-heart-fill" style={{color : isLiked? 'red' : 'black'}}></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='prodPrice'>
                                                <p className='price'> {((product.product_price)-(product.product_price)*20/100).toFixed(2)+'DH'}</p>
                                                <div><span className='oldPrice'>{product.product_price}DH</span><span className='remise'> -20%</span></div>
                                                <div className='buttns ' id='incDec'>
                                                    <button  type='submit' onClick={hundellSubmit} data-btn = 'increase' data-id = {product.product_id} >+</button>
                                                    <span id={`count-${product.product_ref}`}> {product.incart_quantity} </span>
                                                    <button  type='submit' onClick={hundellSubmit} data-btn = 'decrease' data-id = {product.product_id}>–</button>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className='my-1'/>
                                    </div>
                                ))
                                : <div className='w-100 h-100 d-flex align-items-center justify-content-center'>
                                    <p > There is no records, please 
                                        <Link className='' to='/login' >
                                            <button onClick={handleCloseModal} className='rounded-0 border-0 text-danger bg-white px-1 '>Login</button> 
                                        </Link>
                                    </p>
                                </div>
                            }
                                
                            </div>
                            <div className=' total col-12 col-sm-12 col-md-12 col-lg-4 col-xl-3 my-2'>
                            <div id="checkout" >
                                <div className='ro title '>CART SUMMARY</div>
                                <hr/>
                                <div className='ro'><p id="total-item">Total item :</p><span> {totalItem === null? 0 : totalItem} </span></div>
                                <hr/>
                                <div className='ro'><p id="total-price">Total Amount :</p><span> {totalAmount === null? 0 : totalAmount}DH</span></div>
                                <hr/>
                                <div className='ro '><p id="delievery">Free Delievery abouve</p><span id='delev' >100DH</span></div>
                                <hr/>
                                {cartRecords.length !== 0 ?
                                    <button className="cart-btn bg-danger" onClick={(e)=> handelCheckout(e)} >
                                        <Link className='Link text-decoration-none text-white' to='/checkout' >Checkout</Link>
                                    </button> 
                                    :
                                    <button className="cart-btn bg-secondary" disabled >
                                        Checkout
                                    </button> 
                                }
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            {/* favories Modal */}
            <div className="modal fade " id="FavoriesModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title  text-primary m-auto" id="exampleModalLabel">Favories</h3>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span  aria-hidden="true ">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body " id='cart_modal_body'>
                        <div className='rows'>
                            <div className=' prods'>
                                {favRecords?
                                favRecords.map((product)=>(
                                    <div key={product.product_ref} >
                                        <div className='product_row' id="cart-page">
                                            <div className='prodInfo'>
                                                <div className='prodimg h-100 w-25'>
                                                    <div className='imag h-100 w-100'> 
                                                        <img src={product.product_image === null || product.product_image === undefined || product.product_image === ''
                                                            ? prodimg
                                                            : `${imagesURL}/${product.product_image}`} alt='prodimage'/>
                                                    </div>
                                                </div>
                                                <div className='prodName'>
                                                    <p className=' descrip text-black d-none d-md-block d-sm-none d-lg-block d-xl-block'> {product.product_desc} </p>
                                                    <p className='text-warning'> {product.product_name} </p>
                                                    <p className= {(product.product_stock !== 0)? 'greenColor' : 'redColor'}> {(product.product_stock !== 0)? 'Available': 'not Available' } </p>
                                                    {product.product_stock !== 0?
                                                        <button onClick={(e)=>HandeleAddToCart(product.product_id, e)} className='text-white my-1 mx-0 px-1 bg-danger'><i className=" mr-2 bi bi-cart-plus-fill"></i>Add to cart</button>
                                                        :<button  className='text-white my-2 mx-0 px-1' style={{backgroundColor: "gray" }} disabled ><i className=" mx-2 bi bi-cart-plus-fill"></i>Add to cart</button>
                                                    }
                                                </div>
                                            </div>
                                            <div className='prodPrice'>
                                                <p className='price'> {((product.product_price)-(product.product_price)*20/100).toFixed(2)+'DH'}</p>
                                                <div><span className='oldPrice'>{product.product_price}DH</span><span className='remise'> -20%</span></div>
                                                <div className='buttns'>
                                                    <button onClick={(e)=>handledeleteFromFavories(product.product_id, e)} className='text-white bg-danger px-1 mx-0'><i className="text-white bi bi-trash-fill"></i>DELETE</button>
                                                </div>
                                            </div>
                                        </div> 
                                        <hr/>
                                    </div>
                                ))
                                : ''
                            }
                                
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            {/* Orders Modal */}
            <div className="modal fade " id="OrdersModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title  text-primary m-auto" id="exampleModalLabel">My Orders</h3>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span  aria-hidden="true ">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body " id='ordersModalBody' >
                        <div className=''>
                            <div className='orders'>
                            
                            {/*orderrecords?
                                orderrecords.map((order)=>(
                                (order.user_id === props.userfullName[2])?
                                    <div key={order.order_id} >
                                        <div className='order_row' onClick={handleOrderCollapseToggle(order.order_id)}>
                                            <span className='px-3 py-0 w-25 text-start'>{handelOrderCreatedDate(order.created_date)}</span>
                                            <span className='px-3 py-0 w-25 text-center'>Order ID: {order.order_id}</span>
                                            <span className='px-3 py-0 w-25 text-center'>Total: {order.total_amount} DH</span>
                                            <span className='px-3 py-0 w-25 text-center'>Items: {order.total_item}</span>
                                            <span className='w-25 px-3 text-end'>
                                                <span className='px-2 py-1 rounded' style={{color: 'white' ,backgroundColor : order.status_color}}>{order.orders_status}</span>
                                            </span>
                                        </div>
                                        <Collapse isOpened={!isCollapsed[order.order_id]}>
                                            <div>Random content</div>
                                            <div>Random content</div>
                                            <div>Random content</div>
                                            <div>Random content</div>
                                            <div>Random content</div>
                                        </Collapse>
                                    </div> /*: ''*/
                               // ))
                                //: ''
                            }
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
    )
}

const mapStateToProps =(state)=>{
    //console.log('orders', state.orders)
    return{
        response : state.error,
        isAuthenticated : state.isAuthenticated,
        isAdmin : state.isAdmin,
        userEmail : state.userEmail,
        products : state.products,
        deleteMsg : state.deleteMsg,
        updateMsg : state.updateMsg,
        userfullName : state.userfullName,
        incart : state.incart,
        orders : state.orders,
        infavories : state.infavories
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
        },
        getIncart : (user_id)=>{
            dispatch(bringIncartThunk(user_id))
        },
        getInfavories : (user_id)=>{
            dispatch(bringInfavoriesThunk(user_id))
        },
        updateIncart : (info)=>{
            dispatch(updateInCartThunk(info))
        },
        getOrders: ()=>{
            dispatch(bringOrdersThunk())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Navbar);
