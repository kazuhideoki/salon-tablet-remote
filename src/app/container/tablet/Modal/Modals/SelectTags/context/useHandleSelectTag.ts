export const useHandleSelectTag = (
  selectingTags: number[],
  setSelectingTags: React.Dispatch<React.SetStateAction<number[]>>
) => {
  return (tagId: number) => {
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
