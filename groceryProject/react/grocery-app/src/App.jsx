import { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Provider } from 'react-redux'

import store from '../src/appStore/Store'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './assets/components/Profile/LogIn'
import PendingOrders from './assets/components/Order/PendingOrders'
import SignIn from './assets/components/Profile/SignIn'
import SupOrdersList from './assets/components/Order/ConfirmedOrdersSupp'
import OrderCard from './assets/components/Order/OrderCard'
import ProcessgOrders from './assets/components/Order/ProcessOrders'
import OrderList from './assets/components/Order/AllOrdersGrocer'
import SuppliersList from './assets/components/Products/SupplierList'
import SupplierProducts from './assets/components/Products/SupplierProducts'
import ProductCard from './assets/components/Products/ProductCard'
import Sidebar from './assets/components/Profile/SideBar'
import './App.css'

function App() {

  const [user, setUser] = useState({});
  


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
  
    
      
      setUser(JSON.parse(storedUser));
   
    
  }, []);  
  
  
  return (
    <Provider store={store}>
      <Router>
        <div style={{ display: 'flex' }}>
        
          <div style={{ flexGrow: 1, padding: '1rem' }}>
            <Routes>
              

             <Route path="/signIn" element={<SignIn />} />
            <Route path="/" element={<Login />} />
              <Route path="/pendingOrders" element={<PendingOrders />} />
              <Route path="/orderCard" element={<OrderCard />} />
              <Route path="/supOrderList" element={<SupOrdersList />} />
              <Route path="/processgOrders" element={<ProcessgOrders />} />
              <Route path="/orderList" element={<OrderList />} />
              <Route path="/supplierList" element={<SuppliersList />} />
              <Route path="/supplierProducts" element={<SupplierProducts />} />

              <Route path="/productCard" element={<ProductCard />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;