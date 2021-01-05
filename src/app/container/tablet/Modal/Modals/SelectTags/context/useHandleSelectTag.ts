import { T_tag_id } from '../../../../../../../util/interface/Interface';

export const useHandleSelectTag = (
  selectingTags: number[],
  setSelectingTags: React.Dispatch<React.SetStateAction<number[]>>
) => {
  return (tagId: T_tag_id) => {
    let newValue: number[];

    if (selectingTags.includes(tagId)) {
      newValue = selectingTags.filter((value) => {
        return value !== tagId;
      });
    } else {
      newValue = selectingTags.concat(tagId);
    }

    setSelectingTags(newValue);
  };
};
