import axios from "axios";

export const getOrdersAPI= async() =>{
    const res=await axios.get('http://localhost:8080/api/orders/getOrders')
  

    return res.data

}



export const addOrderAPI= async(order) =>{
    return await axios.post('http://localhost:8080/api/orders/addOrder',order)

    
}

export const updateOrderAPI= async(id,order) =>{
   
    return await axios.put(`http://localhost:8080/api/orders/updateOrder/${id}`,{status:order})
    
}