import React from 'react'
import { FormControl, RadioGroup, FormControlLabel, Radio, FormLabel } from '@material-ui/core';
import { TUseManageThemeProps } from './ManageTheme'

export const SelectTheme = (props: TUseManageThemeProps) => {
         return (
           <FormControl component="fieldset">
             <FormLabel component="legend">テーマ変更</FormLabel>
             <RadioGroup
               row
               aria-label="setting-theme"
               name="setting-theme"
               value={props.selected_theme}
               onChange={props.handleChange}
             >
               <FormControlLabel
                 value="nonTheme"
                 control={<Radio />}
                 label="テーマなし"
               />
               <FormControlLabel
                 value="minimal"
                 control={<Radio />}
                 label="ミニマル"
               />
             </RadioGroup>
           </FormControl>
         );
       };
