import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import { useLocation } from 'react-router-dom';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProducts } from "../../features/reducer/productSlice";
import {  addOrderItem} from "../../features/reducer/orderItemSlice";
import { addOrder } from "../../features/reducer/orderSlice";
import { useNavigate } from "react-router-dom";
import {  CardContent, Typography, Button, Box, Divider, List, ListItem, ListItemText, Alert, CircularProgress } from '@mui/material';
import Sidebar from "../Profile/SideBar";

const SupplierProducts = () => {
  
  const [filterProducts, setFilterProducts] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const { products , status } = useSelector(state => state.product)
  

  const location = useLocation();
  const supplierId = location.state?.supplierId;
  const dispatch=useDispatch()
  const now = new Date();
  const localDateTimeString = now.toISOString().slice(0, 19);
  const navigate = useNavigate();

  if (!supplierId) {
    return <p>Supplier ID is missing</p>;}

    useEffect(() => {                                                
        if (status === 'idle') {
          
          dispatch(getProducts());
         
        }
      }, [dispatch, status]);

      

      useEffect(() => {
    
        if (products.length > 0) {
           
         const   filteredP=products.filter(p => p.supplier.id === supplierId);
          setFilterProducts(filteredP);
        }
      }, [products,dispatch,status])

  const handleAddToOrder = (product, quantity) => {
    setOrderItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { product, quantity }];
      }
    });
  };



  const handleSubmitOrder = async () => {
    const newOrder = {
      status: "order",
      orderDate: localDateTimeString,
      supplier: { id: supplierId },
    };
  
    try {
      
      const res = await dispatch(addOrder(newOrder));
      const addedOrder = res.payload;
      
  
    
     
      for (const item of orderItems) {
        const orderItemData = {
          product: { id: item.product.id },
          quantity: item.quantity,
          order: { id: addedOrder.id }
        };
      
        const res=await dispatch(addOrderItem(orderItemData));
    
      
       
      }
    
    
      setOrderItems([]);
      alert("ההזמנות נשלחו בהצלחה!");
     navigate("/processgOrders")
    } catch (error) {
      console.error("שגיאה בשליחת ההזמנה:", error);
      alert("קרתה שגיאה בשליחת ההזמנה. נסה שוב מאוחר יותר.");
    }
  };
  
  

  return (
    <div style={{ display: 'flex', marginLeft:'-23%' }}>
      <Sidebar />
      <Box sx={{  minHeight: '600%', flexGrow: 1 }}>
       
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
          מוצרים של ספק
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {status === 'loading' ? (
            <CircularProgress />
          ) : filterProducts.length > 0 ? (
            filterProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={handleAddToOrder} />
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              אין מוצרים זמינים
            </Typography>
          )}
        </Box>

        {orderItems.length > 0 && (
          <Box sx={{ marginTop: 4, padding: 2, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6">פרטי הזמנה</Typography>
            <Divider sx={{ marginBottom: 2 }} />

            <List>
              {orderItems.map(item => (
                <ListItem key={item.product.id}>
                  <ListItemText
                    primary={`${item.product.productName} - כמות: ${item.quantity}`}
                  />
                </ListItem>
              ))}
            </List>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitOrder}
                sx={{ width: '100%', padding: 1 }}
              >
                שלח הזמנה
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default SupplierProducts;