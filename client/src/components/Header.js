import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { connect } from 'react-redux';

function Header(props){


    return(
        <div className='Header ' id='Header'>
            <nav className="navbar navbar-expand-lg shadow mb-5 bg-light position-sticky ">
                <span className="navbar-brand d-none d-md-block px-3" href='#/'>Dashboard</span>
                <button className="navbar-brand d-block d-md-none" onClick={props.Toggle}><i className="bi bi-list"   href='#/'></i></button>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item border rounded ">
                            <button className="nav-link border border-black rounded text-black" aria-current='page' href='#/'><i className='bi bi-search'/> Search </button>
                        </li>
                        <li className="nav-item mx-2 border border-black rounded">
                            <button className="nav-link text-black" aria-current='page'  href='#/'><i className="bi bi-person-circle"></i> {props.userfullName[0]} {props.userfullName[1]}{" "} </button>
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
