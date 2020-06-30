import React, { memo } from "react"
import Tile, { ScrabbleLetter } from "./Tile"
import { makeStyles, Theme } from "@material-ui/core"
import { allLetters } from "../App"

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        cursor:  "pointer",
        alignItems: "baseline"
    }
}))

interface LetterPaginationProps {
    onClick: (letter: string) => void
    letter: ScrabbleLetter
    includeSpace?: boolean
}

const LetterPagination = ({onClick, letter, includeSpace = false}: LetterPaginationProps) => {
    const classes = useStyles();

    const letters = includeSpace ? allLetters.concat(["_"]) : allLetters
    const index = letters.indexOf(letter)
    const pre = index - 1 < 0 ? (letters.length-1) : index - 1  
    const post = index + 1 >= letters.length ? 0 : index + 1

    return (<div className={classes.root}>
        <div onClick={() => {onClick(letters[pre])}}><Tile size="Small" letter={letters[pre]} selected= { false } /></div>
        <div onClick={() => {onClick(letter)}}><Tile size="Medium" letter={ letter }selected= { false } /></div>
        <div onClick={() => {onClick(letters[post])}}><Tile size="Small" letter={letters[post]} selected= { false } /></div>
    </div>)
}

export default memo(LetterPagination)