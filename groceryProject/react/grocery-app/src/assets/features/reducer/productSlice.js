import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addProductAPI, getProductsAPI } from '../service/productsAPI';



export const getProducts = createAsyncThunk(
    'product/getProducts',
    async() => {
        const products = await getProductsAPI();
        return products.data
    }
)    

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async(newProduct) => {
        const product = await addProductAPI(newProduct);
        return product.data
    }
)    



const ProductSlice = createSlice({
    name:'product',
initialState:{
    products:[],
    status:'idle',
    error:null,
   
},
reducers:{},
extraReducers:(builder) =>{builder

 
 .addCase(getProducts.pending,(state)=> {state.status='loading'})
 .addCase(getProducts.fulfilled,(state,action)=>{state.status='succeeded',state.products=action.payload})
 .addCase(getProducts.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

 


 
 .addCase(addProduct.pending,(state)=>{state.status='loading'})
 .addCase(addProduct.fulfilled,(state,action)=>{state.status='succeeded',state.products.push(action.payload)})
 .addCase(addProduct.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})


 


}

})

export default ProductSlice.reducer