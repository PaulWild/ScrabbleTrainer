import Tile, { ScrabbleLetter } from './Tile';
import React, { useState } from 'react';
import './Word.css';

interface WordProps {
    letters: ScrabbleLetter[]
    selectedCallback(selected: boolean, word: string): void
}

const Word = ({letters, selectedCallback}: WordProps) => {

    const [ selected, setSelected ] = useState(false);

    const update = (selected: boolean) => {
        selectedCallback(selected, letters.join(''));
        setSelected(selected);
    }

    return (
    <div className="Word" onClick={ () => update(!selected) }>
        {letters.map((l, idx) => 
            <Tile key={idx} letter={l} selected={selected}></Tile>
        )}
    </div>)
}

export default Word