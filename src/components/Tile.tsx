
import React, { memo } from "react";
import './Tile.css';

export type ScrabbleLetter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "_";
export type ScrablePoint = "" |1 | 2 | 3 | 4 | 5 | 8 | 10;

const lookup = {
    "A": 1, 
    "B": 3,
    "C": 3,
    "D": 2,
    "E": 1,
    "F": 4,
    "G": 2,
    "H" : 4,
    "I" : 1, 
    "J" : 8, 
    "K" : 5, 
    "L" : 1, 
    "M" : 3, 
    "N" : 1, 
    "O" : 1, 
    "P" : 3, 
    "Q" : 10, 
    "R" : 1, 
    "S" : 1, 
    "T" : 1, 
    "U" : 1, 
    "V" : 4, 
    "W" : 4, 
    "X" : 8, 
    "Y" : 4,
    "Z" : 10, 
    "_" : ""
}

interface TileProps {
    letter: ScrabbleLetter
    selected: boolean
    size?: "Smallest" | "Small" | "Medium" | "Large",
    className?: string
}

const Tile = ({letter, selected, size = "Medium", className = ""}: TileProps) => {
    return <div className={`Tile ${selected ? "Selected" : "UnSelected"} ${size} ${className}`}>{ letter === "_" ? " " : letter}<div className="Points">{lookup[letter]}</div> </div>
}

export default memo(Tile)
