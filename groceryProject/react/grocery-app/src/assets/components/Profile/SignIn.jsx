import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { addSupplier } from "../../features/reducer/supplierSlice";
import { addProduct } from "../../features/reducer/productSlice"
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Paper,
} from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete";






const SignIn = () => {
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("")
  const [representativeName, setRepresentativeName] = useState("");
  const [goods, setGoods] = useState([]); 
  const [newGood, setNewGood] = useState({
    productName: "",
    price: "",
    minQuantity: "",
    
  });
  const dispatch = useDispatch();
  const error = useSelector((state) => state.supplier.error)
  const status = useSelector((state) => state.supplier.status)
  const navigate = useNavigate();

  const handleAddGood = () => {
    if (newGood.productName.trim() !== "" && newGood.price !== "" && newGood.minQuantity !== "") {
     setGoods([...goods, newGood])
      setNewGood({ productName: "", price: "", minQuantity: "" }); 
    }
  };

  const handleRemoveGood = (index) => {
    setGoods(goods.filter((_, i) => i !== index)); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const supplierData = {
      companyName,
      phone,
      representativeName,
      password
    };

   const newSup=await  dispatch(addSupplier(supplierData));
   const supp = newSup.payload;
   

  
    for (const good of goods) {
      const response = await dispatch(addProduct({...good,supplier:{id:supp.id}}))
   
    }
  


    
    setCompanyName("");
    setPhone("");
    setRepresentativeName("");
    setPassword("")
    setGoods([]);
  };


  useEffect(() => {
    if (error) {
      if (error.includes('409')) {
        alert("משתמש זה כבר קיים, מעביר לעמוד ההתחברות.");
        navigate('/');
      } else {
        alert("שגיאה בהוספת ספק: " + error);
      }
    }

    if (status === 'succeeded') {
      
      navigate('/pendingOrders'); 
    }

  }, [,status,error]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" align="center" gutterBottom>
          הרשמת ספק חדש
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="שם חברה"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="מספר טלפון"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="ססמה"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="שם נציג"
            value={representativeName}
            onChange={(e) => setRepresentativeName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>
            הוסף מוצר
          </Typography>
          <TextField
            label="שם מוצר"
            value={newGood.productName}
            onChange={(e) => setNewGood({ ...newGood, productName: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="מחיר (₪)"
            type="number"
            value={newGood.price}
            onChange={(e) => setNewGood({ ...newGood, price: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="כמות מינימלית"
            type="number"
            value={newGood.minQuantity}
            onChange={(e) => setNewGood({ ...newGood, minQuantity: e.target.value })}
            fullWidth
            margin="dense"
          />
          <Button
            variant="outlined"
            onClick={handleAddGood}
            sx={{ mt: 2, mb: 2 }}
            fullWidth
          >
            הוסף מוצר
          </Button>

          <List>
            {goods.map((good, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" color="error" onClick={() => handleRemoveGood(index)}>
                      <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`${good.productName} - ₪${good.price}`}
                  secondary={`כמות מינימלית: ${good.minQuantity}`}
                />
              </ListItem>
            ))}
          </List>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            הרשמה
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignIn;