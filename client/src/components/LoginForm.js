import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import '../styles/LogReg.css'
import {loginThunk} from '../actions/IMSAction'

function LoginForm(props){

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
        
    }

    useEffect(() => {
        if (props.response) {
            setShowAlert(true);
            const timeoutId = setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        
            if(props.admission === true){
                console.log('to dashbord page')
                if(props.isAdmin === true){
                    window.location.href = 'http://localhost:3000/dashbord';
                }else{
                    window.location.href = 'http://localhost:3000/userInterface';
                }                 
            }
            else{
                console.log('wrong information')
            }
            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [props.response, props.admission]);

    return(
        <div className='logincomp'>
            <Navbar/>
            {showAlert && ( <div className="alert alert-success" role="alert"> {props.response} {props.useremail} </div> )}
            <div className="logingContainer">
                <form className="LoginForm" onSubmit={HandelSubmit} >
                    <h1>Login :</h1>
                    <div className="ro"><label htmlFor="email">Email : </label><input type="email" id="email" name="email"/></div>
                    <div className="ro"><label htmlFor="password">Password : </label><input type="password" id="password" name="password"/></div>
                    <hr/>
                    <button  id="login" type="submit" disabled>Login</button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps =(state)=>{
    return{
        response : state.LoginRespond,
        admission : state.admission,
        useremail : state.userEmail,
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