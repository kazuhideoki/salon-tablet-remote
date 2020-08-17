import React from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      // margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

type Props = {
  appLinkUrl: string
  setAppLinkUrl: React.Dispatch<React.SetStateAction<string>>
  className?: string
}

export const SelectAppLink:React.FC<Props> = ({appLinkUrl, setAppLinkUrl, className}) => {
  const classes = useStyles()

  return (
    <FormControl className={`${classes.formControl} ${className}`}>
      <InputLabel id="select-app-label">アプリ</InputLabel>
      <Select
        labelId="select-app-label"
        id="select-app"
        value={appLinkUrl}
        onChange={(e: React.ChangeEvent<{ value: string }>) =>
          setAppLinkUrl(e.target.value)
        }
        label="アプリ"
      >
        {/* <AppLinks/> */}
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {/* ※↓mapを使ってやろうとしたがうまく行かなかった。別ファイルにも分けられない？ */}
        <MenuItem value="rmagazine://">楽天マガジン(iOS, Android)</MenuItem>
        <MenuItem value="fb179689808731959://">Magzter(iOS)</MenuItem>
        <MenuItem value="magzter://">Magzter(Android)</MenuItem>
        <MenuItem value="ibooks://">iBooks(iOS)</MenuItem>
        <MenuItem value="photos-redirect://">Photos(iOS)</MenuItem>
      </Select>
    </FormControl>
  );
}
