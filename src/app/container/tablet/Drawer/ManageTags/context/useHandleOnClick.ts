import { useCreateTag } from '../../../../../hooks/tags/useCreateTag';
import { useUpdateTag } from '../../../../../hooks/tags/useUpdateTag';

export const useHandleOnClick = (
  isEditting: boolean,
  edittingTagId: number,
  tagNameField: string
) => {
  const createTag = useCreateTag();
  const updateTag = useUpdateTag();

  return () => {
    if (isEditting) {
      updateTag({ edittingTagId, tagName: tagNameField });
    } else {
      createTag(tagNameField);
    }
  };
};
