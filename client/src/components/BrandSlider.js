import React, {useEffect} from "react";
import { bringBrandsThunk} from '../actions/IMSAction'
import {connect} from 'react-redux'
import '../styles/MiniSlider.css'
function BrandSlider(props){

    useEffect(()=>{
        props.getBrands()
    }, [])

    return(
        <div className="miniSlide">
            <div className="first miniSlideTracks boxes">
                {props.brands.map((brand, index)=>(
                    <div className='box' key={index}>
                        <p className=''>{brand.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

const mapStateToProps =(state)=>{
    return{
        brands : state.brands,
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        getBrands : ()=>{
            dispatch(bringBrandsThunk())
        },
    }  
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandSlider);

