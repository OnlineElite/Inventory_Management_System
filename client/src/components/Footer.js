import React from 'react'
import {connect} from 'react-redux'
import '../styles/Footer.css'
function Footer (props){

    const ProjectName = process.env.REACT_APP_API_PROJECT_NAME;
    return(
        <div id='footer' >
            <div className='row px-5 py-3'>
                <div className='col-12 col-sm-12 col-md-4 col col-lg-4'>
                        <h5>OUR CATEGORIES:</h5>
                        <ul>
                            {props.categories.map((category)=>(
                                <li className='text-white' key={category.name}>{category.name}</li>
                            ))}
                        </ul>
                </div>
                <div className='col-12 col-sm-12 col-md-4 col col-lg-4'>
                        <h5>TOP BRANDS:</h5>
                        <ul>
                            {props.brands.map((brand)=>(
                                <li className='text-white' key={brand.name}>{brand.name}</li>
                            ))}
                        </ul>
                </div>
                <div className='col-12 col-sm-12 col-md-4 col col-lg-4'>
                        <h5>CONTACT US:</h5>
                        <ul>
                            <li className='text-white'>+212 639 411 280</li>
                            <li className='text-white'>jamalboujbari@gmail.com</li>
                            <li className='text-white'>github.com/OnlineElite</li>
                            <li className='text-white'>linkedin.com/in/jamal-boujbari</li>
                            <li className='text-white'>facebook.com/jamal.boujbari</li>
                        </ul>
                        <h5>FOLLOW US ON:</h5>
                        <span className='d-flex justify-content-between w-25'>
                            <a href='https://www.facebook.com/jamal.boujbari' target='_blank'><i className="bi bi-facebook text-white"></i></a>
                            <a href='https://linkedin.com/in/jamal-boujbari-937121212' target='_blank'><i className="bi bi-linkedin text-white"></i></a>
                            <a href='https://github.com/OnlineElite' target='_blank'><i className="bi bi-github text-white"></i></a>
                            <a href='https://t.me/JML_Elite' target='_blank'><i className="bi bi-telegram text-white"></i></a>
                        </span>
                </div>
            </div>
            <div className='rights py-2'>Consumers - User Information Legal Enquiry Guide ©️2023-2024 {ProjectName}. All rights reserved</div>
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
