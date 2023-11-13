import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import loginimg from '../images/Inventory-Management.png'
import '../styles/LogReg.css'
import {loginThunk} from '../actions/IMSAction'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function LoginForm(props){

    const navigate = useNavigate();
    const [info, setInfo] = useState({})

    useEffect(() => {
        const ids = ['email', 'password'];
        const inputs = ids.map(id => document.getElementById(id));
        const login = document.getElementById('login');
        const isAnyInputEmpty = () => {
            return inputs.some(inp => inp.value === ''); // true or false
        };

        const isChanged = (e) => {
            e.preventDefault()
            if (isAnyInputEmpty()) {
                login.disabled = true;
                login.style.backgroundColor = 'lightgray';
                login.style.color = 'grey';
            } else {
                login.disabled = false;
                login.style.backgroundColor = '#00afdb';
                login.style.color = 'white';
                const values = ids.map(id => document.getElementById(id).value);
                setInfo({
                    email : values[0],
                    password : values[1]
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
        const ids = ['email', 'password'];
        const inputs = ids.map(id => document.getElementById(id));
        inputs.forEach((inp) => { inp.value =""})
        props.response? toast.error(`${props.response}`) :  console.log(''); 
    }
    useEffect(()=>{
        if (props.isAuthenticated) {
            navigate(`/dashboard`);
        } 
    })                   
    return(
        <div className='logincomp'>
            <Navbar display = "d-none"/>
            <div className='logReg'>
                <div className="logingContainer">
                    <div className="row">
                        <h1>Login</h1>
                        <div className=" image col-12 col-md-6 col-sm-6 col-lg-6">
                            <img src={loginimg} alt="login and register"/>
                        </div>
                        <div className=" form col-12 col-md-6 col-sm-6 col-lg-6">
                            <form className="LoginForm" onSubmit={HandelSubmit} >
                                <div className="ro"><label htmlFor="email">Email : </label><input type="email" id="email" name="email"/></div>
                                <div className="ro"><label htmlFor="password">Password : </label><input type="password" id="password" name="password"/></div>
                                <hr/>
                                <button  id="login" type="submit" disabled>Login</button>
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
    )
}

const mapStateToProps =(state)=>{
    
    return{
        response : state.error,
        isAuthenticated : state.isAuthenticated,
        isAdmin : state.isAdmin
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        next : (user)=>{
            dispatch(loginThunk(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (LoginForm);