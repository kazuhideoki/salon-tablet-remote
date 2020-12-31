import { useCreateTag } from "./lib/useCreateTag";
import { useUpdateTag } from "./lib/useUpdateTag";

export const useHandleOnClick = (isEditting: boolean, edittingTagId: number, tagNameField: string) => {
  const createTag = useCreateTag();
  const updateTag = useUpdateTag();

  return () => {
    if (isEditting) {
      updateTag({ edittingTagId, tagName: tagNameField });
    } else {
      createTag(tagNameField);
    }
  }
}