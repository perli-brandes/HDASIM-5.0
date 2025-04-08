import { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { supplierLogIn } from "../../features/reducer/supplierSlice";
import { grocerLogIn } from "../../features/reducer/grocerSlice";
import { clearError as clearSupplierError } from "../../features/reducer/supplierSlice";
import { clearError as clearGrocerError } from "../../features/reducer/grocerSlice";

const Login = () => {
  const [role, setRole] = useState("supplier"); 
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

const supplier = useSelector((state) => state.supplier);
  const grocer = useSelector((state) => state.grocer);
const status = role === "supplier" ? supplier.status : grocer.status;
 const error = role === "supplier" ? supplier.error : grocer.error;
 const clearError = role === "supplier" ? clearSupplierError : clearGrocerError;
 const [user,setUser]=useState({})

  const handleLogin = (e) => {
    e.preventDefault();
    const credentials = { phone, password };


 if (role === "supplier") {
      dispatch(supplierLogIn(credentials));
    } else {
      dispatch(grocerLogIn(credentials));
    }
  };


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
  if (error) {
    alert(error);
    if (error === "wrong phone" && role === "supplier") {
     
    } else {
      setPassword("");
    }
    dispatch(clearError());
  }

  if (status === "succeeded") {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
     
      if (role === "supplier") {
        navigate("/pendingOrders");
      } else {
        navigate("/processgOrders");
      }
    } else {
      console.log("No user found in localStorage after login");
    }
  }
}, [error, status, dispatch, navigate, role]);



  const handleNavigateToSignUp = () => {
    navigate('/signIn');  
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f4f6f8"
    >
      <Paper elevation={4} sx={{ padding: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" align="center" gutterBottom>
          כניסת משתמש
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="מספר טלפון"
            variant="outlined"
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            dir="rtl"
          />
          <TextField
            fullWidth
            label="סיסמה"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            dir="rtl"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">בחר תפקיד</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              label="בחר תפקיד"
              onChange={(e) => setRole(e.target.value)}
              dir="rtl"
            >
              <MenuItem value="supplier">ספק</MenuItem>
              <MenuItem value="grocer">מנהל (בעל מכולת)</MenuItem>
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "התחבר"
            )}
          </Button>
        </form>

        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            לא רשום?{" "}
            <Button variant="text" onClick={handleNavigateToSignUp}>
              הירשם עכשיו
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;