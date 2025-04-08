import grocerSlice from "../assets/features/reducer/grocerSlice";

import grocerReducer from "../assets/features/reducer/grocerSlice";
import orderReducer from "../assets/features/reducer/orderSlice";
import supplierReducer from "../assets/features/reducer/supplierSlice";
import orderItemReducer from "../assets/features/reducer/orderItemSlice";
import productReducer from "../assets/features/reducer/productSlice";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer : {
        grocer: grocerReducer,
        order:orderReducer,
        supplier: supplierReducer,
        orderItem:orderItemReducer,
        product:productReducer,
        
               
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
       
     ignoredPaths: ['payload.headers'], 
       
      },
    }),
});
export default store

