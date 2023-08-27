import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle.js';

function Header({Toggle}){


    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand d-none d-md-block" href={() => false}>Dashboard</a>
                <a className="navbar-brand d-block d-md-none" onClick={Toggle}><i class="bi bi-list"  href={() => false}></i></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item border rounded ">
                            <a className="nav-link text-white" aria-current='page' href={() => false}><i className='bi bi-search'/> Search </a>
                        </li>
                        <li className="nav-item mx-2 border rounded">
                            <a className="nav-link text-white" aria-current='page' href={() => false}><i class="bi bi-person-circle"></i> Account </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header;