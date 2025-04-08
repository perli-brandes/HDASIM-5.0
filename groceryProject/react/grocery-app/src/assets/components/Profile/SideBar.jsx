import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
 import { useNavigate } from "react-router-dom";
 import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Button,
    Box,
    Divider
  } from '@mui/material';
  import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
  import ListAltIcon from '@mui/icons-material/ListAlt';
  import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
  import LogoutIcon from '@mui/icons-material/Logout';
  import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const Sidebar = () => {
  
    const [user, setUser] = useState(null);
   
    const [isLoggedOut, setIsLoggedOut] = useState(false);  
    const navigate = useNavigate();
  
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          if (!isLoggedOut) {
            
            if (window.location.pathname !== '/') {
              navigate('/');
            }
          }
        }
      }, [isLoggedOut, navigate]);
    
      const handleLogOut = () => {
     
        localStorage.removeItem('user');
       
        navigate('/'); 
      };
    
      return (
        <Drawer
          variant="permanent"
          anchor="right"
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              backgroundColor: '#f8f9fa',
              padding: 2,
            },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
              תפריט
            </Typography>
            <Divider />
            <List>
              {user?.role === 'grocer' && (
                <>
                  <ListItem button component={Link} to="/supplierList">
                    <ListItemIcon><LocalGroceryStoreIcon /></ListItemIcon>
                    <ListItemText primary="הזמנה מספקים" />
                  </ListItem>
                  <ListItem button component={Link} to="/processgOrders">
                    <ListItemIcon><AssignmentTurnedInIcon /></ListItemIcon>
                    <ListItemText primary="הזמנות לאישור" />
                  </ListItem>
                  <ListItem button component={Link} to="/orderList">
                    <ListItemIcon><ListAltIcon /></ListItemIcon>
                    <ListItemText primary="כל ההזמנות" />
                  </ListItem>
                </>
              )}
              { user?.role !== 'grocer' && (
                <>
                  <ListItem button component={Link} to="/pendingOrders">
                    <ListItemIcon><AssignmentTurnedInIcon /></ListItemIcon>
                    <ListItemText primary="הזמנות לאישור" />
                  </ListItem>
                  <ListItem button component={Link} to="/supOrderList">
                    <ListItemIcon><ListAltIcon /></ListItemIcon>
                    <ListItemText primary="הזמנות שאושרו" />
                  </ListItem>
                </>
              )}
            </List>
            <Box sx={{ mt: 'auto', textAlign: 'center' }}>
              <Divider sx={{ mb: 1 }} />
              <Button
                variant="outlined"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={handleLogOut}
                fullWidth
              >
                יציאה
              </Button>
            </Box>
          </Box>
        </Drawer>
      );
    };
    
    const Content = () => {
      return (
        <Box sx={{ display: 'flex', flexGrow: 1, padding: 4, marginLeft: '240px' }}>
       
        </Box>
      );
    };
    
    export default Sidebar;