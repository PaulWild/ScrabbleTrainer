import { makeStyles, Backdrop, CircularProgress } from "@material-ui/core";
import React from "react";

interface Props {
    loading: boolean
}

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 100,
        color: '#fff',
    }
}));

const LoadingBackdrop = (props: Props) => {
    const classes = useStyles();

    return(
        <Backdrop className={classes.backdrop} open={props.loading}>
            <CircularProgress color="inherit" />
        </Backdrop>);
}

export default LoadingBackdrop;