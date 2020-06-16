
import React, { memo } from "react";
import './Tile.css';

export type ScrabbleLetter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | " ";
export type ScrablePoint = 0 |1 | 2 | 3 | 4 | 5 | 8 | 10;

interface TileProps {
    letter: ScrabbleLetter
    selected: boolean
}

const Tile = ({letter, selected}: TileProps) => {
    return <div className={`Tile ${selected ? "Selected" : "UnSelected"}`}>{ letter }</div>
}

export default memo(Tile)
