import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  registerThunk,
  loginThunk,
} from "../actions/Authentication/authenticationActions";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import registerimg from "../images/Inventory-Management.png";
import "../styles/LogReg.css";

const RegisterForm = (props) => {
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  const [shwoPass, setShwoPass] = useState(false)

  useEffect(() => {
    const ids = ["firstname", "lastname", "email", "username", "password"];
    const inputs = ids.map((id) => document.getElementById(id));
    const register = document.getElementById("register");
    const isAnyInputEmpty = () => inputs.some((inp) => inp.value === "");

    const isChanged = (e) => {
      e.preventDefault();
      if (isAnyInputEmpty()) {
        register.disabled = true;
        register.style.backgroundColor = "lightgray";
        register.style.color = "grey";
      } else {
        register.disabled = false;
        register.style.backgroundColor = "#00afdb";
        register.style.color = "white";
        const values = ids.map((id) => document.getElementById(id).value);
        setInfo({
          firstname: values[0],
          lastname: values[1],
          email: values[2],
          username: values[3],
          password: values[4],
        });
      }
    };

    inputs.forEach((inp) => {
      inp.addEventListener("input", isChanged);
      return () => inp.removeEventListener("input", isChanged);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.next(info);

    const ids = ["firstname", "lastname", "email", "username", "password"];
    ids.forEach((id) => (document.getElementById(id).value = ""));
  };

    useEffect(() => {
        let mounted = true;

        if (props.RegisterRespond && mounted) {
            toast.success(`${props.RegisterRespond}`);
            const user = {
            email: info.email,
            password: info.password,
            };
            props.login(user);
        }

        if (props.RegisterError && mounted) {
            toast.error(`${props.RegisterError}`);
        }

        // Clear toast messages when component unmounts
        return () => {
            mounted = false;
            toast.dismiss();
        };
    }, [props.RegisterRespond, props.RegisterError]);


  useEffect(() => {
    if (props.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [props.isAuthenticated]);

  const showPassword =(e)=>{
    e.preventDefault();
    const parent = document.getElementById("passw")
    const eye = parent.lastChild
    if(!shwoPass){  
        parent.children[1].type = 'text'
        console.log(parent.children[1].type)
        setShwoPass(true)
        eye.className = 'bi bi-eye-slash-fill'
        console.log(eye.className)
    }else{
        parent.children[1].type = 'password'
        console.log(parent.children[1].type)
        setShwoPass(false)
        eye.className = 'bi bi-eye-fill'
        console.log(eye.className)
    }
}

  return (
    <div className="registercomp">
      <Navbar display="d-none" />
      <div className="logReg">
        <div className="registerContainer">
          <div className="row">
            <h1>Register</h1>
            <div className="image col-12 col-md-6 col-sm-6 col-lg-6">
              <img src={registerimg} alt="login and register" />
            </div>
            <div className="form col-12 col-md-6 col-sm-6 col-lg-6">
              <form className="RegisterForm" onSubmit={handleSubmit}>
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
                <div className="ro pass" id='passw'>
                  <label htmlFor="password">Password : </label>
                  <input type="password" id="password" name="password" />
                  <i onClick={showPassword} className="bi bi-eye-fill" id='eye'></i>
                </div>
                <hr />
                <button id="register" disabled type="submit">
                  Register
                </button>
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

const mapStateToProps = (state) => ({
  RegisterError: state.RegisterError,
  RegisterRespond: state.RegisterRespond,
  isAuthenticated: state.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  next: (user) => dispatch(registerThunk(user)),
  login: (user) => dispatch(loginThunk(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);