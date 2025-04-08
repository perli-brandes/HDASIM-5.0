import { useState } from "react";
import { Card, CardContent, Typography, Button, TextField, Box, Alert } from '@mui/material';





const ProductCard = ({ product, onAdd }) => {
  const [quantity, setQuantity] = useState(product.minQuantity || 1);

  const isValid = quantity >= product.minQuantity;

  return (
    <Card sx={{ width: 250, borderRadius: 3, boxShadow: 3, transition: 'transform 0.2s ease-in-out', '&:hover': { transform: 'scale(1.05)' }, mb: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
            {product.productName}
          </Typography>

       
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            מחיר: {product.price} ₪
          </Typography>

          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            מינימום להזמנה: {product.minQuantity}
          </Typography>

        
          <TextField
            type="number"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            variant="outlined"
            size="small"
            sx={{ width: '100%', mb: 2 }}
            inputProps={{ min: 1 }}
          />

         
          {!isValid && (
            <Alert severity="error" sx={{ width: '100%', mb: 2, fontSize: '0.8rem' }}>
              לא ניתן להזמין פחות מ-{product.minQuantity} יחידות
            </Alert>
          )}

         
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => onAdd(product, quantity)}
            disabled={!isValid}
            sx={{
              fontWeight: 'bold',
              backgroundColor: isValid ? '#1976d2' : '#c5cae9',
              '&:hover': { backgroundColor: isValid ? '#1565c0' : '#9fa8da' },
            }}
          >
            הוסף להזמנה
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
