import React from 'react'
import { sqlToDate } from '../../ActionCreator/organizeSql/sqlToDate';
import { usePMainProps } from '../Main/PMain';
import { makeStyles,createStyles, Theme, CircularProgress, List, Typography, CardActionArea, Chip } from '@material-ui/core';
import { Store } from '../../Store/Store';
import { useDeleteArticle } from '../../ActionCreator/articles/useDeleteArticle';
import { EditButtonsBox } from '../viewComponents/buttons/EditButtonsBox';
import { UpdateButton } from '../viewComponents/buttons/UpdateButton';
import { DeleteButton } from '../viewComponents/buttons/DeleteButton';
import { showDataType } from '../Main/showDataType';

export const useMainMobileProps = () => {
  const {
    articles,
    dispatchAppState,
    onClickUpdate,
  } = usePMainProps();

  const { appState } = React.useContext(Store)
  const {loading, isSetting} = appState

  const deleteArticle = useDeleteArticle();

  return {
    articles,
    dispatchAppState,
    loading,
    isSetting,
    deleteArticle,
    onClickUpdate,
  };
}

type Props = ReturnType<typeof useMainMobileProps> & {className?: string}

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      overflowY: "scroll",
      flexGrow: 1,
      width: "100%",
    },
    items: {
      overflowY: "scroll",
    },
    item: {
      display: "flex",
      flexWrap: "nowrap",
      justifyContent: 'flex-start',
      borderBottom: "1px solid grey",
      padding: theme.spacing(1),

      position: 'relative',
    },
    thumbnailDiv: {
      margin: theme.spacing(1),
    },
    thumbnail: {
      objectFit: "cover",
      width: "130px",
      height: "130px",
    },
    contents: {
      margin: theme.spacing(1),
    },
    itemIsDraft: {
      border: "2px solid red",
      borderRadius: 2,
      fontStyle: "italic",
    },
    circularProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    editButtonsBox: {
      position: "absolute",
      top: 0,
      right: 0,
      // zIndex: 10,
    },
  });
})

export const MainMobilePresenter:React.FC<Props> = (props) => {
  const classes = useStyles()

  if (props.loading.main) {
    return <CircularProgress
      className={classes.circularProgress}
      size={50}
      thickness={4}
    />
  }

  if (props.articles.length === 0) {
    return <div className={classes.item}>記事がありません</div>;
  }
      
  return (
    <div className={`${classes.root} ${props.className}`}>
      
      {/* ↓スクロール可のためにrootと分けてある */}
      <List className={classes.items}>

      {props.articles.map((value, key) => {
        return (
          <div key={key}>
            <CardActionArea
              // key={key}
              className={classes.item}
              onClick={() =>
                props.dispatchAppState({
                  type: "OPEN_ARTICLE_MODAL",
                  payload: key,
                })
              }
              component="li"
            >
              <div className={classes.thumbnailDiv}>
                {value.article_img.length ? (
                  <img
                    className={`p-main-thumbnail ${classes.thumbnail}`}
                    src={value.article_img}
                  />
                ) : (
                  <div
                    className={`p-main-thumbnail ${classes.thumbnail}`}
                  ></div>
                )}
              </div>
              <div className={classes.contents}>
                <Typography variant="h6" component="h2">
                  {value.title}
                  {value.is_published ? null : (
                    // <span className={classes.itemIsDraft}>下書き</span>
                    <Chip
                      size="small"
                      label="下書き"
                      className={classes.itemIsDraft}
                    />
                  )}
                  {showDataType(value.data_type)}
                </Typography>
                {/* <Typography gutterBottom variant="body1">
                  {value.article_excerpt}
                  {value.article_excerpt.length > 100 ? "..." : ""}
                </Typography> */}
                <Typography gutterBottom variant="subtitle1" align="right">
                  {sqlToDate(value.created_at)}
                </Typography>
              </div>
              {props.isSetting ? (
                <EditButtonsBox className={classes.editButtonsBox}>
                  <UpdateButton onClick={props.onClickUpdate} value={value} />
                  <DeleteButton
                    onClick={props.deleteArticle}
                    value={value.article_id}
                  />
                </EditButtonsBox>
              ) : null}
            </CardActionArea>
          </div>
        );
      })}
      </List>
       
    </div>
  );
}

export const MainMobile = ({className = ''}) => {
  const props = useMainMobileProps()

  return <MainMobilePresenter {...props} className={className}/>
}
