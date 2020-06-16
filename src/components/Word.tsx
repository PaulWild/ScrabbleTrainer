import Tile, { ScrabbleLetter } from './Tile';
import React, { useState, useEffect } from 'react';
import './Word.css';

interface WordProps {
    letters: ScrabbleLetter[]
    selectedCallback(selected: boolean, word: string): void
}

const Word = ({letters, selectedCallback}: WordProps) => {

    const [ selected, setSelected ] = useState(false);

    useEffect(() => {
        selectedCallback(selected, letters.join(''))
    }, [])

    return (
    <div className="Word" onClick={ () => setSelected(!selected) }>
        {letters.map((l, idx) => 
            <Tile key={idx} letter={l} selected={selected}></Tile>
        )}
    </div>)
}

export default Word