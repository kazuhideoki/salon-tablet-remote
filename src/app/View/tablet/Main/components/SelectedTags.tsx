import React from 'react'
import { TArticle, TTags } from '../../../../Store/Interface';
import { Chip } from '@material-ui/core';

type Props = {
  className: string
  article: TArticle
  tags: TTags
}

// 各記事で選択されているタグを表示
export const SelectedTags:React.FC<Props> = (props) => {

  return (
    <div className={props.className}>
      {props.article.tag_ids.map((tagId, key) => {
        const targetTag = props.tags.filter((tagsValue) => {
          return tagId === tagsValue.tag_id;
        });
        if (!targetTag.length) {
          return null
        }
        return <Chip key={key} label={targetTag[0].tag_name} size="small" />;
      })}
    </div>
  );
}
