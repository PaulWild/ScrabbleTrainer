import React from 'react';
import { Toolbar, AppBar, IconButton, Typography,  Theme, Button, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Tile from './Tile';
import { useNavControl } from '../navbar/navbar';
import { useAuth0 } from '@auth0/auth0-react';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    boxShadow: "none",
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    color: theme.palette.common.white,
    fontFamily: "'Caveat', cursive"
  },
  tile: {
    transform: "rotate(8deg)",
    boxShadow: "none",
    alignSelf: "center"
  },
  logo: {
    flexGrow: 1,
    display: "flex"
  },
}));



const Header = () => {
  const classes = useStyles();
  const { loginWithRedirect, isAuthenticated, logout  } = useAuth0();
  const [, toggleOpen] = useNavControl()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const appState = {
    returnTo: window.location.pathname
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    return (<AppBar position="fixed" className={classes.appBar}>
    <Toolbar>
        { <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleOpen}>
                  <MenuIcon  />
        </IconButton> }
        <div className={classes.logo}><Tile letter="S" selected={false} className={classes.tile} /><Typography variant="h4" component="h4" className={classes.title}>crabble Trainer</Typography></div>
        { !isAuthenticated ?
        <Button color="inherit" onClick={() => loginWithRedirect({appState})}>Login</Button>
        :  <div>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => logout()}>Logout</MenuItem>
        </Menu>
      </div>
}
    </Toolbar>
  </AppBar>);
}

export default Header