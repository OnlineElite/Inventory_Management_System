import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import {connect } from 'react-redux'
import {useEffect, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {sendOrderThunk} from '../actions/IMSAction'
import axios from 'axios'
import {bringIncartThunk} from '../actions/IMSAction'
import {Link} from 'react-router-dom'
import prodimg from '../images/Default.png'
import '../styles/Checkout.css'


function Checkout(props){

    const ProjectName = process.env.REACT_APP_API_PROJECT_NAME;
    const imagesURL = process.env.REACT_APP_API_IMAGES_URL;
    const [totalItem, setTotalItem] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [showAlertPhone1, setShowAlertPhone1] = useState(false);
    const [showAlertPhone2, setShowAlertPhone2] = useState(false);
    const [contries, setContries] = useState([]);
    const [cities, setCities] = useState([]);
    const [orderProducts, setOrderProducts] = useState([])

    useEffect(()=>{
        if(!props.isAdmin && props.isAuthenticated){            
            axios.get(`https://countriesnow.space/api/v0.1/countries`)
            .then(res => {
                const Contries = res.data.data;
                setContries(Contries);
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }, [ ])

    const bringInCart =()=>{
        if(!props.isAdmin && props.isAuthenticated){         
            props.getIncart(props.userfullName[2])
        }
    }

    useEffect(()=>{
        bringInCart()
        HandelTotalItem_TotalAmount()
    }, [])

    const handelCity =(e)=>{
        let selected_country = e.target.value;
        let filterdCities = contries.filter((item)=>{
            return item.country === selected_country
        })
        setCities(filterdCities[0].cities)
    }

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

    const handeleCancelAddress =(e)=>{
        e.preventDefault()
        const ids = ['fname', 'lname', 'fphone', 'sphone', 'address', 'info', 'country', 'city']
        const inputs = ids.map((id)=> document.getElementById(id))
        inputs.forEach((inp)=> {
            switch(inp.id){
                case 'fname': inp.value = ''; break;
                case 'lname': inp.value = ''; break;
                case 'fphone': inp.value = ''; break;
                case 'sphone': inp.value = ''; break;
                case 'address': inp.value = ''; break;
                case 'info': inp.value = ''; break;
                case 'country': inp.selectedIndex = 0; break;
                case 'city': inp.selectedIndex = 0; break;
                default: inp.value = ''
            }
        })
        const adressCheck = document.getElementById('adressCheck')
            adressCheck.disabled = true;
            adressCheck.checked = false;
    }

    const handeleCancelDelivery =(e)=>{
        e.preventDefault();
        document.getElementById('toAgency').checked = false;
        document.getElementById('toHome').checked = false;
        const deliveryCheck = document.getElementById('deliveryCheck')
        deliveryCheck.disabled = true;
        deliveryCheck.checked = false;
    }

    const handeleCancelPayment =(e)=>{
        e.preventDefault();
        document.getElementById('cash').checked = false;
        document.getElementById('cart').checked = false;
        const paymentCheck = document.getElementById('paymentCheck')
        paymentCheck.disabled = true;
        paymentCheck.checked = false;
    }

    const handeleSaveAddress =(e)=>{
        e.preventDefault()
        const formData1  = new FormData();
        if(isPhoneNumbersValidate()){
            const ids = ['fname', 'lname', 'fphone', 'sphone', 'address', 'info', 'country', 'city']
            const inputs = ids.map((id)=> document.getElementById(id))
            inputs.forEach((inp)=> {
                ((inp.id === 'sphone' || inp.id === 'info') && inp.value === '')? formData1.append(`${inp.name}`, null): formData1.append(`${inp.name}`, inp.value)
            })
        }else{
            console.log('not valid form')
        }
        const requiredIds =['fname', 'lname', 'fphone', 'address', 'country', 'city']
        const requiredInputs = requiredIds.map((id)=> document.getElementById(id))
        let isAnyFieldEmpty = requiredInputs.some((inp)=> inp.value === '')
        if(!isAnyFieldEmpty){
            const adressCheck = document.getElementById('adressCheck')
            const deliv = document.getElementById('deliv')
            adressCheck.disabled = false;
            deliv.disabled = false;
            adressCheck.checked = true;
            document.getElementById("customerAdress").classList.remove('show')
            document.getElementById("customerAdress").classList.add('hide')
            document.getElementById("deliveryDetails").classList.add('show')
        } 
        return formData1;
    }

    const handeleSaveDelivery =(e)=>{
        e.preventDefault()
        let orderProductsList = []
        const formData2  = new FormData();
        const ids = ['toHome', 'toAgency']
        const inputs = ids.map((id)=> document.getElementById(id))
        inputs.forEach((inp)=> {
            if(inp.checked === true){
                (inp.id === 'toHome')? formData2.append(`${inp.name}`, 'Home Delivery') : formData2.append(`${inp.name}`, 'Agency Delivery')
            }
        })

        props.incart.map((product)=>{
            orderProductsList.push({prod_id: product.product_id, prod_ref: product.product_ref })
        } )
        setOrderProducts(orderProductsList)

        let isAnyFieldChecked = inputs.some((inp)=> inp.checked === true)
        if(isAnyFieldChecked){   
            const deliveryCheck = document.getElementById('deliveryCheck')
            const pay = document.getElementById('pay')
            pay.disabled = false;
            deliveryCheck.disabled = false;
            deliveryCheck.checked = true;
            document.getElementById("deliveryDetails").classList.remove('show')
            document.getElementById("deliveryDetails").classList.add('hide')
            document.getElementById("paymentMethod").classList.add('show')
        }
        return formData2;
    }

    const handeleSavePayment =(e)=>{
        e.preventDefault()
        const formData3  = new FormData();
        const ids = ['cash', 'cart']
        const inputs = ids.map((id)=> document.getElementById(id))
        inputs.forEach((inp)=> {
            if(inp.checked === true){
                (inp.id === 'cash')? formData3.append(`${inp.name}`, 'Cash on delivery') : formData3.append(`${inp.name}`, 'Payment by card')
            }
        })
        let isAnyFieldChecked = inputs.some((inp)=> inp.checked === true)
        if(isAnyFieldChecked){
            const paymentCheck = document.getElementById('paymentCheck')
            paymentCheck.disabled = false;
            paymentCheck.checked = true;
            document.getElementById("paymentMethod").classList.remove('show')
            document.getElementById("paymentMethod").classList.add('hide')
            const send = document.getElementById('send')
            send.classList.add('bg-danger')
        }
        //send.disabled = false;
        return formData3;
    }

    function isPhoneNumbersValidate(){
        var result1, result2, finalResult;
        const phonsids = [ 'fphone', 'sphone']
        const phoneinputs = phonsids.map((id)=> document.getElementById(id))
        phoneinputs.forEach((inp)=> {
            if(inp.id === 'fphone' && inp.value !== ''){
                (validatePhoneNumber(inp.value))? setShowAlertPhone1(false) : setShowAlertPhone1(true)
                result1 = validatePhoneNumber(inp.value)
            }
            else if(inp.id === 'sphone' && inp.value !== ''){
                (validatePhoneNumber(inp.value))? setShowAlertPhone2(false) : setShowAlertPhone2(true)
                result2 = validatePhoneNumber(inp.value)
            }
            else{
                result1 = true;
                result2 = true;
            }
        })
        finalResult = result1 && result2;
        return finalResult;
    }

    function validatePhoneNumber(input_str) {
        var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        return re.test(input_str);
    }

    const handeleSendOrder =(e)=>{
        e.preventDefault();
        let formData1 = handeleSaveAddress(e);
        let formData2 = handeleSaveDelivery(e);
        let formData3 = handeleSavePayment(e);
        const allData = new FormData();
        for (var x of formData1.entries()) {
            allData.append(x[0], x[1]);
        }

        for (var y of formData2.entries()) {
            allData.append(y[0], y[1]);
        }

        for (var z of formData3.entries()) {
            allData.append(z[0], z[1]);
        }
        allData.append('Products',JSON.stringify(orderProducts) )
        allData.append('TotalAmount', totalAmount)
        allData.append('user_id', props.userfullName[2])
        allData.append('total_item', totalItem)
        props.sendOrder(allData)
        props.updateMsg? toast.success(`${props.updateMsg}`) :  console.log('');
        props.response? toast.error(`${props.response}`) :  console.log(''); 
        //handeleCancelAddress(e);
        //handeleCancelDelivery(e);
        //handeleCancelPayment(e);
    }

    return(
        <div className='check bg-light ' id='check'>
            <Navbar display = "d-none"/>
            <div className='container bg-light'>
                <div className='row'>
                    <div id='customer_details' className=' form col-12 col-sm-12 col-md-7 col-lg-7 col-xl-8 bg-light'>
                        {/* CUSTOMER ADDRESS */}
                        <button className="collap bg-white text-black mt-2" data-toggle="collapse" data-target="#customerAdress" 
                            aria-expanded="false" aria-controls="customerAdress" id='adresstogle'>
                            <input id='adressCheck' className='mx-1' type='checkbox' disabled/>
                            1. CUSTOMER ADDRESS
                        </button>
                        <div className="collapse show" id="customerAdress">
                            <div className="card card-body bg-white text-black">
                                <h6>ADD A NEW ADDRESS</h6>
                                <form id='address_form'>
                                    <div className='form_row d-flex align-items-center justify-content-between' >
                                        <div className="input-container">
                                            <input type="text" name='fname' id="fname" required/>
                                            <label htmlFor="fname">First Name<span>*</span></label>
                                        </div>
                                        <div className="input-container ">
                                            <input type="text" name='lname' id="lname" required/>
                                            <label htmlFor="lname">Last Name<span>*</span></label>
                                        </div> 
                                    </div>
                                    <div className='form_row d-flex align-items-center justify-content-between' >
                                        <div className="input-container">
                                            <input type="text" name='fphone' id="fphone" required/>
                                            <label htmlFor="fphone">Mobile phone<span>*</span></label>
                                            {showAlertPhone1 && <p style={{color:'red'}}>Number phone format is not valide</p>}
                                        </div>
                                        <div className="input-container ">
                                            <input type="text" name='sphone' id="sphone" />
                                            <label htmlFor="sphone">Additional mobile phone</label>
                                            {showAlertPhone2 && <p style={{color:'red'}}>Number phone format is not valide</p>}
                                        </div> 
                                    </div>
                                    <div className='form_row d-flex align-items-center justify-content-between' >
                                        <div className="input-container w-100">
                                            <input className='w-100' name='address' type="text" id="address" required/>
                                            <label htmlFor="address">Address<span>*</span></label>
                                        </div>
                                    </div>
                                    <div className='form_row d-flex align-items-center justify-content-between' >
                                        <div className="input-container w-100">
                                            <input className='w-100' name='info' type="text" id="info" />
                                            <label htmlFor="info">Additional Information</label>
                                        </div>
                                    </div> 
                                    <div className='form_row d-flex align-items-center justify-content-between' >
                                        <div  className="input-container selects" >
                                            <select name='country' required id='country' onChange={handelCity}>
                                                <option value='' >select</option>
                                                {contries? 
                                                contries.map((item, index)=>(
                                                    <option key={item.country+'-'+index}>{item.country}</option>
                                                )) : ''}
                                            </select>
                                            <label htmlFor="country">Country<span>*</span></label>
                                        </div>
                                        <div className="input-container selects">
                                            <select name='city' required id='city'>
                                                <option value='' >select</option>
                                                {cities?
                                                cities.map((city)=>(
                                                    <option  key={city}>{city}</option>
                                                )) : ''}
                                            </select>
                                            <label htmlFor="city">City<span>*</span></label>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className='d-flex align-items-center justify-content-end'>
                                        <button onClick={handeleCancelAddress} className='btn bg-secondary'> Cancel</button>
                                        <button type='submit' className='btn mx-1' onClick={handeleSaveAddress}>Save</button> 
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* LDELIVERY DETAILS */}
                        <button id='deliv' className="collap bg-white text-black mt-2" disabled data-toggle="collapse" data-target="#deliveryDetails" 
                            aria-expanded="false" aria-controls="deliveryDetails">
                            <input id='deliveryCheck' className='mx-1' type='checkbox' disabled/>
                            2. LDELIVERY DETAILS
                        </button>
                        <div className="collapse" id="deliveryDetails">
                            <div className="card card-body bg-white text-black">
                                <form className='delevinfos'>
                                    <input type='radio' name='Delivery' id='toAgency' disabled />
                                    <label className='mx-1' htmlFor='toAgency' ><span>Agency Delivery</span> (From 40Dhs)</label>
                                    <p className='text-danger px-3'>This option is not available for the moment.</p>
                                    
                                    <input type='radio' name='Delivery' id='toHome' />
                                    <label className='mx-1' htmlFor='toHome'><span>Home Delivery </span>(from 25Dhs)</label>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <span className='text-secondary px-3'>Order delivered :</span>
                                        <span className='text-secondary'><i className="bi bi-truck text-danger"></i> Dispatched by {ProjectName} </span>
                                    </div>
                                    <div className='border border-secondary rounded my-2 px-2'>
                                        {props.incart.map((product)=>(                          
                                            <div key={product.product_ref}  className='prodInfo'>

                                                <div className='prodimg'>                                                        
                                                    <img src={product.product_image === null || product.product_image === undefined || product.product_image === ''
                                                        ? prodimg
                                                        : `${imagesURL}/${product.product_image}`} alt='prodimage'/>                                              
                                                </div>
                                                <div className='prodName'>
                                                    <p className=' discrip text-black py-0 my-0'> {product.product_desc} </p>
                                                    <p className='text-warning '>Qte : {product.incart_quantity} </p>
                                                </div>
                                            </div>                                                                                    
                                        ))}
                                    </div>
                                    <div className='d-flex align-items-center justify-content-end'>
                                        <button onClick={handeleCancelDelivery} className='btn bg-secondary'> Cancel</button>
                                        <button type='submit' className='btn mx-1' onClick={handeleSaveDelivery}>Save</button> 
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* PAYMENT METHOD */}
                        <button id='pay' className="collap bg-white text-black mt-2" disabled data-toggle="collapse" data-target="#paymentMethod" 
                            aria-expanded="false" aria-controls="paymentMethod">
                            <input id='paymentCheck' className='mx-1' type='checkbox' disabled/>
                            3. PAYMENT METHOD
                        </button>
                        <div className="collapse" id="paymentMethod">
                            <div className="card card-body bg-white text-black">
                                <form>
                                    <div className='cont'>
                                        <p className='title'>Cash on delivery</p>
                                        <input className='mx-1' type='radio' name='payment' id='cash'  />
                                        <label>Cash payment on delivery</label>
                                        <p  className='text-secondary px-3'>
                                            Pay in cash as soon as you receive your order.
                                        </p> 
                                    </div>
                                    <div className='cont'>
                                        <p className='title my-0 '>Payment by card</p>
                                        <p className='text-danger px-3 '>This option is not available for the moment.</p>
                                        <input className='mx-1' type='radio' name='payment' id='cart'  disabled/>
                                        <label>Payment by credit card</label>
                                        <p  className='text-secondary px-3'>Easy, secure and avoids any contact with coins or notes</p>
                                        <div className='border text-secondary border-secondary rounded my-2 p-2'>
                                            You will be redirected to our <span className='text-dark'>{ProjectName}</span> payment platform to 
                                            complete your purchase. Make sure your payment details are
                                            up to date and that you have the necessary funds.
                                            Continue paying for your orders with <span className='text-dark'>{ProjectName}</span>
                                            <Link className='mx-1 text-primary'><span>details</span></Link>
                                        </div>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-end'>
                                        <button onClick={handeleCancelPayment} className='btn bg-secondary'> Cancel</button>
                                        <button type='submit' className='btn mx-1' onClick={handeleSavePayment}>Save</button> 
                                    </div>
                                </form>
                            </div>
                        </div>                           
                    </div>
                    <div className=' total bg-light col-12 col-sm-12 col-md-4 col-lg-4 col-xl-3'>
                        <div id="checkout" >
                            <div className='ro title '>CART SUMMARY</div>
                            <hr/>
                            <div className='ro'><p id="total-item">Total item :</p><span> {totalItem === null? 0 : totalItem} </span></div>
                            <hr/>
                            <div className='ro'><p id="total-price">Total Amount :</p><span> {totalAmount === null? 0 : totalAmount}DH</span></div>
                            <hr/>
                            <div className='ro '><p id="delievery">Free Delievery abouve</p><span id='delev' >100DH</span></div>
                            <button  id='send'  className="cart-btn " onClick={handeleSendOrder} >
                                CONFIRM ORDER
                            </button> 
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
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
        userfullName : state.userfullName,
        isAuthenticated : state.isAuthenticated,
        isAdmin : state.isAdmin,
        incart : state.incart,
        addMsg : state.addMsg,
        response : state.error,
    }

}

const mapDispatchToProps =(dispatch)=>{
    return{
        sendOrder :(order)=>{
            dispatch(sendOrderThunk(order))
        },
        getIncart : (user_id)=>{
            dispatch(bringIncartThunk(user_id))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout)