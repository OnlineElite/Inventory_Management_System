import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import loginimg from '../images/Inventory-Management.png'
import '../styles/LogReg.css'
import {loginThunk} from '../actions/IMSAction'
import { useNavigate } from "react-router-dom";

function LoginForm(props){

    const navigate = useNavigate();

    const [info, setInfo] = useState({})
    const [showAlert, setShowAlert] = useState(false);

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
                login.style.backgroundColor = 'rgb(1, 1, 70)';
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
       if (props.response) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } 
    }


    useEffect(()=>{
        if (props.isAuthenticated) {
            navigate(`/dashboard`);
        } 
    })
                        
    return(
        <div className='logincomp'>
            <Navbar/>
            
            <div className="logingContainer">
            {showAlert && ( <div className="alert alert-success" role="alert"> {props.response} </div> )}  
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