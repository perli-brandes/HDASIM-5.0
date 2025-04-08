import { useNavigate } from "react-router-dom";
import { getSuppliers } from "../../features/reducer/supplierSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../Profile/SideBar";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Avatar,
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person'; 

const SuppliersList = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const { suppliers , status } = useSelector(state => state.supplier);

  useEffect(() => {                                                
    if (status === 'idle') {
      
      dispatch(getSuppliers());
    
    }
  }, [dispatch, status]);

  const handleSelectSupplier = (supplierId) => {
    navigate('/supplierProducts', { state: { supplierId } });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '400%', backgroundColor: '#f4f6f8', marginLeft:'-23%' }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, p: 4 }}>
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
          רשימת ספקים
        </Typography>

        <Grid container spacing={4}>
          {suppliers.map((supplier) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={supplier.id}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: 4,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              >
              <CardActionArea onClick={() => handleSelectSupplier(supplier.id)}>
                  <CardContent sx={{ textAlign: 'right', p: 3 }}>
                <Avatar
                      sx={{
                        bgcolor: '#1976d2',
                        width: 84,
                        height: 76,
                        mb: 2,
                        ml: 'auto',
                      }}
                    >
                      <PersonIcon fontSize="medium" />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {supplier.companyName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                {supplier.representativeName} - נציג
                    </Typography>
                  </CardContent>
           </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};


export default SuppliersList;