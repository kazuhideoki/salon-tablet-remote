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
import { TUseFooterItemEditorProps } from './FooterItemEditor';


const useStyles = makeStyles((theme: Theme) => createStyles({

}));

type Props = TUseFooterItemEditorProps & {
  className?: string
}

export const SwitchOnTapModal:React.FC<Props> = (props) => {
  const classes = useStyles()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.dispatchAppState({
      type: "SET_ON_TAP",
      payload: (event.target as HTMLInputElement).value as T_on_tap,
    });
  };

  return (
    // <div className={props.className}>
      <FormControl component="fieldset" className={props.className}>
        <FormLabel component="legend">
          アイテム機能
          {props.isMobile ? (
            <HelpButton
              content="該当アプリケーションが端末内にインストールされてない場合「アプリ」のショートカットは機能しません。また、「パブリックモード」「スマートフォン表示」では表示されません"
              size="small"
            />
          ) : null}
        </FormLabel>
        <RadioGroup
          row
          aria-label="switch-on-tap"
          name="switch-on-tap"
          value={props.onTap}
          onChange={handleChange}
        >
          <FormControlLabel
            value="modal"
            control={<Radio />}
            label="ウィンドウ"
          />
          {/* <HelpButton content="ブログ記事のようにウィンドウが開きます。"/> */}
          <FormControlLabel value="link" control={<Radio />} label="リンク" />
          <FormControlLabel
            value="appLink"
            control={<Radio />}
            label={`${props.isMobile ? "※" : ""}アプリ`}
          />
          <FormControlLabel
            value="google"
            control={<Radio />}
            label={`Google検索`}
          />
        </RadioGroup>
      </FormControl>
    // </div>
  );
}
