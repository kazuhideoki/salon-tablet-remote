import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { HelpButton } from '../buttons/HelpButton';


const useStyles = makeStyles((theme: Theme) => createStyles({

}));

export function SwitchOnTapModal({ onTap, setOnTap }) {
  const classes = useStyles()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOnTap((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">フッターアイテム機能切り替え</FormLabel>
      <RadioGroup row aria-label="gender" name="gender1" value={onTap} onChange={handleChange} >
        <FormControlLabel value="modal" control={<Radio />} label="モーダルウィンドウ" />
        {/* <HelpButton content="ブログ記事のようにウィンドウが開きます。"/> */}
        <FormControlLabel value="link" control={<Radio />} label="外部リンク" />
        <FormControlLabel value="appLink" control={<Radio />} label="アプリリンク" />
      </RadioGroup>
    </FormControl>
  );
}
