import React, {useState} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import '../styles/Contact.css'
import { connect } from 'react-redux'
import {contactMessageThunk} from '../actions/General/generalActions'
import { ToastContainer, toast } from 'react-toastify';
function Contact(props){
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        userPhoneNumber: '',
        userMessage: '',
    });

    const [errors, setErrors] = useState(false);

    const handleinputsChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value,});
    };
    
    const validatePhoneNumber = (value) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(value);
    };
    
    const handleSend = (e) => {
        e.preventDefault();
        const phoneNumberIsValid = validatePhoneNumber(formData.userPhoneNumber);
        if (!phoneNumberIsValid) {
            setErrors(true);
            document.getElementById('userPhoneNumber').style.border = '2px solid red'
            errors? toast.error('Please enter a valid phone number.') :  console.log('');
            return 
        }
        document.getElementById('userPhoneNumber').style.border = 'none'
        setErrors(false);
        props.sendMessage(formData)
        props.addMsg? toast.success(`${props.addMsg}`) :  console.log('');
        setFormData({ userName: '',  userEmail: '', userPhoneNumber: '',userMessage: '' });
    };

    return(
        <div id='contact' className='bg-light'>
            <Navbar display = "d-none"/>
            <div className='body'>
                
                <div className='container'>
                    <h1 className='w-100 text-center text-black mt-5'>GET IN TOUCH</h1>
                    <div className='row my-5'>
                        
                        <div className=' col-12 col-sm-12 col-md-6 col-lg-6 px-2 my-2'>
                            <div className='contactInfo h-100'>
                                <h5>CONTACT US:</h5>
                                <p className='text-white'>We can't solve your problem if you don't tell us about it!</p>
                                <ul>
                                    <li>+212 639 411 280</li>
                                    <li>jamalboujbari@gmail.com</li>
                                    <li>github.com/OnlineElite</li>
                                    <li>linkedin.com/in/jamal-boujbari</li>
                                    <li>facebook.com/jamal.boujbari</li>
                                </ul>
                                <h5>CONTACT US ON:</h5>
                                <span className='d-flex justify-content-between w-25'>
                                    <a href='https://www.facebook.com/jamal.boujbari' target='_blank'><i className="bi bi-facebook"></i></a>
                                    <a href='https://linkedin.com/in/jamal-boujbari-937121212' target='_blank'><i className="bi bi-linkedin"></i></a>
                                    <a href='https://github.com/OnlineElite' target='_blank'><i className="bi bi-github"></i></a>
                                    <a href='https://t.me/JML_Elite' target='_blank'><i className="bi bi-telegram"></i></a>
                                </span>
                            </div>
                        </div>
                        <div className=' col-12 col-sm-12 col-md-6 col-lg-6 px-2'>
                            <form onSubmit={handleSend} id='contForm'>
                                <input onChange={handleinputsChange} className='px-2 ' type="text" required value={formData.userName} id="userName" name="userName"  placeholder='Full Name *'/>
                                <input onChange={handleinputsChange} className='px-2 ' type='email' required value={formData.userEmail} id='userEmail' name='userEmail' placeholder='Email *'/>
                                <input onChange={handleinputsChange} className='px-2 ' type='text' required value={formData.userPhoneNumber} id='userPhoneNumber' name='userPhoneNumber' placeholder='Phone Number *'/>
                                <textarea onChange={handleinputsChange} className='px-2' required value={formData.userMessage} id="userMessage" name="userMessage" placeholder='Message *'/>
                                <button className='btn btn-primary ' type='submit'>Send</button>
                            </form>
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
            <Footer/>
        </div>
    )
}

const mapStateToProps =(state)=>{
    
    return{
        response : state.error,
        isAuthenticated : state.isAuthenticated,
        isAdmin : state.isAdmin,
        userEmail : state.userEmail,
        addMsg : state.addMsg, 
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        sendMessage : (message)=>{
            dispatch(contactMessageThunk(message))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Contact);

