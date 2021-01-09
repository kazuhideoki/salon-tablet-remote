import { deleteExcessSpace } from "./useHandleOnClick";

export const useHandleOnChange = (setField: React.Dispatch<React.SetStateAction<string>>
, setQuery: React.Dispatch<React.SetStateAction<string>>
) => {
  return (value: string) => {
    setField(value);
    setQuery(deleteExcessSpace(value).replace(/ /g, "+"));
  };
}