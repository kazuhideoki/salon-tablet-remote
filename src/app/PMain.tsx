import React from "react";
import { Store } from "./Store/Store";
import { sqlToDate } from "./modules/organizeSql/sqlToDate";
import { Grid, Card, CardActionArea, CardContent, Typography } from "@material-ui/core";
import { useStylesFactory } from "./Store/useStylesFactory";
import { UpdatePostButton } from "./Setting/UpdatePostButton";
import { DeletePostButton } from "./Setting/DeletePostButton";
import { CreatePostButton } from "./Setting/CreatePostButton";
import { stateToHTML } from "draft-js-export-html";



const styles = {
    root: {
        overflow: "scroll",
        height: "100%",
    },
    item: {
        position: "relative",
        height: "100%",
    },
    article: {
        width: 350,
        height: "100%",
    },
    insta: {
        width: 408,
        height: "100%",
    },
    instaDiv: {
        position: "relative",
    },
    titleImgDiv: {
        position: "relative",
    },
    title: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: "40px 10px 0 10px",
        background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5074404761904762) 33%, rgba(255,255,255,1) 100%)",
    },
    img: {
        objectFit: "cover",
        width: "100%",
        height: 300,
        backgroundSize: "cover",
    },
    staffImg: {
        width: 50,
    },
    updatePostButton: {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 100,
    },
    deletePostButton: {
        position: "absolute",
        top: 0,
        right: 50,
        zIndex: 100,
    },
    createPostButton: {
        position: "absolute",
        top: 50,
        left: 100,
        zIndex: 100,
    },
};

export const PMain = () => {
    const classes = useStylesFactory(styles);

    const {
        appState,
        postData,
        dispatchAppState,
    } = React.useContext(Store);
    // 利用するデータを抜き出し、authorをnumberから名前に変える    
    const props = {
        postData,
        classes,
        dispatchAppState,
    };
    type Props = typeof props


    const PMainPresenter: React.FC<Props> = ({
        postData,
        classes,
    }: Props) => {
        let displayArticles;

        if (postData) {
            console.debug("PMainPresenter" + postData);

            displayArticles = postData.map((value, key: number) => {

                return (
                    <Grid item key={key} className={classes.item}>
                        {appState.isSetting ? (
                            <UpdatePostButton
                                position={classes.updatePostButton}
                            />
                        ) : null}
                        {appState.isSetting ? (
                            <DeletePostButton
                                position={classes.deletePostButton}
                                id={value.id}
                            />
                        ) : null}

                        <Card
                            variant="outlined"
                            className={classes.article}
                            id={`p_main_` + key}
                        >
                            <CardActionArea>
                                <CardContent>
                                    <Typography
                                        className={classes.title}
                                        variant="h5"
                                    >
                                        {value.title}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        align="right"
                                    >
                                        {sqlToDate(value.date)}
                                    </Typography>
                                    <Typography variant="body1">
                                        {/* <div
                                            dangerouslySetInnerHTML={{
                                                __html: value.content,
                                            }}
                                        /> */}
                                        <p>{stateToHTML(value.content)}</p>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                );
            });
            // 記事がもしなかった場合の表示
        } else {
            displayArticles = <div>No articles</div>;
        }

        return (
            <Grid 
                id="p_main"
                container
                wrap="nowrap"
                className={classes.root}
                spacing={2}
            >
                {appState.isSetting ? (
                    <CreatePostButton position={classes.createPostButton}/>
                ) : null}
                {displayArticles}
            </Grid>
        );
    };



    return PMainPresenter(props);

}

