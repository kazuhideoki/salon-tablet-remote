import React from 'react'
import { IconSelect } from "./iconSelect/IconSelect";
import ReactQuill from 'react-quill';
import { QuillEditor } from "./QuillEditor";
import { EditorContext } from '../Store/EditorContext';
import { FooterItem } from '../Store/Store';

export const FooterItemEditor = () => {
  const {
    selectedIcon,
    dispatchSelectedIcon,
    iconName,
    setIconName,
    footerItemEditorText,
    setFooterItemEditorText,
    isEdittingFooterItem,
    setIsEdittingFooterItem,
    edittingFooterItemParams,
  } = React.useContext(EditorContext);

  
  // const createPost = useCreatePost();
  // const updatePost = useUpdatePost();


  // const hundleSubmit = () => {
  //   if (isEdittingFooterItem) {
  //     const params: FooterItem = {
  //       footer_items_id: edittingFooterItemParams.footer_items_id,
  //       icon_name: iconName,
  //       // date: dateToSql(edittingFooterItemParams.date),
  //       item_content: footerItemEditorText,
  //     };
  //     updatePost(params, setIsEdittingFooterItem);

  //   } else {
  //     const today = new Date();
  //     const date = dateToSql(today);
  //     const params: FooterItem = {
  //       footer_items_id: 0,
  //       icon_name: iconName,
  //       // date: date,
  //       item_content: footerItemEditorText,
  //     };
  //     createPost(params);

  //   }
  // };
  // const enableCreateMode = () => {
  //   setIsEdittingFooterItem(false);
  //   setIconName("");
  //   setFooterItemEditorText("");
  // };



  return (
    <>
      <h2>フッターの設定</h2>
      <input
        value={iconName}
        onChange={(e) => setIconName(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <QuillEditor value={footerItemEditorText}
      setValue={setFooterItemEditorText}/>
      <button
      // onClick={() => hundleSubmit()}
      >
        完了
      </button>
      <IconSelect/>
    </>
  );
};

export default FooterItemEditor
