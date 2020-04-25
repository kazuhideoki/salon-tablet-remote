import React from "react";
import ReactQuill from "react-quill"; 
import {
  useCreatePost,
  useUpdatePost,
} from "../Store/postData/postDataActionCreator";
import { dateToSql } from "../modules/organizeSql/dateToSql";
import { EditorContext } from "../Store/EditorContext";

const Editor = () => {
const {
    titleText,
    setTitleText,
    editorText,
    setEditorText,
    isEdittingPost,
    setIsEdittingPost,
    edittingPostParams,
} = React.useContext(EditorContext);
    const modules = {
        toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]
    const createPost = useCreatePost();
        const updatePost = useUpdatePost();


    const hundleSubmit = () => {
        if (isEdittingPost) {
            const params = {
                id: edittingPostParams.id,
                title: titleText,
                date: dateToSql(edittingPostParams.date),
                content: editorText,
            };
            updatePost(params, setIsEdittingPost);

        }else{
            const today = new Date();
            const date = dateToSql(today);
            const params = {
                id: 0,
                title: titleText,
                date: date,
                content: editorText,
            };
            createPost(params);

        }
    };
    const enableCreateMode = () => {
        setIsEdittingPost(false);
        setTitleText("");
        setEditorText("");
    };

    const ModeNotice = () => {
        return(
            <>
                <p>{`${edittingPostParams.title}の記事を編集中`}</p>
                <button onClick={() => enableCreateMode()}>新規投稿にする</button>
            </>
        )
    }


    return (
    <>
        {isEdittingPost ? <ModeNotice/> : <p>"新規投稿"</p>}

        <h2>記事タイトル</h2>
        <input
        value={titleText}
        onChange={(e) => setTitleText(e.target.value)}
        style={{ marginBottom: "20px" }}
        />
        <ReactQuill
        value={editorText}
        onChange={(e) => setEditorText(e)}
        theme="snow"
        modules={modules}
        formats={formats}
        />
        <button onClick={() => hundleSubmit()}>投稿</button>
    </>
    );
};

export default Editor
