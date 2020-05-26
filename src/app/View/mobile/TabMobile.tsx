import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Settings, VideoLabel, NoteAddOutlined } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    width: "100%",
    flexGrow: 1,
    maxWidth: 500,
    position: "fixed",
    bottom: 0,
  },
});

export function TabMobile({tab, setTab}) {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<NoteAddOutlined />} label="ARTICLES" />
        <Tab icon={<VideoLabel />} label="FOOTERICONS" />
        <Tab icon={<Settings />} label="SETTING" />
      </Tabs>
    </Paper>
  );
}
