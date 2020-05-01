import React from 'react'
import { TextField, Button } from '@material-ui/core';
import { Store } from '../Store/Store';

export const SettingPassword = () => {
  const { dispatchAppState } = React.useContext(Store)

  const hancleOnClick = () => {
    dispatchAppState({ type: "ON_IS_SETTING" })
    dispatchAppState({ type: "CLOSE_MODAL" })

  }

  return (
    <div>
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="outlined"
      />
      <Button onClick={() => hancleOnClick()}>設定</Button>
    </div>
  );
}
