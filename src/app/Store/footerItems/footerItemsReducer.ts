import { FooterItem, FooterItems } from "../Store";
import { reducerLogger } from "../reducerLogger";

export type FooterItemsAction =
  | { type: "GET"; payload: FooterItems }
  | { type: "CREATE_FOOTER_ITEM"; payload: FooterItem }
  | { type: "UPDATE_FOOTER_ITEM"; payload: FooterItem }
  | { type: "DELETE_FOOTER_ITEM"; payload: number }
  | { type: "SWITCH_ORDER", payload: unknown}

export function footerItemsReducer(state: FooterItems, action: FooterItemsAction) {
  let newState: FooterItems;
  const func = footerItemsReducer;
  switch (action.type) {
    case "GET":
      newState = action.payload;
      break;
    case "CREATE_FOOTER_ITEM":
      const arr = [...state, action.payload];
      newState = arr.concat();
      break;
    case "UPDATE_FOOTER_ITEM":
      newState = state.map((value, index) => {
        if (value.footer_item_id === action.payload.footer_item_id) {
          return action.payload;
        } else {
          return value;
        }
      });
      break;
    case "DELETE_FOOTER_ITEM":
      newState = state.filter((value, index) => {
        return value.footer_item_id !== action.payload;
      });
      break;
    // ↓要検討
    case "SWITCH_ORDER":
      newState = state
      break;

    default:
      console.log("エラーだよ, footerItemsReducer");
      newState = { ...state };
  }
  reducerLogger({ state, newState, func, action });
  return newState;
}
