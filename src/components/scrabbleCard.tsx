import React from 'react'
import { Card, CardHeader,  CardContent, makeStyles, Avatar, CardHeaderProps } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
    },
    card: {
      maxWidth: '60em',
      margin: '2em',  
      flex: '1 1 0px'
    },
    avatar: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },  
    cardHeader: {
        display: 'flex',
        flexFlow: 'column wrap',
        textAlign: 'center'
      },
      margin: {
        margin: theme.spacing(1),
      },
  }));

  interface Props extends CardHeaderProps {
    content?: JSX.Element | string
  }

  const ScrabbleCard = (props: Props) => {
    const classes = useStyles();

    const extendedProps = {
      ...props,
      avatar: <Avatar aria-label="avatar" className={classes.avatar}> {props.avatar} </Avatar>
    }

    return (
        <>
        <div className={classes.root}>,
            <Card className={classes.card}>
            <CardHeader {...extendedProps} />
            <CardContent className={classes.margin}>
                {props.content && props.content}
          </CardContent>
        </Card>
      </div>
      </>)
  }

  export default React.memo(ScrabbleCard)