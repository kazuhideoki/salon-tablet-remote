import React from "react";
import { TTagsAction } from "./actions";
import { tagsReducer, TagsContextState } from "./reducer";

export type Props = {tags: TagsContextState};

export type TagsContextProps = {
  tags: TagsContextState;
  dispatchTags: React.Dispatch<TTagsAction>;
};

export const TagsContext = React.createContext({} as TagsContextProps);

export const TagsContextProvider: React.FC<Props> = (props) => {
  const [state, dispatchTags] = React.useReducer(tagsReducer, props.tags);

  const values: TagsContextProps = {
    tags: state,
    dispatchTags,
  };

  return (
    <TagsContext.Provider value={values}>
      {props.children}
    </TagsContext.Provider>
  );
};
