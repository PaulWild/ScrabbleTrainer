import { makeStyles, Backdrop, CircularProgress } from "@material-ui/core";
import React from "react";

interface Props {
    loading: boolean,
    child: JSX.Element
}

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

const LoadingBackdrop = ({loading, child}: Props) => {
    const classes = useStyles();

    return(<>
        { 
        loading ? 
        <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
        : child
        }</>);
}

export default LoadingBackdrop;