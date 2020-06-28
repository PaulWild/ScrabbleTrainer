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
    includeBlank?: boolean
}

const LetterGrid = ({onClick, size = 'Medium', includeBlank = false}: LetterGridProps) => {
    const classes = useStyles()

    const letters = includeBlank ? allLetters.concat(['_']) : allLetters
    
    return(
    <Container>
      <div className={classes.root}>
        {letters.map((l, idx) =>
          <div onClick={onClick(l)} key={idx}><Tile letter={l} selected={false} size= {size} /></div>
        )}
      </div>
    </Container>
  )
}

export default LetterGrid