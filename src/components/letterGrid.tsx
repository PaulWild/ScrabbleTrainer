import React from "react"
import { Container, makeStyles, Theme } from "@material-ui/core"
import { allLetters } from "../App"
import Tile, { ScrabbleLetter } from "./Tile"

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        cursor:  "pointer"
    }
}))

type Size = "Small" | "Medium"

interface LetterGridProps {
    onClick: (letter: ScrabbleLetter) => () => void
    size?: Size
}

const LetterGrid = ({onClick, size = 'Medium'}: LetterGridProps) => {
    const classes = useStyles()


    return(
    <Container>
      <div className={classes.root}>
        {allLetters.map((l, idx) =>
          <div onClick={onClick(l)} key={idx}><Tile letter={l} selected={false} size= {size} /></div>
        )}
      </div>
    </Container>
  )
}

export default LetterGrid