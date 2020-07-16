import React from 'react'
import { TArticle, TTags } from '../../Store/Store';
import { Chip } from '@material-ui/core';

type Props = {
  className: string
  article: TArticle
  tags: TTags
}

export const SelectedTags:React.FC<Props> = (props) => {

  return (
    <div className={props.className}>
      {props.article.tag_ids.map((tagId) => {
        const targetTag = props.tags.filter((tagsValue) => {
          return tagId === tagsValue.tag_id;
        });
        return <Chip label={targetTag[0].tag_name} size="small" />;
      })}
    </div>
  );
}
