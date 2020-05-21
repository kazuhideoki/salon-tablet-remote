import React from 'react';
import QuillExcerpt from '../app/View/PMain/(未使用)QuillExcerpt';
import { onlyText, withImg } from '../__tests__/sampleArticleContent';
export default {
title: 'QuillExcerpt',
component: QuillExcerpt,
};

export const QuillExcerptOnlyText = () => (
  <QuillExcerpt id="react_quill_pmain"  article_content={onlyText} />
);

export const QuillExcerptWithImg = () => (
  <QuillExcerpt id="react_quill_pmain"  article_content={withImg} />
);
