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
                <h1 className='w-100 text-center my-5'>ABOUT US</h1>
                <div className='row mb-5'>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
                        <div className='vidBox'>
                            <video className='h-100' src= {aboutVid} autoPlay />
                        </div>
                        <div>
                            <h3>Why Choose Us?</h3>
                            <ul>
                                <li>
                                    <strong>Quality Assurance:</strong> 
                                    We handpick each product to ensure it meets 
                                    our stringent quality standards. You can trust that every item 
                                    you purchase from us is built to last.
                                </li>
                                <li>
                                    <strong>Wide Selection:</strong> 
                                    From smartphones to smart home 
                                    devices, drones to gaming gear, we offer an extensive range of 
                                    electronic products to cater to your every need.
                                </li>
                                <li>
                                    <strong>Competitive Prices:</strong>
                                    We believe that technology should be 
                                    accessible to everyone. That's why we strive to offer 
                                    competitive prices without compromising on quality.
                                </li>
                                <li>
                                    <strong>Expert Support:</strong>
                                    Have questions or need assistance? Our 
                                    knowledgeable customer support team is always ready to 
                                    assist you. We're not just here to sell; we're here to help.
                                </li>
                                <li>
                                    <strong>Secure Shopping:</strong>
                                    Your online security is our priority. 
                                    Shop with confidence, knowing that your information is protected.
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className=' col-12 col-sm-12 col-md-6 col-lg-6 px-4'>
                        <div>
                            <h3>About I M System</h3>
                            <p>
                                Welcome to <strong>I M System</strong>, your premier destination for all things
                                electronic! Founded with a passion for cutting-edge technology and 
                                a commitment to delivering top-quality products, we've become your
                                trusted partner in the world of electronics.
                            </p>
                            <h3>Our Story</h3>
                            <p>
                                At <strong>I M System</strong>, our story is rooted in innovation and a deep 
                                appreciation for the impact of electronics on our daily lives. 
                                It all began when a group of tech enthusiasts decided to share 
                                their love for the latest gadgets, gizmos, and gear with the world. 
                                What started as a small idea has now grown into a thriving online store, 
                                bringing you the most exciting electronic products right to your doorstep.
                            </p>
                            <h3>Our Mission</h3>
                            <p>
                                Our mission is simple: to provide you with a curated selection of the 
                                best electronic devices and accessories, coupled with exceptional customer 
                                service. We understand that technology can sometimes be overwhelming, 
                                so we're here to guide you every step of the way. Whether you're a 
                                tech-savvy enthusiast or just dipping your toes into the digital world, 
                                we've got something for everyone.
                            </p>
                            <h3>Join Us on This Journey</h3>
                            <p>
                                We invite you to explore our online store and discover the world 
                                of possibilities that technology has to offer. Whether you're 
                                upgrading your existing setup, seeking the latest innovations, 
                                or looking for the perfect gift, <strong>I M System</strong> is your go-to 
                                destination.
                                <br/>
                                Thank you for choosing us as your trusted source for electronic 
                                wonders. We look forward to serving you and being a part of your 
                                tech adventures.
                                <br/>
                                Sincerely,
                                <br/>
                                The [Your Store Name] Team
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default About;