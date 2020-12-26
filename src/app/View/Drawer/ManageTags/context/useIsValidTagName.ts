import React from 'react'
import { Store } from '../../../../Store/Store';
export const useIsValidTagName = (tagNameField: string) => {
  const { appState } = React.useContext(Store);
  const { tags } = appState;

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
}