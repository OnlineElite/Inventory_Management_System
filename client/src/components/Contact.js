import React, {useState} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import '../styles/Contact.css'
function Contact(){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
    });

    const [errors, setErrors] = useState({
        phoneNumber: '',
    });

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
        const phoneNumberIsValid = validatePhoneNumber(formData.phoneNumber);
    
        if (!phoneNumberIsValid) {
          setErrors({ phoneNumber: 'Please enter a valid phone number.'});
          return;
        }
        console.log(formData);
        setFormData({ name: '',  email: '', phoneNumber: '',message: '' });
        setErrors({ phoneNumber: ''});
    };


    return(
        <div id='contact' className='bg-light'>
            <Navbar/>
            <div className='body'>
                
                <div className='container'>
                    <h1 className='w-100 text-center text-black mt-5'>GET IN TOUCH</h1>
                    <div className='row my-5'>
                        <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
                            <form onSubmit={handleSend} id='contForm'>
                                <input onChange={handleinputsChange} className='px-2 ' type="text" required value={formData.name} id="name" name="name"  placeholder='Full Name *'/>
                                <input onChange={handleinputsChange} className='px-2 ' type='email' required value={formData.email} id='email' name='email' placeholder='Email *'/>
                                <input onChange={handleinputsChange} className='px-2 ' type='text' required value={formData.phoneNumber} id='phoneNumber' name='phoneNumber' placeholder='Phone Number *'/>
                                {errors.phoneNumber && (<p className="error-message">{errors.phoneNumber}</p>)}
                                <textarea onChange={handleinputsChange} className='px-2' required value={formData.message} id="message" name="message" placeholder='Message *'/>
                                <button className='btn btn-primary ' type='submit'>Send</button>
                            </form>
                        </div>
                        <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
                            <div className='contactInfo'>
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
                                    <a href='https://www.facebook.com/jamal.boujbari'><i className="bi bi-facebook"></i></a>
                                    <a href='https://linkedin.com/in/jamal-boujbari-937121212'><i className="bi bi-linkedin"></i></a>
                                    <a href='https://github.com/OnlineElite'><i className="bi bi-github"></i></a>
                                    <a href='https://t.me/JML_Elite'><i className="bi bi-telegram"></i></a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Contact;