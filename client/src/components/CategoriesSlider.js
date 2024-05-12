import React, {useEffect} from "react";
import { bringCategoriesThunk} from '../actions/IMSAction'
import {connect} from 'react-redux'
import '../styles/MiniSlider.css'
function CategoriesSlider(props){

    useEffect(()=>{
        props.getCategories()
    }, [])

    return(
        <div className="miniSlide">
            <div className="first miniSlideTracks boxes">
                {props.categories.map((categ, index)=>(
                    <div className=' box' key={index}>
                        <p className=''>{categ.name}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

const mapStateToProps =(state)=>{
    return{
      categories : state.categories,
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        getCategories : ()=>{
            dispatch(bringCategoriesThunk())
        }
    }  
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesSlider);

