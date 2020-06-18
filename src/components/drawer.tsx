import React, { useState, useEffect } from "react";
import { Drawer, Toolbar, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, createStyles, useMediaQuery, Container, Collapse, } from "@material-ui/core";
import { useNavControl } from "../dictionaries/dictionaryProvider";
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import { allLetters } from "../App";
import Tile from "./Tile";
import { Link } from "react-router-dom";
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const drawerWidth = 280;

const useStyles = makeStyles((theme: Theme ) =>
  createStyles({
    drawer: width => ({
      width: width ? drawerWidth : "100%",
      flexShrink: 0,
    }),
    drawerPaper: width => ({
      width: width ? drawerWidth : "100%",
      background: theme.palette.background.default
    }),
    drawerContainer: {
      overflow: 'auto',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    listFoo: {
      color: theme.palette.text.secondary, 
    }
  }),
);

export default function SideDrawer() {
    const width = useMediaQuery('(min-width:600px)');
    const [open, toggleOpen] = useNavControl()
    const classes = useStyles(width)
    const [itemOpen, setItemOpen] = useState(false)
    const [itemOpen2, setItemOpen2] = useState(false)
    
    useEffect(() => {
      if (!open && !width) {
        setItemOpen(false)
        setItemOpen2(false)
      }
    }, [open, width])

    const childNavEvent = (e: React.MouseEvent, acition: ()=>void) => {
      e.stopPropagation();
      acition();
    }

  return (<Drawer
    className={classes.drawer}
    variant={width ? "permanent" : "temporary"}
    anchor={width ? "left" : "top"}
    classes={{ paper: classes.drawerPaper }}
    open={open}
    onClick= {toggleOpen}
  >
    <Toolbar />
    <div className={classes.drawerContainer}>
    <List>
        <ListItem >
          <ListItemIcon><FitnessCenterIcon /></ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
      </List>
      <List>
        <ListItem >
          <ListItemIcon><FitnessCenterIcon /></ListItemIcon>
          <ListItemText primary={"Training"} />
        </ListItem>
      </List>
      <ListItem button onClick={(e) => childNavEvent(e, () => setItemOpen(!itemOpen))}>
        <ListItemText secondary="2 Letter Words" color="textSecondary" />
        {itemOpen ? <ExpandLess className={classes.listFoo} /> : <ExpandMore className={classes.listFoo} />}
      </ListItem>
      <Collapse in={itemOpen} timeout="auto" unmountOnExit>
        <Container>
          <div className="AllLetters">
            {allLetters.map((l, idx) =>
              <div onClick={() => toggleOpen()} key={idx}><Link to={`/2letterwords/${l}`} ><Tile letter={l} selected={false} size="Small" /></Link></div>
            )}
          </div></Container>
      </Collapse>
      <ListItem button onClick={(e) => childNavEvent(e, () => setItemOpen2(!itemOpen2))}>
        <ListItemText secondary="3 Letter Words" color="textSecondary" />
        {itemOpen2 ? <ExpandLess className={classes.listFoo} /> : <ExpandMore className={classes.listFoo} />}
      </ListItem>
      <Collapse in={itemOpen2} timeout="auto" unmountOnExit>
        <Container>
          <div className="AllLetters">
            {allLetters.map((l, idx) =>
              <div onClick={() => toggleOpen()} key={idx}><Link to={`/3letterwords/${l}`} ><Tile letter={l} selected={false} size="Small" /></Link></div>
            )}
          </div></Container>
      </Collapse>
      <List>
        <ListItem>
          <ListItemIcon><ImportContactsIcon /></ListItemIcon>
          <ListItemText primary={"Reference"} />
        </ListItem>
        <ListItem>
          <ListItemText secondary={"Word Lists"}> </ListItemText>
        </ListItem>
      </List>
    </div>
  </Drawer>);
}