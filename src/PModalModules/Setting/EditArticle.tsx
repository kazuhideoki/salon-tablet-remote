import React from 'react'
import { dateToSql } from "../../modules/organizeSql/dateToSql";
import { Store, PostDataSingle } from '../../modules/Store'
import {
  useCreatePost,
  useGetSinglePost,
  useUpdatePost, 
  useDeletePost,
} from "../../modules/postDataRducer";
import { sqlToDate } from '../../modules/organizeSql/sqlToDate';

const PostForm = (props) => {
    const {
    title,
      setTitle,
      content,
      setContent,
    //   titleRef,
    //   contentRef,
      isEdit,
      setIsEdit,
      edittingPostParams,
      setEdittingPostParams,
    } = props;
    // const [edittingPostParams, setEdittingPostParams] = React.useState({
    //   id: 0,
    //   title: '',
    //   date: '',
    //   content: '',
    const today = new Date()
    const date = dateToSql(today);

    const createPost = useCreatePost()
    const updatePost = useUpdatePost()
    

    const hundleSubmit = (e) => {
        if (isEdit) {
            e.preventDefault();
            const params = {
              id: edittingPostParams.id,
              title: title,
              date: dateToSql(edittingPostParams.date),
              content: content,
            };
            updatePost(params, setIsEdit);
        }else{
            e.preventDefault();
            createPost(title, date, content);
            setTitle('')
            // titleRef.current.value = ''
            setContent('') 
            // contentRef.current.value = ''
        }
    }
    const modeNotice = (isEdit) ? `${edittingPostParams.title}の記事を編集中` : "新規投稿"

    const enableCreateMode = () => {
        setIsEdit(false)
        setTitle('')
        setContent('')
    }

    return (
        <>
    <h2>{modeNotice}</h2>
    <button onClick={() => enableCreateMode()}>新規投稿</button>
      <form onSubmit={(e) => hundleSubmit(e)}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        // ref={titleRef}
          type="text"
          name="title"
        />
        <br />
        <input
          style={{ width: 300, height: 100 }}
          onChange={(e) => setContent(e.target.value)}
          value={content}
        // ref={contentRef}
          type="text"
          name="content"
        />
        <button style={{ color: "red", fontWeight: "bold" }} type="submit">
          送信
        </button>
      </form>
    </>
    );
}

const ShowArticle = (props) => {
    const {
        title,
        setTitle,
        content,
        setContent,
    //   titleRef,
    //   contentRef,
      isEdit,
      setIsEdit,
      setEdittingPostParams,
    } = props;
  const { postData } = React.useContext(Store);
  const deletePost = useDeletePost();
  const getSinglePost = useGetSinglePost();
  const articles = postData.map((value, key) => (
    <>
      <div style={{ borderTop: "solid 2px" }}></div>
      <h2 key={key}>{value.title}</h2>
      <h3>{sqlToDate(value.date)}</h3>
      <p>{value.content}</p>
      <button
        onClick={() =>
          getSinglePost(
            value.id,
            setTitle,
            setContent,
            setIsEdit,
            setEdittingPostParams
          )
        }
      >
        編集する
      </button>
      <button onClick={() => deletePost(value.id)}>削除する</button>
    </>
  ));

  return <>{articles}</>;
};

// const formRef = React.useRef(null)
export const EditArticle = () => {
    const [title, setTitle] = React.useState("");
    // const titleRef = React.useRef(null);
    // const contentRef = React.useRef(null);
    const [content, setContent] = React.useState("");
    const [isEdit, setIsEdit] = React.useState(false);
    const [edittingPostParams, setEdittingPostParams] = React.useState(
      {} as PostDataSingle
    );
    
    const props = {
      title,
      setTitle,
      content,
      setContent,
    // titleRef,
    // contentRef,
      isEdit,
      setIsEdit,
      edittingPostParams,
      setEdittingPostParams,
    };

    return (
      <div>
        <PostForm {...props} />
        <ShowArticle {...props} />
      </div>
    );
}
