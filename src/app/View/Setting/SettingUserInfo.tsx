import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Settings } from "@material-ui/icons";
import { useUpdateUser } from "../../ActionCreator/user/useUpdateUser";
import { Store } from "../../Store/Store";
import { EditorContext } from "../../Store/EditorContext";
import { Divider, ListItem } from "@material-ui/core";

const useSettingUserInfoProps = () => {
  const {
    name,
    setName,
    shopName,
    setShopName,
    email,
    password,
    setPassword,
  } = React.useContext(EditorContext);

  const { userInfo, dispatchAppState } = React.useContext(Store)

  const updateUser = useUpdateUser()

  const handleOnSubmit = () => {
    console.log("handleOnSubmitだよ");

    updateUser()
  }

  const openDeleteAccountForm = () => {
    dispatchAppState({ type: "OPEN_MODAL", payload: "delete_account_form" });
  }

  return {
    name,
    setName,
    shopName,
    setShopName,
    email,
    password,
    setPassword,
    userInfo,
    updateUser,
    handleOnSubmit,
    openDeleteAccountForm,
  }
}

type Props = ReturnType<typeof useSettingUserInfoProps>

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const isValidPassword = (password) => {
  const regrex = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/;
  return regrex.test(password)
}

export const SettingUserInfoPresenter:React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Settings />
        </Avatar>
        <Typography component="h1" variant="h5">
          アカウント
        </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="メールアドレス"
                  name="email"
                  autoComplete="email"
                  value={props.email}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="名前"
                  value={props.name}
                  onChange={(e) => props.setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="shopName"
                  label="お店の名前"
                  name="shopName"
                  autoComplete="lname"
                  value={props.shopName}
                  onChange={(e) => props.setShopName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="パスワード"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={props.password}
                  onChange={(e) => props.setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
              {isValidPassword(props.password) ||
              props.password.length === 0 ? null : (
                <Typography component="h3" variant="body1" color={"error"}>
                  {/* ※パスワードは半角で英小文字大文字数字をそれぞれ1種類以上含む8文字以上でご入力下さい */}
                  <b>
                    ※パスワードは【0-9】【a-z】【A-Z】を含む【8文字以上】でご入力下さい
                  </b>
                </Typography>
              )}
              {props.userInfo.isSetPassword ? (
                <Typography component="h3" variant="body1" color={"error"}>
                  ※パスワードは変更時のみご入力下さい。
                </Typography>
              ) : (
                <Typography component="h3" variant="body1" color={"secondary"}>
                  ※パスワードを設定して下さい。(サインインや各種設定で使用)
                </Typography>
              )}

            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => props.handleOnSubmit()}
              disabled={
                isValidPassword(props.password) || props.password.length === 0
                  ? false
                  : true
              }
            >
              更新
            </Button>
          </form>
        <Divider variant="middle"/>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={() => props.openDeleteAccountForm()}
            // disabled
          >
            アカウントを削除する
          </Button>
      </div>
    </Container>
  );
}

export const SettingUserInfo = () => {
  const props = useSettingUserInfoProps()
  return <SettingUserInfoPresenter {...props} />
}
