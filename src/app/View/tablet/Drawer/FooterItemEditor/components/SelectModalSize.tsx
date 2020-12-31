import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { HelpButton } from "../../../../../pureComponents/buttons/HelpButton";
import { TUseFooterItemEditorProps } from "../view/FooterItemEditor";
import { AppStateContext } from "../../../../../Store/appState/Context";

type Props = TUseFooterItemEditorProps & {className?: string}

export const SelectModalSize:React.FC<Props> = (props) => {
  const { appState, dispatchAppState} = React.useContext(AppStateContext)

  

  return (
    <div className={props.className}>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          ウィンドウサイズ
          {props.isMobile ? (
            <HelpButton content="スマートフォンではウィンドウサイズは反映されません。タブレットで表示をご確認下さい" size='small'/>
          ) : null}
        </FormLabel>
        <RadioGroup
          row
          aria-label="modalSize"
          name="modalSize"
          value={props.modalSizeRadio}
          onChange={props.handleChange}
        >
          {/* ラジオボタンはstring型じゃないとうまく作動しない */}
          <FormControlLabel
            value="fullScreen"
            control={<Radio />}
            label="全画面"
          />
          <FormControlLabel value="large" control={<Radio />} label="大" />
          <FormControlLabel value="medium" control={<Radio />} label="中" />
          <FormControlLabel value="small" control={<Radio />} label="小" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
