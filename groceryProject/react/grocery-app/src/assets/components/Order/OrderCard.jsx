



import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Divider
} from '@mui/material';





const OrderCard = ({ order, from, onApprove }) => {
 
  
 
  return (
    <Card sx={{ minWidth: 275, boxShadow: 3, borderRadius: 3, direction: 'rtl' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          פרטי ההזמנה
        </Typography>

        <Divider sx={{ mb: 1 }} />

        <Stack spacing={1}>
          
          {order.orderItem?.map((item, index) => (
            <Typography key={index} variant="body2">
              {item.product?.productName} - כמות: {item.quantity}
            </Typography>
          ))}

          {from === "proceccingGrocer" && (
            <Typography variant="body2">
              ספק: {order.supplier?.companyName}
            </Typography>
          )}

          <Typography variant="body2">
            סטטוס: {order.status}
          </Typography>

          <Typography variant="body2">
            תאריך: {new Date(order.orderDate).toLocaleString()}
          </Typography>              


          {(from === "pendingSup" || from === "proceccingGrocer") && (
            <Button
              variant="contained"
              color="primary"
              onClick={onApprove}
              sx={{ mt: 1 }}
            >
              אשר הזמנה
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
