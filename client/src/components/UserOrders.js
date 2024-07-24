import React  from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useQuery } from "react-query";
import axios from "axios";
import { connect } from 'react-redux';
import '../styles/UserOrders.css'
//import { bringOrderProductsThunk} from '../actions/IMSAction'

const retrieveOrders = async () => {
    const baseURL = process.env.REACT_APP_API_PROD_URL; 
    const url = `${baseURL}/importOrders`;
    const response = await axios.get(url);
    return response.data;
};

function UserOrders (props){

    const {
        data: List,
        error,
        isLoading,
    } = useQuery("OrdersData", retrieveOrders);
    console.log('My Orders')
    console.log(List)
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
            {List.orders.map((order) => (
                (order.user_id == props.userfullName[2])?
                    <div className='modalBody' key={order.order_id} id="accordionExample">
                        <div className='order_row' data-bs-toggle="collapse" data-bs-target= {'#'+order.order_id} aria-expanded="false"  aria-controls= {order.order_id}>
                            <span className='px-3 py-0 w-25 text-start'>{handelOrderCreatedDate(order.created_date)}</span>
                            <span className='px-3 py-0 w-25 text-center'>Order ID: {order.order_id}</span>
                            <span className='px-3 py-0 w-25 text-center'>Total: {order.total_amount} DH</span>
                            <span className='px-3 py-0 w-25 text-center'>Items: {order.total_item}</span>
                            <span className='w-25 px-3 text-end'>
                                <span className='px-2 py-1 rounded' style={{color: 'white' ,backgroundColor : order.status_color}}>{order.orders_status}</span>
                            </span>
                        </div>
                        <div class="collapse" data-parent="#accordionExample" id={order.order_id}>
                            <div class="card card-body">
                                <div>{props.userfullName[2]}</div>
                                <div>{order.user_id}</div>
                                <div>Random content</div>
                                <div>Random content</div>
                                <div>Random content</div>
                            </div>
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

/* const mapDispatchToProps =(dispatch)=>{
    return{
        getOrderProducts: (order_id)=>{
            dispatch(bringOrderProductsThunk(order_id))
        }
    }
}
 */
export default connect(mapStateToProps) (UserOrders);