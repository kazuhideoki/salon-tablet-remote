export const deleteExcessSpace = (str: string) => {
  let newStr = str.trim();
  return newStr.replace(/\s+/g, " ");
};

export const useHandleOnClick = (field: string, setField: React.Dispatch<React.SetStateAction<string>>, setSearchHistoryStr: React.Dispatch<React.SetStateAction<string>>

) => {
  return () => {
    setField(""); // 効かない？

    const str: string = localStorage.getItem(
      "googleSearchHistory"
    );

    let newStr;
    let fieldStr = deleteExcessSpace(field);

    if (!fieldStr) {
      return null;
    }

    if (str) {
      let arr = [];
      arr = str.split(",");
      const newArr = arr.includes(fieldStr) ? arr : arr.concat(fieldStr);
      newStr = newArr.toString();
    } else {
      newStr = fieldStr;
    }

    localStorage.setItem("googleSearchHistory", newStr);

    setSearchHistoryStr(localStorage.getItem("googleSearchHistory"));
  };
}