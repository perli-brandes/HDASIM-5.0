import axios from "axios";

export const getOrdersItemAPI= async() =>{
    return await axios.get('http://localhost:8080/api/orderItem/getOrdersItem')

}



export const addOrderItemAPI= async(item) =>{
    return await axios.post('http://localhost:8080/api/orderItem/addOrderItem',item)

    
}

