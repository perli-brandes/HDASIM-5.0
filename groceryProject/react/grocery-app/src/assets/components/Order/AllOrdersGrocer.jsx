import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography } from "@mui/material";
import OrderCard from './OrderCard';
import { getOrders } from '../../features/reducer/orderSlice';
import Sidebar from '../Profile/SideBar';






const OrderList = () => {
  const dispatch = useDispatch();
  let { orders = [], status } = useSelector(state => state.order);
  
  
  
  
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

  

  
  

  return (
   
    <>
    <div><Sidebar/></div>
     
    
      <Grid container spacing={2}>
            {orders.map((order) => (
              <Grid key={order.id} xs={12} sm={6} md={4} lg={3}>
                <OrderCard order={order}  from={"allOrders"} />
              </Grid>
            ))}
          </Grid>


    </>
  );
};

export default OrderList;
