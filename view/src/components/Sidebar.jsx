import { useState } from 'react';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AddchartIcon from '@mui/icons-material/Addchart';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';import Slider from './Slider';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import { useLocation, useNavigate } from 'react-router-dom';
import { useColumnContext } from '../App';
import AddTask from './addTaskForm';

const drawerWidth = 240;

function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate =useNavigate();
  const location = useLocation();
  const {allColumns,setAllColumns} = useColumnContext();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div >
      <Toolbar />
      <Divider />
      <List>
      <ListItem disablePadding sx={{ backgroundColor: location.pathname === "/" ? '#645fc6' : '', borderRadius: location.pathname === "/" ? "0 50px 50px 0" : "" }}
      onClick={()=>{navigate("/")}}>
            <ListItemButton>
              <ListItemIcon>
              <FactCheckIcon sx={{color:'white'}}/>           
              </ListItemIcon>
              <ListItemText primary="Platform Lunch"/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ backgroundColor: location.pathname === "/marketingplan" ? '#645fc6' : '', borderRadius: location.pathname === "/marketingplan" ? "0 50px 50px 0" : "" }}
          onClick={()=>{navigate("/marketingplan")}}>
            <ListItemButton>
              <ListItemIcon>
              <AddchartIcon sx={{color:'white'}}/>
              </ListItemIcon>
              <ListItemText primary="Marketing Plan" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ backgroundColor: location.pathname === "/roadmap" ? '#645fc6' : '', borderRadius: location.pathname === "/roadmap" ? "0 50px 50px 0" : "" }}
          onClick={()=>{navigate("/roadmap")}}>
            <ListItemButton>
              <ListItemIcon>
              <EditRoadIcon sx={{color:'white'}}/>           
              </ListItemIcon>
              <ListItemText primary="Roadmap" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>

               <AddTask sx={{display:{ xs: 'block', sm: 'none' }}}/>

            </ListItemIcon>
            </ListItemButton>
          </ListItem>

      </List>
      <Divider />
    </div>
  );


  return (
    <Box sx={{ display: 'flex' ,flex: 1 }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor:"#2c2c38"
        }}
      >
        <Toolbar>
          
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            To-Do List
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* This Box with flexGrow pushes the following element to the end */}

            <AddTask/>

        </Toolbar>
        
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,backgroundColor:"#2c2c38",color:"white",borderRight:"1px solid #353541" },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,backgroundColor:"#2c2c38" ,color:"white",borderRight:"1px solid #353541" },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/* <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } ,background:"#23232f"}}
      >


        <Toolbar />


      </Box> */}
    </Box>
  );
}


export default Sidebar;

