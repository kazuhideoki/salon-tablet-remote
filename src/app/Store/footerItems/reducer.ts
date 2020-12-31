import { reducerLogger } from "../../../lib/dev/reducerLogger";
import { FooterItems } from "../Interface";
import { TFooterItemsAction } from "./actions";
import * as types from "./types";

export type FooterItemsContextState = FooterItems;

export const footerItemsReducer = (
  state: FooterItemsContextState,
  action: TFooterItemsAction
) => {
  let newState: FooterItemsContextState;
  const func = footerItemsReducer;
  switch (action.type) {
    case types.SET:
      newState = action.payload
      break;
  }

  reducerLogger({ state, newState, func, action });
  return newState;
};
