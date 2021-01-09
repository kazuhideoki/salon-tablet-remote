import React from 'react';
import { TagsContext } from '../../../../../store/tags/Context';
export const useIsValidTagName = (tagNameField: string) => {
  const { tags } = React.useContext(TagsContext);

  return () => {
    if (tagNameField.length === 0) {
      return false;
    } else if (tagNameField.length > 20) {
      return false;
    }
    const tagNames = tags.map((value) => {
      return value.tag_name;
    });

    if (tagNames.includes(tagNameField)) {
      return false;
    }

    return true;
  };
};
