import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Store } from "../../Store/Store";
import { T_modal_size } from "../../Store/Types";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export function SelectModalSize() {
  const classes = useStyles();
  const { appState, dispatchAppState} = React.useContext(Store)
  const modalSize = appState.edittingPrams.modalSize

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchAppState({ type: "SET_MODAL_SIZE", payload:(event.target as HTMLInputElement).value as T_modal_size});
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">ウィンドウサイズ選択</FormLabel>
      <RadioGroup
        row
        aria-label="modalSize"
        name="modalSize"
        value={modalSize}
        onChange={handleChange}
      >
        {/* ラジオボタンはstring型じゃないとうまく作動しない？ */}
        <FormControlLabel value="fullScreen" control={<Radio />} label="全画面" />
        <FormControlLabel value="large" control={<Radio />} label="大" />
        <FormControlLabel value="medium" control={<Radio />} label="中" />
        <FormControlLabel value="small" control={<Radio />} label="小" />
      </RadioGroup>
    </FormControl>
  );
}
