import {
  FooterItem,
  FooterItems,
  T_footer_item_id,
  T_order,
} from "../Store/Types";
import { reducerLogger } from "./reducerLogger";

export type FooterItemsAction =
  | { type: "GET_FOOTER_ITEMS"; payload: FooterItems }
  | { type: "DELETE_FOOTER_ITEM"; payload: {footer_item_id: T_footer_item_id, order: T_order} }

export function footerItemsReducer(state: FooterItems, action: FooterItemsAction) {
  let newState: FooterItems;
  const func = footerItemsReducer;
  switch (action.type) {
    case "GET_FOOTER_ITEMS":
      newState = action.payload;
      break;
    case "DELETE_FOOTER_ITEM":
      const deletedState = state.filter((value, index) => {
        // 削除するアイテムは含めない
        return value.footer_item_id !== action.payload.footer_item_id;
      });
      newState = deletedState.map((value, index) => {
        // 削除されたアイテムの左側のorderはそのまま出力
        if (value.order < action.payload.order) {
          return value;
          // 削除されたアイテムの右側はorderの調整のためそれぞれ-1する
        } else if (value.order > action.payload.order) {
          value.order -= 1;
          return value;
        }
      });
      break;

    default:
      console.log("エラーだよ, footerItemsReducer");
      newState = { ...state };
  }
  reducerLogger({ state, newState, func, action });
  return newState;
}
