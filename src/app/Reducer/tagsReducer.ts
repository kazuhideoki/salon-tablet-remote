import { reducerLogger } from "./reducerLogger";
import { TTags } from "../Store/Store";

export type TagsAction = {type: "SET_TAGS", payload: TTags}


export function tagsReducer(state: TTags, action: TagsAction) {
  let newState: TTags;
  const func = tagsReducer;
  switch (action.type) {
    case "SET_TAGS":
      newState = action.payload
      break;

    default:
      console.log("エラーだよ,tagsReducer");
      newState = { ...state };
  }
  reducerLogger({ state, newState, func, action });
  return newState;
}
