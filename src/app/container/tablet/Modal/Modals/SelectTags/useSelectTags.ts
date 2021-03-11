import { useHandleGetArticle } from './context/useHandleGetArticle';
import { useHandleSelectTag } from './context/useHandleSelectTag';
import { useStateSelectTags } from './context/useStateSelectTags';

export const useSelectTagsProps = () => {
  const { tags, selectingTags, setSelectingTags } = useStateSelectTags();

  const handleSelectTag = useHandleSelectTag(selectingTags, setSelectingTags);

  const handleGetArticle = useHandleGetArticle(selectingTags);

  return { tags, selectingTags, handleSelectTag, handleGetArticle };
};

export type SelectTagsPresenterProps = ReturnType<typeof useSelectTagsProps>;
