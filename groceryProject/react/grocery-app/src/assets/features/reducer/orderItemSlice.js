import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addOrderItemAPI, getOrdersItemAPI } from '../service/orderItemAPI';



export const getOrdersItem = createAsyncThunk(
    'orderItem/getOrdersItem',
    async() => {
        const response = await getOrdersItemAPI();
        return response.data
    }
)    

export const addOrderItem = createAsyncThunk(
    'orderItem/addOrderItem',
    async(newOrderItem) => {
        const response = await addOrderItemAPI(newOrderItem);
        
        return response.data
    }
)    

 






const OrderItemSlice = createSlice({
    name:'orderItem',
initialState:{
    orderItems:[],
    status:'idle',
    error:null,
    selectedOrderItem:null
},
reducers:{},
extraReducers:(builder) =>{builder


 .addCase(getOrdersItem.pending,(state)=> {state.status='loading'})
 .addCase(getOrdersItem.fulfilled,(state,action)=>{state.status='succeeded',state.orderItems=action.payload})
 .addCase(getOrdersItem.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

 


 .addCase(addOrderItem.pending,(state)=>{state.status='loading'})
 .addCase(addOrderItem.fulfilled,(state,action)=>{state.status='succeeded', state.orderItems = [...state.orderItems, action.payload]})
 .addCase(addOrderItem.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

 

}

})

export default OrderItemSlice.reducer