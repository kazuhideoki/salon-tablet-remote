import React from "react";
import { removeImg } from "../Setting/QuillEditor";


// article_contentをいれると抜粋を抜き出してくれる
export const getExcerpt = (text, length) => {

  removeImg("react_quill_pmain");
  return text.slice(0, 100);
};