import React from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import slide10 from '../images/slider10.jpg'
import slide11 from '../images/slider11.jpg'
import slide12 from '../images/slider12.jpg'
import slide13 from '../images/slider13.jpg'
import '../styles/Silder.css'

function Slider(){

    const slideImages = [
        {
            url:` ${slide10}`,
            caption: 'Slide 1'
        },
        {
            url:` ${slide11}`,
            caption: 'Slide 1'
        },
        {
            url: ` ${slide12}`,
            caption: 'Slide 3'
        },
        {
            url: ` ${slide13}`,
            caption: 'Slide 3'
        }
    ];

    return(
        <div id='slider'>
           <div className="slide-container">
                <Slide>
                {slideImages.map((slideImage, index)=> (
                    <div key={index}>
                        <div className='divStyle' >
                           <img src= {slideImage.url} alt='slideImg'/> 
                        </div>
                    </div>
                ))} 
                </Slide>
            </div>
        </div>
    )
}

export default Slider;