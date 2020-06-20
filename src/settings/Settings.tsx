import React from 'react'
import { Card, CardHeader, Avatar, CardContent, makeStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
import { useSettings, DictionaryType } from './SettingsProvider';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '60em',
      margin: '2em'
    },
    avatar: {
      backgroundColor: theme.palette.secondary.main,
    },  
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    }
  }));

const Settings = () => {
    const classes = useStyles()
    const [setting, updateSetting] = useSettings()

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      updateSetting(event.target.value as DictionaryType );
    };

    return (
        <Card className={classes.root}>
        <CardHeader
            avatar={
            <Avatar aria-label="settings" className={classes.avatar}>
                <SettingsIcon />
            </Avatar>
            }
            title={"Settings"}
            subheader={"Select the dictionay used across the Scrabble Trainer website"}
        />
        <CardContent>
        <FormControl variant="outlined" className={classes.formControl}>
        <Select
          value={setting as string}
          id="settings-input"
          onChange={handleChange}
        >
          <MenuItem value="SOWPODS">Sowpods</MenuItem>
          <MenuItem value="ENABLE">Enable</MenuItem>
        </Select>
      </FormControl>
        </CardContent>
        </Card>)
}

export default Settings;
