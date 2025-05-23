import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Box, Grid } from "@mui/material";
import OrderCard from './OrderCard';
import { updateOrder,getOrders } from '../../features/reducer/orderSlice';
import Sidebar from '../Profile/SideBar';







const ProcessgOrders = () => {
  const dispatch = useDispatch();
  let { orders = [], status } = useSelector(state => state.order);
  const [processgOrders, setProcessgOrders] = useState([]);
  
  const [user, setUser] = useState({});


  useEffect(() => {                                                
    if (status === 'idle') {
      
      dispatch(getOrders());
      
    }
  }, [dispatch, status]);


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    
    if (orders.length > 0&&user?.id) {
      
     const   filteredOrders=orders.filter(order => order.status === 'processing'&&user.role==="grocer");
     setProcessgOrders(filteredOrders);
    }
  }, [orders,dispatch,user]);

  const handleApproveOrder = (orderId) => {
   
    
    dispatch(updateOrder({ orderId, orderStatus: "completed" }));
    const updatedOrders = processgOrders.filter((order) => order.id !== orderId);
    setProcessgOrders(updatedOrders);
  };
  

  return (
    <div>
      <Sidebar/>
      <Grid container spacing={2}>
            {processgOrders.map((order) => (
              <Grid key={order.id} xs={12} sm={6} md={4} lg={3}>
                <OrderCard order={order} from={"proceccingGrocer"}  onApprove={() => handleApproveOrder(order.id)} />
              </Grid>
            ))}
          </Grid>
     


    </div>
  );
};

export default ProcessgOrders;
