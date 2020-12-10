import { reducerLogger } from "./reducerLogger";
import { TSelectedIcon } from "../Store/EditorContext";

export const selectedIconReducer = (
  state: TSelectedIcon,
  action: {
    type: "SET_ICON";
    payload: TSelectedIcon
  }
) => {
  let newState: TSelectedIcon;
  const func = selectedIconReducer;
  switch (action.type) {
    case "SET_ICON":
      newState = action.payload;
    break;

    default:
      console.log("エラー, selectedIconReducer");
        newState = { ...state };
  }
  reducerLogger({ state, newState, func, action });
  return newState;
};
