import React, { useState } from 'react';
import { makeStyles, fade, Drawer, AppBar, CssBaseline, Toolbar, List, Typography, ListItem, ListItemText, ListItemIcon, IconButton, Grid } from '@material-ui/core';
import { Menu, Brightness7, Brightness4, Home, AccountCircle,ExitToApp } from '@material-ui/icons';
import { ThemeContext } from '../../context/useTheme';
import Routes from './Routes';
import clsx from 'clsx'
import { useHistory, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';


const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  logo: { marginRight: theme.spacing(2) },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  toggleIcon: { marginLeft: theme.spacing(3), float:'right' },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflowX: 'none'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  list: {
    paddingLeft: theme.spacing(1)
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const drawerItems = [
  {
    name: 'Upload',
    icon: <Home />
  },
  {
    name: 'Profile',
    icon: <AccountCircle />
  }
]


export default function ClippedDrawer() {

  const classes = useStyles();

  const location = useLocation();
  const history = useHistory();

  const { dark, toggleTheme } = React.useContext(ThemeContext)

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(true);

  const toggleDrawer = () => setOpen(!open);
  const handleLogout = () => {}

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.logo}
            color="inherit"
            onClick={toggleDrawer}
          >
            <Menu />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            Target
          </Typography>
          <IconButton
            onClick={toggleTheme}
            className={classes.toggleIcon}
          >
            {dark ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <IconButton onClick={handleLogout}>
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={
          clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        variant="permanent"
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {
              drawerItems.map((item, index) =>
                <ListItem 
                  key={index} 
                  selected={location.pathname.includes(item.name.split(" ")[0].toLowerCase())}
                  onClick={() => history.push(`/home/${item.name.split(" ")[0].toLowerCase()}`)}
                  button
                >
                  <ListItemIcon className={classes.list}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              )
            }
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Grid container spacing={1} direction="row">
            <Routes />
        </Grid>
      </main>
    </div>
  );
}