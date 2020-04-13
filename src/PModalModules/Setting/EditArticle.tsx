import React from 'react'
import { dateToSql } from "../../modules/organizeSql/dateToSql";
import { Store } from '../../modules/Store'
import { useCreatePost } from '../../modules/postDataRducer';


const CreateArticle = () => {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('')

    const today = new Date()
    const date = dateToSql(today);

    const createPost = useCreatePost()
    const hundleSubmit = (e) => {
        e.preventDefault();
        createPost(title, date, content)
        setTitle('')
        setContent('')
    }

    return (
      <form onSubmit={(e) => hundleSubmit(e)}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="title"
        />
        <br/>
        <input
          style={{width: 300, height: 100}}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          name="content"
        />
        <button style={{color: "red", fontWeight: "bold"}}type="submit">送信</button>
      </form>
    );
}

const ShowArticle = () => {
    const { postData } = React.useContext(Store)
    const articles = postData.map( (value, key)=> (
        <>
        <div style={{borderTop: "solid 2px"}}></div>
        <h2 key={key}>{value.title}</h2>
        <h3>{value.date}</h3>
        <p>{value.content}</p>
        <button>編集する</button>
        </>
    ))

    return <>{articles}</>
}

export const EditArticle = () => {
    return (
        <div>
            <CreateArticle/>
            <ShowArticle/>
        </div>
    );
}
