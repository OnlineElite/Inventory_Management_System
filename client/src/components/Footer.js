import React from 'react'
import {connect} from 'react-redux'

function Footer (){


    return(
        <div id='footer'>

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