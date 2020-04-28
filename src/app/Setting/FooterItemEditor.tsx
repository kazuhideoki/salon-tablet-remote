import React from 'react'
import { IconSelect } from "./IconSelect";
import ReactQuill from 'react-quill';
import { EditorContext } from '../Store/EditorContext';
import { FooterItem } from '../Store/Store';

export const FooterItemEditor = () => {
  const {
    iconName,
    setIconName,
    footerItemEditorText,
    setFooterItemEditorText,
    isEdittingFooterItem,
    setIsEdittingFooterItem,
    edittingFooterItemParams,
  } = React.useContext(EditorContext);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link',
  ]
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();


  const hundleSubmit = () => {
    if (isEdittingFooterItem) {
      const params: FooterItem = {
        footer_items_id: edittingFooterItemParams.footer_items_id,
        icon_name: iconName,
        // date: dateToSql(edittingFooterItemParams.date),
        item_content: footerItemEditorText,
      };
      updatePost(params, setIsEdittingFooterItem);

    } else {
      const today = new Date();
      const date = dateToSql(today);
      const params: FooterItem = {
        footer_items_id: 0,
        icon_name: iconName,
        // date: date,
        item_content: footerItemEditorText,
      };
      createPost(params);

    }
  };
  const enableCreateMode = () => {
    setIsEdittingFooterItem(false);
    setIconName("");
    setFooterItemEditorText("");
  };

  const ModeNotice = () => {
    return (
      <>
        <p>{`${edittingFooterItemParams.icon_name}のアイコンを編集中`}</p>
        <button onClick={() => enableCreateMode()}>新規作成にする</button>
      </>
    )
  }


  return (
    <>
      {isEdittingFooterItem ? <ModeNotice /> : <p>"新規投稿"</p>}

      <h2>記事タイトル</h2>
      <input
        value={iconName}
        onChange={(e) => setIconName(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <ReactQuill
        value={footerItemEditorText}
        onChange={(e) => setFooterItemEditorText(e)}
        theme="snow"
        modules={modules}
        formats={formats}
      />
      <button onClick={() => hundleSubmit()}>完了</button>
      <IconSelect />
    </>
  );
};

export default FooterItemEditor
