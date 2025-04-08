


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../features/reducer/orderSlice";
import OrderCard from "./OrderCard";
import Sidebar from "../Profile/SideBar";
import { Box, Grid, Typography } from "@mui/material";



const SupOrdersList = () => {
  const dispatch = useDispatch();
  const { orders, status } = useSelector(state => state.order);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (status === "idle") {
      dispatch(getOrders());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (orders.length > 0 && user?.id) {
      const filtered = orders.filter(
        (order) => order.status !== "order" && order.supplier?.id === user.id
      );
      setFilteredOrders(filtered);
    }
  }, [orders, user]);

  return (
    <Box sx={{ display: "flex", marginLeft:'-23%' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 800, 
            color: '#1976d2', 
           
            marginLeft:'-8%',
            fontFamily: '"Roboto", sans-serif', 
            letterSpacing: 2, 
            borderBottom: '2px solid #1976d2', 
            paddingBottom: 1, 
          }}
        >
          הזמנות שאושרו
        </Typography>

        {filteredOrders.length === 0 ? (
          <Typography>אין הזמנות להצגה</Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredOrders.map((order) => (
              <Grid key={order.id} xs={12} sm={6} md={4} lg={3}>
                <OrderCard order={order} from="confirmSup" />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default SupOrdersList;
