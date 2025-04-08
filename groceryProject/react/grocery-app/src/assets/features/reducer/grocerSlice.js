import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { grocerLogInAPI } from '../service/grocerAPI';


export const grocerLogIn = createAsyncThunk(
    'grocer/grocerLogIn',
    async (credentials, { rejectWithValue }) => {
        try {
            const response= await grocerLogInAPI(credentials);
        
            return response
        } catch (error) {
            return rejectWithValue(error.message); 
        }
    }
);
   
const GrocerSlice = createSlice({
name:'grocer',
initialState:{
    grocer:[],
    status:'idle',
    error:null,
    selectedSupplier:null,
    token: null,  
    grocerId:null,
    role: null
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
    
   
  


   
   .addCase(grocerLogIn.pending, (state) => {
    state.status = 'loading';
    state.error = null; 
})
.addCase(grocerLogIn.fulfilled, (state, action) => {
   
    state.status = 'succeeded';
 
    state.grocerId = action.payload.id;
    
    localStorage.setItem('user',JSON.stringify({...action.payload, role:"grocer"}) );  
})

.addCase(grocerLogIn.rejected, (state, action) => {
    state.status = 'failed'
    state.error = action.payload; 
})

   
 }
})

export default GrocerSlice.reducer;
export const {clearError}  = GrocerSlice.actions;



