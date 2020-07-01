import React, { useState, useEffect, FunctionComponent } from "react";
import { Drawer, Toolbar, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, createStyles, useMediaQuery,  Collapse, } from "@material-ui/core";
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import { Routes } from "../App";
import { useHistory } from "react-router-dom";
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import { useLocation } from 'react-router-dom';
import { useNavControl } from "../navbar/navbar";
import LetterGrid from "./letterGrid";

const drawerWidth = 280;

const useStyles = makeStyles((theme: Theme) =>
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
    },
    clickable: {
      cursor: "pointer"
    }
  }),
);

export const SideDrawer: FunctionComponent =  ({ children }) => {
  const width = useMediaQuery('(min-width:740px)');
  const [open, toggleOpen] = useNavControl()
  const classes = useStyles(width)
  const [itemOpen, setItemOpen] = useState(false)
  const [itemOpen2, setItemOpen2] = useState(false)
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (open && !width) {
      setItemOpen(false)
      setItemOpen2(false)
    }
  }, [open, width])

  const childNavEvent = (e: React.MouseEvent, acition: () => void) => {
    e.stopPropagation();
    acition();
  }

  const maybeToggleOpen = () => {
    if (location.pathname === "/" || !width){
      toggleOpen();
    }
  }

  return (
  <>
  <Drawer
    className={classes.drawer}
    variant={width && location.pathname !== "/" ? "permanent" : "temporary"}
    anchor={width ? "left" : location.pathname  === "/" && width ? "left" : "top"}
    classes={{ paper: classes.drawerPaper }}
    open={!open}
    onClick={maybeToggleOpen}
  >
    <Toolbar />
    <div className={classes.drawerContainer}>
      <List>
        <ListItem className={classes.clickable} onClick={() => history.push('/')}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
      </List>
      <List>
        <ListItem className={classes.clickable} onClick={() => history.push(Routes.Training)}>
          <ListItemIcon><FitnessCenterIcon /></ListItemIcon>
          <ListItemText primary={"Training"} />
        </ListItem>
      </List>
      <ListItem button onClick={(e) => childNavEvent(e, () => setItemOpen(!itemOpen))}>
        <ListItemText secondary="2-Letter Words" color="textSecondary" />
        {itemOpen ? <ExpandLess className={classes.listFoo} /> : <ExpandMore className={classes.listFoo} />}
      </ListItem>
      <Collapse in={itemOpen} timeout="auto" unmountOnExit>
        <LetterGrid onClick={(l) => () => history.push(Routes.SmallWordsTraining(l, 2))} size="Small" />
      </Collapse>
      <ListItem button onClick={(e) => childNavEvent(e, () => setItemOpen2(!itemOpen2))}>
        <ListItemText secondary="3-Letter Words" color="textSecondary" />
        {itemOpen2 ? <ExpandLess className={classes.listFoo} /> : <ExpandMore className={classes.listFoo} />}
      </ListItem>
      <Collapse in={itemOpen2} timeout="auto" unmountOnExit>
        <LetterGrid onClick={(l) => () => history.push(Routes.SmallWordsTraining(l, 3))} size="Small" />
      </Collapse>
      <ListItem className={classes.clickable} onClick={() => history.push(Routes.StemList)}>
          <ListItemText secondary={"Bingo Stems"}> </ListItemText>
        </ListItem>
      <List>
        <ListItem className={classes.clickable} onClick={() => history.push(Routes.Reference)}>
          <ListItemIcon><ImportContactsIcon /></ListItemIcon>
          <ListItemText primary={"Reference"} />
        </ListItem>
        <ListItem className={classes.clickable} onClick={() => history.push(Routes.WordList)}>
          <ListItemText secondary={"Word Lists"}> </ListItemText>
        </ListItem>
        <ListItem  className={classes.clickable} onClick={() => history.push(Routes.WordCheck)}>
          <ListItemText secondary={"Word Checker"}> </ListItemText>
        </ListItem>
        <ListItem className={classes.clickable} onClick={() => history.push(Routes.Anagram)}>
          <ListItemText secondary={"Anagrams"}> </ListItemText>
        </ListItem>
        <ListItem className={classes.clickable} onClick={() => history.push(Routes.Settings)}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary={"Settings"}/>
        </ListItem>
      </List>
    </div>
  </Drawer>
  {children}
  </>);
}