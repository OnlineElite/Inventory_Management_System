import React, {useEffect, useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import loggo from '../images/TechWave.png'
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Navbar.css'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {LogOutThunk, logout, deleteFromCartThunk, addToCartThunk, addToFavoriesThunk,
     deleteFromFavoriesThunk, bringInfavoriesThunk, bringIncartThunk, updateInCartThunk} from '../actions/IMSAction'
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
    const [isLiked, setIsLiked] = useState(false);
    const imagesURL = process.env.REACT_APP_API_IMAGES_URL;
    const ProjectName = process.env.REACT_APP_API_PROJECT_NAME;

    function handleCloseModal(){    
        document.getElementById("cartModal").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
    }

    useEffect(()=>{
        if(!props.isAdmin && props.isAuthenticated){
            props.getIncart(props.userfullName[2])
            props.getInfavories(props.userfullName[2])
            setFavRecords(props.infavories)
            setCartRecords(props.incart) 
        }
    }, [])

    useEffect(()=>{
        if(!props.isAdmin && props.isAuthenticated){
            if (props.infavories !== favRecords) {
                props.getInfavories(props.userfullName[2])
                setFavRecords(props.infavories)
            }
        }
    }, [props.infavories])

    useEffect(()=>{
        if(!props.isAdmin && props.isAuthenticated){         
            if (props.incart !== cartRecords){
                props.getIncart(props.userfullName[2])
                setCartRecords(props.incart)
            }
        }
    }, [props.incart])

    const hundellSubmit =(e)=>{
        e.preventDefault()
        let btnType = e.target.dataset.btn;
        let id =e.target.dataset.id
        let count = e.target.parentElement.children[1]
        let currentCounter = e.target.parentElement.children[1].textContent
        switch (btnType) {
            case "increase":
                if (currentCounter >= 20) {
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
            <nav className="navbar navbar-expand-lg navbar-light d-flex align-items-baseline justify-content-baseline">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className='logo navs'>
                        <li className='navs  d-flex align-items-center justify-content-start'>
                            <Link className='Link_logo' to= '/'> 
                                <img className='mx-2' src= {loggo} alt='logos'/>
                                <span> {ProjectName} </span>
                            </Link>
                        </li>
                    </ul>
                    <ul className='navs'>
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
                    <form className="form-inline px-2 d-flex align-items-baseline justify-content-baseline my-2 my-lg-0 ">
                        
                        <div id='searsh' className="nav-item  rounded mx-2">
                            <input  placeholder='Search' type='text' name='HeaderSearsh' />
                            <i onClick={showSearsh} className='bi bi-search mx-0 my-0 px-2 text-primary d-flex align-items-center justify-content-center h-100 bg-white'/>
                        </div>
                        {props.isAuthenticated ? 
                        (
                            <>
                                <ul className='rightInfo mx-3'>
                                    
                                    <li className='mx-3'>
                                        <span onClick={HandelTotalItem_TotalAmount} className=' cart d-flex align-items-center text-white ' data-toggle="modal" data-target="#cartModal">
                                            <i className="bi bi-cart-fill text-white mx-1"></i> Cart
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
                                                <span className="text-black" >You profile</span>
                                            </Link>
                                            <Link className='userLink d-block' >
                                                <i className="bi bi-heart-fill text-black mx-2"></i>
                                                <span className="text-black"  data-toggle="modal" data-target="#FavoriesModal">You Favories</span>
                                            </Link>
                                            <div className="dropdown-divider"></div>
                                            <Link className='userLink' to='/login' >
                                                <i className="bi bi-box-arrow-right mx-2 text-black"></i>
                                                <span className=' text-black' onClick={handleLogout}>Logout</span> 
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
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
                                                    {cartRecords?
                                                    cartRecords.map((product)=>(                                                      
                                                        <div key={product.product_ref}>
                                                            <div className='product_row product-carts' id="cart-page " data-ref={product.product_ref}>
                                                                <div className='prodInfo'>
                                                                    <div className='prodimg'>
                                                                        <div className='imag'> 
                                                                            <img src={product.product_image != null
                                                                                ? `${imagesURL}/${product.product_image}`
                                                                                : prodimg} alt='prodimage'/>
                                                                        </div>
                                                                        <div className='imgBotom'>
                                                                            <button onClick={(e)=>handledeleteFromCart(product.product_id, e)} className='text-danger px-2'><i className="text-danger bi bi-trash-fill"></i>DELETE</button>
                                                                            <i onClick={(e)=>handeleAddToFavories(product.product_id, e)} className=" mx-2 bi bi-heart-fill" style={{color : isLiked? 'red' : 'black'}}></i>
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
                                                                        <button  type='submit' onClick={hundellSubmit} data-btn = 'increase' data-id = {product.product_id} >+</button>
                                                                        <span id={`count-${product.product_ref}`}> {product.incart_quantity} </span>
                                                                        <button  type='submit' onClick={hundellSubmit} data-btn = 'decrease' data-id = {product.product_id}>–</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr/>
                                                        </div>
                                                    ))
                                                    :''
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
                                                    <button className="cart-btn bg-danger" onClick={(e)=> handelCheckout(e)}>
                                                        <Link className='Link text-decoration-none text-white' to='/checkout' >Checkout</Link>
                                                    </button> 
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
                                                                    <div className='prodimg h-100'>
                                                                        <div className='imag h-100'> 
                                                                            <img src={product.product_image != null
                                                                                ? `${imagesURL}/${product.product_image}`
                                                                                : prodimg} alt='prodimage'/>
                                                                        </div>
                                                                    </div>
                                                                    <div className='prodName'>
                                                                        <p className=' descrip text-black'> {product.product_desc} </p>
                                                                        <p className='text-warning'> {product.product_name} </p>
                                                                        <p className= {(product.product_stock !== 0)? 'greenColor' : 'redColor'}> {(product.product_stock !== 0)? 'Available': 'not Available' } </p>
                                                                        {product.product_stock !== 0?
                                                                            <button onClick={(e)=>HandeleAddToCart(product.product_id, e)} className='text-white my-2 bg-danger'><i className=" mx-2 bi bi-cart-plus-fill"></i>Add to cart</button>
                                                                            :<button  className='text-white my-2' style={{backgroundColor: "gray" }} disabled ><i className=" mx-2 bi bi-cart-plus-fill"></i>Add to cart</button>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className='prodPrice'>
                                                                    <p className='price'> {((product.product_price)-(product.product_price)*20/100).toFixed(2)+'DH'}</p>
                                                                    <div><span className='oldPrice'>{product.product_price}DH</span><span className='remise'>-20%</span></div>
                                                                    <div className='buttns'>
                                                                        <button onClick={(e)=>handledeleteFromFavories(product.product_id, e)} className='text-white bg-danger'><i className="text-white bi bi-trash-fill"></i>DELETE</button>
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
                            </>
                        ):
                        (   <>
                                <ul className='rightInfo'>
                                    <div className='mx-3'>
                                        <span onClick={HandelTotalItem_TotalAmount} className=' cart d-flex align-items-center text-white ' data-toggle="modal" data-target="#cartModal">
                                            <i className="bi bi-cart-fill text-white mx-1"></i> Cart
                                        </span>
                                    </div>
                                    <div className='buttons '>                            
                                        <Link className='' to='/login' >
                                            <button className=' text-white'>Login</button> 
                                        </Link>
                                        <Link className='' to='/register' >
                                            <button className=' text-white'>Register</button>
                                        </Link>
                                    </div>
                                </ul>
                            </>
                        )}
                    </form>
                </div>
            </nav>
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
    console.log('incart', state.incart)
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Navbar);
