import React /*,{useState}*/ from 'react'
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { connect } from 'react-redux';
import '../styles/Header.css'
function Header(props){

    //const [toggle, setToggle] = useState(false)
    /*const showSearsh =()=>{
        setToggle(!toggle)
    }*/

    return(
        <div className='Header ' id='Header' >
            <nav className="navbar navbar-expand-lg shadow bg-light position-sticky ">
                <button className="navbar-brand d-block rounded-0 border-0 bg-light p-0 mx-2 " onClick={props.Toggle}><i className="bi bi-list "   href='#/'></i></button>
                <span className="navbar-brand d-none d-md-block px-3" href='#/'>Dashboard</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto ">
                        {/*<li id='searsh' className="nav-item border border-black rounded mx-2">
                            <input className='HeaderSearsh ' placeholder='Search' type='text' name='HeaderSearsh' />
                            <i onClick={showSearsh} className='bi bi-search mx-1'/>
                        </li>*/}
                        <li className="username nav-item mx-3 rounded">
                            <button className="nav-link text-black" aria-current='page'  href='#/'><i className="bi bi-person-circle mx-1"></i> {props.userfullName[0]} {props.userfullName[1]}{" "} </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps =(state)=>{
    return{
        response : state.error,
        isAuthenticated : state.isAuthenticated,
        isAdmin : state.isAdmin,
        products : state.products,
        userfullName : state.userfullName
    }
}

export default connect(mapStateToProps) (Header);
