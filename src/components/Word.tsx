import Tile, { ScrabbleLetter } from './Tile';
import React from 'react';
import './Word.css';

interface WordProps {
    letters: ScrabbleLetter[]
    highlight: 'none' | 'selected' 
}

const Word = ({letters, highlight }: WordProps) => {
    return (
    <div className="Word">
        {letters.map((l, idx) => 
            <Tile key={idx} letter={l} selected={highlight === 'selected'}></Tile>
        )}
    </div>)
}

export default Word