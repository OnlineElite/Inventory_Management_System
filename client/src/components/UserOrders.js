import React  from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useQuery } from "react-query";
import axios from "axios";
import { connect } from 'react-redux';
import '../styles/UserOrders.css'
import prodimg from '../images/Default.png'

const retrieveOrders = async () => {
    const baseURL = process.env.REACT_APP_API_PROD_URL; 
    const url = `${baseURL}/ordersDetails`;
    const response = await axios.get(url);
    return response.data;
};

function UserOrders (props){
    
    const imagesURL = process.env.REACT_APP_API_IMAGES_URL;
    const {
        data: List,
        error,
        isLoading,
    } = useQuery("OrdersData", retrieveOrders);
    console.log('My Orders')
    console.log(List)
    console.log(props.products)
    if (isLoading) return <div>Fetching orders...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    const handelOrderCreatedDate =(date)=>{
        let year = new Date(date).getFullYear();
        let month = new Date(date).getMonth();
        let day = new Date(date).getDay();
        let hour = new Date(date).getHours();
        let minute = new Date(date).getMinutes();
        return `${day+19}-${month+1}-${year} ${hour+1}:${minute}`
    }

    return ( 
        <div id='UserOrders'>
            <div className='order_row bg-primary text-white'>
                <span className='px-3 py-0 w-25 text-start'>Date</span>
                <span className='px-3 py-0 w-25 text-center'>Payment Method</span>
                <span className='px-3 py-0 w-25 text-center'>Delivery Method</span>
                <span className='px-3 py-0 w-25 text-center'>Total ammont</span>
                <span className='px-3 py-0 w-25 text-center'>Total items</span>
                <span className='w-25 px-3 text-end'>Status</span>
            </div>
            {List.allOrders.map((order) => (
                (order.user_id == props.userfullName[2])?
                    <div className='modalBody' key={order.order_id} id="accordionExample">
                        <div className='order_row' data-bs-toggle="collapse" data-bs-target= {'#'+order.order_id} aria-expanded="false"  aria-controls= {order.order_id}>
                            <span className='px-3 py-0 w-25 text-start'>{handelOrderCreatedDate(order.created_date)}</span>
                            <span className='px-3 py-0 w-25 text-center'>{order.payment_method}</span>
                            <span className='px-3 py-0 w-25 text-center'>{order.delivery_method}</span>
                            <span className='px-3 py-0 w-25 text-center'>{order.total_amount} DH</span>
                            <span className='px-3 py-0 w-25 text-center'>{order.total_item}</span>
                            <span className='w-25 px-3 text-end'>
                                <span className='px-2 py-1 rounded' style={{color: 'white' ,backgroundColor : order.status_color}}>{order.orders_status}</span>
                            </span>
                        </div>
                        <div className="collapse" data-parent="#accordionExample" id={order.order_id}>
                            {order.order_products.map((prod) => (
                                <div className="card card-body " key={prod.product_id}>
                                {props.products.map((prods) => (
                                    prods.product_id === prod.product_id ? (
                                        <div key={prods.product_ref}  className='prodInfo'>
                                            <div className='prodimg'>                                                        
                                                <img src={prods.product_image === null || prods.product_image === undefined || prods.product_image === ''
                                                    ? prodimg
                                                    : `${imagesURL}/${prods.product_image}`} alt='prodimage'/>                                              
                                            </div>
                                            <div className='prodName'>
                                                <p className=' discrip text-black py-0 my-0'> {prods.product_desc} </p>
                                                <p className='text-warning '>Qte : {prod.order_quantity} </p>
                                            </div>
                                        </div>                                    
                                    ) : (
                                    <span key={prods.product_id}></span>
                                    )
                                ))}
                                </div>
                            ))}
                        </div>
                    </div>
                : <div></div>
            ))}
        </div>
    )
}

const mapStateToProps =(state)=>{
    return{
        response : state.error,
        isAuthenticated : state.isAuthenticated,
        isAdmin : state.isAdmin,
        userEmail : state.userEmail,
        products : state.products,
        userfullName : state.userfullName,
        orderProducts : state.orderProducts
    }
} 


export default connect(mapStateToProps) (UserOrders);