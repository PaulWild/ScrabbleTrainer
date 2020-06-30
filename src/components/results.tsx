import React, { memo } from "react"
import { Fade, makeStyles } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"

interface ResultProps {
    showResults: boolean,
    numberCorrectAnswers: number,
    correct: number,
    incorrect: number
}

const useStyles = makeStyles((theme) => ({
    results: {
      marginTop: '1.5em'
    }
  }));

const Results = ({showResults, numberCorrectAnswers, correct, incorrect}: ResultProps) => {
    const classes = useStyles();

    return(<>
    {
        showResults && 
        <div className={classes.results}>
          {(incorrect > 0 || correct < numberCorrectAnswers) &&
            <Fade in={true}>
              <Alert variant="standard" severity="info">
                <AlertTitle><strong>{correct}</strong> out of <strong>{numberCorrectAnswers}</strong> correct word{numberCorrectAnswers === 1 ? "" : "s"}</AlertTitle>            
              </Alert>
            </Fade>
          }
          {incorrect > 0 &&
            <Fade in={true}>
              <Alert variant="standard" severity="error">
                <AlertTitle><strong className={incorrect > 0 ? "Warn" : ""}>{incorrect}</strong> incorrect word{incorrect === 1 ? "" : "s"}</AlertTitle>
              </Alert>
            </Fade>
          }
          {(incorrect === 0 && correct === numberCorrectAnswers) &&
            <Fade in={true}>
              <Alert variant="standard" severity="success">
                <AlertTitle> Correct!</AlertTitle>
                   
                </Alert>
            </Fade>
          }
        </div>
        }
        </>)
}

export default memo(Results)