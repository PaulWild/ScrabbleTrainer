import React from 'react';
import { Toolbar, AppBar, IconButton, Typography,  Theme, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Tile from './Tile';
import "./Header.css"
import { useNavControl } from '../dictionaries/dictionaryProvider';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    boxShadow: "none",
    zIndex: theme.zIndex.drawer + 300,
  },
  title: {
    color: theme.palette.common.white,
    fontFamily: "'Caveat', cursive"
  },
}));



const Header = () => {
  const classes = useStyles();
  const [, toggleOpen] = useNavControl()
  const width = useMediaQuery('(min-width:600px)');

    return (<AppBar position="fixed" className={classes.appBar}>
    <Toolbar>
        { !width && <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleOpen}>
                  <MenuIcon  />
        </IconButton> }
        <Tile letter="S" selected={false} /><Typography variant="h4" component="h4" className={classes.title}>crabble Trainer</Typography> 
    </Toolbar>
  </AppBar>);
}

export default Header