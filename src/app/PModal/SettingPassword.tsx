import React from 'react'
import { TextField } from '@material-ui/core';

export const SettingPassword = () => {
  return (
    <div>
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="outlined"
      />
    </div>
  );
}
