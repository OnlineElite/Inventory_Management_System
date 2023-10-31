import React from 'react';
import hp from '../images/hpBrand.jpg'
import apple from '../images/Apple.png'
import asus from '../images/asusBrand.jpg'
import canon from '../images/canonBrand.webp'
import huawei from '../images/huaweiBrand.jpg'
import lenovo from '../images/lenovoBrand.jpg'
import lg from '../images/LGBrand.webp'
import nokia from '../images/Nokia.webp'
import oppo from '../images/oppoBrand.webp'
import samsung from '../images/Samsung.jpg'
import '../styles/MiniSlider.css'
function Settings(){

    
    
    return(
        <div className='miniSlide'>
            <div className='first miniSlideTracks'>
                {/* first grope */}
                <div className='slide'>
                    <img src= {lg} alt='slide'/>
                </div>
                <div className='slide'>
                    <img src= {apple} alt='slide'/>
                </div>
                <div className='slide'>
                    <img src= {asus} alt='slide'/>
                </div>
                <div className='slide'>
                    <img src= {samsung} alt='slide'/>
                </div>
                <div className='slide'>
                    <img src= {huawei} alt='slide'/>
                </div>
                <div className='slide'>
                    <img src= {lenovo} alt='slide'/>
                </div>
                <div className='slide'>
                    <img src= {hp} alt='slide'/>
                </div>
                <div className='slide'>
                    <img src= {oppo} alt='slide'/>
                </div>
                <div className='slide'>
                    <img src= {nokia} alt='slide'/>
                </div>
                <div className='slide'>
                    <img src= {canon} alt='slide'/>
                </div>
                 {/* second grope */}
                 <div className='slide'>
                    <img src= {lg} alt='slide'/>
                </div>
                <div className='slide'>
                    <img src= {apple} alt='slide'/>
                </div>
                <div className='slide'>
                    <img src= {asus} alt='slide'/>
                </div>
                <div className='slide'>
                    <img src= {samsung} alt='slide'/>
                </div>
                <div className='slide'>
                    <img src= {huawei} alt='slide'/>
                </div>
                <div className='slide'>
                    <img src= {lenovo} alt='slide'/>
                </div>
                <div className='slide'>
                    <img src= {hp} alt='slide'/>
                </div>
                <div className='slide'>
                    <img src= {oppo} alt='slide'/>
                </div>
                <div className='slide'>
                    <img src= {nokia} alt='slide'/>
                </div>
                <div className='slide'>
                    <img src= {canon} alt='slide'/>
                </div>
            </div>
            
            
        </div>
    )
}

export default Settings;
