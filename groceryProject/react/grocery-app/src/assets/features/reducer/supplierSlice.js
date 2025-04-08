import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addSupplierAPI, getSuppliersAPI, supplierLogInAPI } from '../service/supplierAPI';


export const getSuppliers = createAsyncThunk(
    'supplier/getSuppliers',
    async() => {
        const response = await getSuppliersAPI();
       
        return response.data
    }
)    

export const addSupplier = createAsyncThunk(
    'supplier/addSupplier',
    async(newSupp) => {
        const response = await addSupplierAPI(newSupp);
        return response.data
    }
)    





export const supplierLogIn = createAsyncThunk(
    'supplier/supplierLogIn',
    async (credentials, { rejectWithValue }) => {
        try {
            const supplier= await supplierLogInAPI(credentials);
            return supplier;
        } catch (error) {
            return rejectWithValue(error.message); 
        }
    }
);


   
const SupplierSlice = createSlice({
name:'supplier',
initialState:{
    suppliers:[],
    status:'idle',
    error:null,
    selectedSupplier:null,
    token: null, 
    supplierId:null,
    role: null,
},
 reducers:{
    clearError: (state) => {
        state.error = null},
        logoutSupplier: (state) => {
            state.user = null;
            state.status = 'idle';
            state.error = null;
            
          },
 },
 extraReducers:(builder) => {builder
    

   .addCase(getSuppliers.pending,(state)=> {state.status='loading'})
   .addCase(getSuppliers.fulfilled,(state,action)=>{state.status='succeeded',state.suppliers=action.payload})
   .addCase(getSuppliers.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})
  
   
 

  
   .addCase(addSupplier.pending,(state)=>{state.status='loading'})
   .addCase(addSupplier.fulfilled,(state,action)=>{state.status='succeeded',state.suppliers.push(action.payload),
   sessionStorage.setItem('token', action.payload.token),localStorage.setItem( 'user' ,JSON.stringify(action.payload));})
   .addCase(addSupplier.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})



   

 
   .addCase(supplierLogIn.pending, (state) => {
    state.status = 'loading';
    state.error = null; 
})
.addCase(supplierLogIn.fulfilled, (state, action) => {
 
    state.status = 'succeeded';
    state.supplierId = action.payload.id;
    state.role="supplier"  
    localStorage.setItem('user',JSON.stringify({...action.payload, role:"supplier"}) );  
})

.addCase(supplierLogIn.rejected, (state, action) => {
    state.status = 'failed'
    state.error = action.payload; 
})

   
 }
})

export default SupplierSlice.reducer;
export const {clearError}  = SupplierSlice.actions;


