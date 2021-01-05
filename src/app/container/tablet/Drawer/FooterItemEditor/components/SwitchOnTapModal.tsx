import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { HelpButton } from '../../../../../components/HelpButton';
import { Ontap } from '../../../../../../util/interface/Interface';
import { FooterItemEditorPresenterProps } from '../FooterItemEditor';

type Props = FooterItemEditorPresenterProps & {
  className?: string;
};

export const SwitchOnTapModal: React.FC<Props> = (props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setOnTapRadio(event.target.value as Ontap);
  };

  return (
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
        value={props.onTapRadio}
        onChange={handleChange}>
        <FormControlLabel
          value="modal"
          control={<Radio />}
          label="ウィンドウ"
        />
        <FormControlLabel value="link" control={<Radio />} label="リンク" />
        <FormControlLabel
          value="appLink"
          control={<Radio />}
          label={`${props.isMobile ? '※' : ''}アプリ`}
        />
        <FormControlLabel
          value="google"
          control={<Radio />}
          label={`Google検索(実験機能)`}
        />
      </RadioGroup>
    </FormControl>
  );
};
