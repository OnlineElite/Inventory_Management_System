import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.js';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import registerimg from '../images/Inventory-Management.png'
import { ToastContainer, toast } from 'react-toastify';
import {connect} from 'react-redux'
import {registerThunk} from '../actions/IMSAction'
import '../styles/LogReg.css'

const RegisterForm = (props) => {
  
    const [info, setInfo] = useState({})

    useEffect(() => {
        const ids = ['firstname', 'lastname', 'email', 'username', 'password'];
        const inputs = ids.map(id => document.getElementById(id));
        const register = document.getElementById('register');
        const isAnyInputEmpty = () => {
            return inputs.some(inp => inp.value === ''); // true or false
        };

        const isChanged = (e) => {
            e.preventDefault()
            if (isAnyInputEmpty()) {
                register.disabled = true;
                register.style.backgroundColor = 'lightgray';
                register.style.color = 'grey';
            } else {
                register.disabled = false;
                register.style.backgroundColor = '#00afdb';
                register.style.color = 'white';
                const values = ids.map(id => document.getElementById(id).value);
                setInfo({
                    firstname : values[0],
                    lastname : values[1],
                    email : values[2],
                    username : values[3],
                    password : values[4]
                })
            }
        };
        
        inputs.forEach(inp => {
        inp.addEventListener('input', isChanged);
        });

        return () => {
            inputs.forEach(inp => {
                inp.removeEventListener('input', isChanged);
            });
        };
        
    }, []);

    const HandelSubmit = (e)=>{
        e.preventDefault() 
        props.next(info)
        if(props.response === 'User registered successfully'){
           return toast.success(`${props.response}`)
        }
        else if(props.response === 'Email already exists'){
           return toast.error(`${props.response}`)
        }
        const ids = ['firstname', 'lastname', 'email', 'username', 'password'];
        const inputs = ids.map(id => document.getElementById(id));
        inputs.forEach((inp) =>  inp.value ="")
    }

    return (
        <div className="registercomp">
            <Navbar />
            <div className='logReg'>
                <div className="registerContainer">
                    <div className="row">
                        <h1>Register</h1>
                        <div className=" image col-12 col-md-6 col-sm-6 col-lg-6">
                            <img src={registerimg} alt="login and register"/>
                        </div>
                        <div className=" form col-12 col-md-6 col-sm-6 col-lg-6">
                            <form className="RegisterForm" onSubmit={HandelSubmit}>
                                <div className="ro">
                                    <label htmlFor="firstname">First name : </label>
                                    <input type="text" id="firstname" name="firstname" />
                                </div>
                                <div className="ro">
                                    <label htmlFor="lastname">Last name : </label>
                                    <input type="text" id="lastname" name="lastname" />
                                </div>
                                <div className="ro">
                                    <label htmlFor="email">Email : </label>
                                    <input type="email" id="email" name="email" />
                                </div>
                                <div className="ro">
                                    <label htmlFor="username">Username : </label>
                                    <input type="text" id="username" name="username" />
                                </div>
                                <div className="ro">
                                    <label htmlFor="password">Password : </label>
                                    <input type="password" id="password" name="password" />
                                </div>
                                <hr />
                                <button id="register" disabled type='submit' > Register </button>
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
        </div>
    );
};

const mapStateToProps =(state)=>{
    return{
        response : state.RegisterRespond
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        next : (user)=>{
            dispatch(registerThunk(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (RegisterForm);
