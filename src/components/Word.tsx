import Tile, { ScrabbleLetter } from './Tile';
import React from 'react';
import './Word.css';

interface WordProps {
    letters: ScrabbleLetter[],
    highlight: 'none' | 'selected',
    size?: 'Smallest' | 'Small' | 'Medium' | 'Large'
}

const Word = ({letters, highlight, size='Medium' }: WordProps) => {
    return (
    <div className="Word">
        {letters.map((l, idx) => 
            <Tile key={idx} letter={l} selected={highlight === 'selected'} size={size}></Tile>
        )}
    </div>)
}

export default Word