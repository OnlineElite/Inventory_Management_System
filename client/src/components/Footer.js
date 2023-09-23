import React from 'react'
import {connect} from 'react-redux'
import '../styles/Footer.css'
function Footer (props){


    return(
        <div id='footer'>
            <div className='row px-5 py-5'>
                <div className='col-12 col-sm-12 col-md-4 col col-lg-4'>
                        <h5>OUR CATEGORIES:</h5>
                        <ul>
                            {props.categories.map((category)=>(
                                <li key={category.name}>{category.name}</li>
                            ))}
                        </ul>
                </div>
                <div className='col-12 col-sm-12 col-md-4 col col-lg-4'>
                        <h5>TOP BRANDS:</h5>
                        <ul>
                            {props.brands.map((brand)=>(
                                <li key={brand.name}>{brand.name}</li>
                            ))}
                        </ul>
                </div>
                <div className='col-12 col-sm-12 col-md-4 col col-lg-4'>
                        <h5>CONTACT US:</h5>
                        <ul>
                            <li>+212 639 411 280</li>
                            <li>jamalboujbari@gmail.com</li>
                            <li>github.com/OnlineElite</li>
                            <li>linkedin.com/in/jamal-boujbari</li>
                            <li>facebook.com/jamal.boujbari</li>
                        </ul>
                        <h5>FOLLOW US ON:</h5>
                        <span className='d-flex justify-content-between w-25'>
                            <a href='https://www.facebook.com/jamal.boujbari'><i className="bi bi-facebook"></i></a>
                            <a href='https://linkedin.com/in/jamal-boujbari-937121212'><i className="bi bi-linkedin"></i></a>
                            <a href='https://github.com/OnlineElite'><i className="bi bi-github"></i></a>
                            <a href='https://t.me/JML_Elite'><i className="bi bi-telegram"></i></a>
                        </span>
                </div>
            </div>
            <div className='rights py-2'>Consumers - User Information Legal Enquiry Guide ©️2023-2024 L.M.System. All rights reserved</div>
        </div>
    )
    
}

const mapStateToProps =(state)=>{
  
    return{
        response : state.error,
        isAuthenticated : state.isAuthenticated,
        isAdmin : state.isAdmin,
        products : state.products,
        categories : state.categories,
        users : state.users,
        brands : state.brands,
        addMsg : state.addMsg,
        deleteMsg : state.deleteMsg,
        updateMsg : state.updateMsg
    }
}

export default connect(mapStateToProps)(Footer);