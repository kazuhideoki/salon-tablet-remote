import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { HelpButton } from '../../viewComponents/buttons/HelpButton';
import { T_on_tap } from '../../../Store/Types';
import { AppStateAction } from '../../../Reducer/AppStateAction';


const useStyles = makeStyles((theme: Theme) => createStyles({

}));

type Props = {
  onTap: T_on_tap,
  dispatchAppState: React.Dispatch<AppStateAction>,
  className?: string
}

// export const SwitchOnTapModal = ({ onTap, setOnTap }) => {
export const SwitchOnTapModal:React.FC<Props> = ({ onTap, dispatchAppState, className}) => {
  const classes = useStyles()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchAppState({
      type: "SET_ON_TAP",
      payload: (event.target as HTMLInputElement).value as T_on_tap,
    });
  };

  return (
    <div className={className}>
      <FormControl component="fieldset">
        <FormLabel component="legend">フッターアイテム機能切り替え</FormLabel>
        <RadioGroup row aria-label="switch-on-tap" name="switch-on-tap" value={onTap} onChange={handleChange} >
          <FormControlLabel value="modal" control={<Radio />} label="ウィンドウ" />
          {/* <HelpButton content="ブログ記事のようにウィンドウが開きます。"/> */}
          <FormControlLabel value="link" control={<Radio />} label="リンク" />
          <FormControlLabel value="appLink" control={<Radio />} label="ショートカット" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
