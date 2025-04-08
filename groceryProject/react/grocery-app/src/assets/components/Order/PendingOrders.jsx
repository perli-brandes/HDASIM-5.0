import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import OrderCard from './OrderCard';
import { updateOrder,getOrders } from '../../features/reducer/orderSlice';
import Sidebar from '../Profile/SideBar';
import { Box, Grid } from "@mui/material";







const PendingOrders = () => {
  const dispatch = useDispatch();
  let { orders = [], status } = useSelector(state => state.order);
  const [pendingOrders, setPendingOrders] = useState([]);
  
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
       
     const   filteredOrders=orders.filter(order => order.status === 'order'&&user.id==order.supplier.id);
      setPendingOrders(filteredOrders);
    }
  }, [orders,dispatch,user]);

  const handleApproveOrder = (orderId) => {
    
    
    dispatch(updateOrder({ orderId, orderStatus: "processing" }));
    const updatedOrders = pendingOrders.filter((order) => order.id !== orderId);
    setPendingOrders(updatedOrders);
  };
  

  return (
    <div>
      {localStorage.getItem("user") && <Sidebar />}
    

<Grid container spacing={2}>
            {pendingOrders.map((order) => (
              <Grid key={order.id} xs={12} sm={6} md={4} lg={3}>
                <OrderCard order={order} from={"pendingSup"}  onApprove={() => handleApproveOrder(order.id)}  />
              </Grid>
            ))}
          </Grid>
     

    </div>
  );
};

export default PendingOrders;
