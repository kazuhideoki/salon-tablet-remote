import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { InfoBarType } from '../../../../../../util/interface/Interface';

type Props = {
  infoBarType: InfoBarType;
  setInfoBarType: React.Dispatch<React.SetStateAction<InfoBarType>>;
  className?: string;
};

export const SwitchOnTapInfoBar: React.FC<Props> = ({
  infoBarType,
  setInfoBarType,
  className,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfoBarType(event.target.value as InfoBarType);
  };

  return (
    <div className={className}>
      <FormControl component="fieldset">
        <FormLabel component="legend">インフォ機能切り替え</FormLabel>
        <RadioGroup
          row
          aria-label="switch-on-tap-info-bar"
          name="switch-on-tap-info-bar"
          value={infoBarType}
          onChange={handleChange}>
          <FormControlLabel
            value="shop_name"
            control={<Radio />}
            label="店名"
          />
          {/* <HelpButton content="ブログ記事のようにウィンドウが開きます。"/> */}
          <FormControlLabel
            value="scrolling_sentence"
            control={<Radio />}
            label="スクロール文字"
          />
          <FormControlLabel
            value="article"
            control={<Radio />}
            label="記事ウィンドウ"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};
