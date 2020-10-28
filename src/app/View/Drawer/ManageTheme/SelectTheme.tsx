import React from 'react'
import { FormControl, RadioGroup, FormControlLabel, Radio, FormLabel } from '@material-ui/core';
import { TUseManageThemeProps } from './ManageTheme'

export const SelectTheme = (props: TUseManageThemeProps) => {
         return (
           <FormControl component="fieldset">
             <FormLabel component="legend">テーマ</FormLabel>
             <RadioGroup
               row
               aria-label="setting-theme"
               name="setting-theme"
               value={props.selected_theme}
               onChange={props.handleChange}
             >
               <FormControlLabel
                 value="white"
                 control={<Radio />}
                 label="白"
               />
               <FormControlLabel
                 value="natural"
                 control={<Radio />}
                 label="ナチュラル"
               />
             </RadioGroup>
           </FormControl>
         );
       };
