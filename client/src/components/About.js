import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import aboutVid from '../images/Online_Electronique_Store.mp4'
import '../styles/About.css'

function About(){


    return(
        <div id='about'>
            <Navbar/>
            <div className='container'>
                <h1>welcome on about page</h1>
                <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
                    <video className='h-100' src= {aboutVid} autoPlay au/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default About;