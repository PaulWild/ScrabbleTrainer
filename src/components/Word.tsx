import Tile, { ScrabbleLetter } from './Tile';
import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    word: {
        
            display: "flex",
            flexDirection: "row",
            marginLeft: "0.6em",
            marginRight: "0.6em",       
    }
}));

  
interface WordProps {
    letters: ScrabbleLetter[],
    highlight: 'none' | 'selected',
    size?: 'Smallest' | 'Small' | 'Medium' | 'Large'
}

const Word = ({letters, highlight, size='Medium' }: WordProps) => {
    const classes = useStyles();

    return (
    <div className={classes.word}>
        {letters.map((l, idx) => 
            <Tile key={idx} letter={l} selected={highlight === 'selected'} size={size}></Tile>
        )}
    </div>)
}

export default Word