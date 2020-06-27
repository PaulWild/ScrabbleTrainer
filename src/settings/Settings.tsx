import React from 'react'
import { FormControl, Select, MenuItem } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
import { useSettings, DictionaryType } from './SettingsProvider';
import ScrabbleCard from './../components/scrabbleCard';

const Settings = () => {
    const [setting, updateSetting] = useSettings()

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      updateSetting(event.target.value as DictionaryType );
    };

    const title = "Settings"
    const subHeader = "Select the dictionay used across the Scrabble Trainer website"
    const avatar = <SettingsIcon />
    const content = <>
      <FormControl variant="outlined" >
        <Select
          value={setting as string}
          id="settings-input"
          onChange={handleChange}
        >
          <MenuItem value="sowpods">Sowpods</MenuItem>
          <MenuItem value="enable">Enable</MenuItem>
        </Select>
      </FormControl>
    </>

    return <ScrabbleCard title={title} subheader={subHeader} avatar={avatar} content={content} />
}

export default Settings;
