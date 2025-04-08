import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addOrderAPI, getOrdersAPI, updateOrderAPI } from '../service/orderAPI';


export const getOrders = createAsyncThunk(
    'order/getOrders',
    async() => {
        const response = await getOrdersAPI();
     
        return response
    }
)    

export const addOrder = createAsyncThunk(
    'order/addOrder',
    async(newOrder) => {
        
        const response = await addOrderAPI(newOrder);
     
        return response.data
    }
)    

export const updateOrder = createAsyncThunk(
    'order/updateOrder',
    async(data) => {
        const{orderId,orderStatus}=data
     
        const response = await updateOrderAPI(orderId,orderStatus);

        return response.data
    }
) 





const OrderSlice = createSlice({
    name:'order',
initialState:{
    orders:[],
    status:'idle',
    error:null,
    selectedOrder:null
},
reducers:{
    
 
},
extraReducers:(builder) =>{builder


 .addCase(getOrders.pending,(state)=> {state.status='loading'})
 .addCase(getOrders.fulfilled,(state,action)=>{  state.status='succeeded',state.orders=action.payload})
 .addCase(getOrders.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})




 .addCase(addOrder.pending,(state)=>{state.status='loading'})
 .addCase(addOrder.fulfilled,(state,action)=>{state.status='succeeded',state.orders.push(action.payload)})
 .addCase(addOrder.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

 .addCase(updateOrder.pending,(state)=>{state.status='loading'})
  .addCase(updateOrder.fulfilled,(state,action)=>{state.status='succeeded'; const index=state.orders.findIndex(or=>or.id===action.payload.id)
  if(index!==-1) state.orders[index]=action.payload})
  .addCase(updateOrder.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})


  

}

})


export default OrderSlice.reducer
