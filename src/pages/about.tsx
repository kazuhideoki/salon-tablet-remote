import WebSiteDrawer from '../app/components/pages/WebsiteDrawer';
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      margin: theme.spacing(3),
    },
  })
);

function About() {
  const classes = useStyles();

  return (
    <div>
      <Typography
        className={classes.typography}
        align="center"
        variant="h4"
        component="h2"
        gutterBottom
        color="textSecondary">
        製作中
      </Typography>
    </div>
  );
}

export default About;
