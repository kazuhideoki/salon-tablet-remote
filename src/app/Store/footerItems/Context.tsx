import React from "react";
import { TFooterItemsAction } from "./actions";
import { footerItemsReducer, FooterItemsContextState } from "./reducer";

export type Props = {footerItems: FooterItemsContextState};

export type FooterItemsContextProps = {
  footerItems: FooterItemsContextState;
  dispatchFooterItems: React.Dispatch<TFooterItemsAction>;
};
export const FooterItemsContext = React.createContext({} as FooterItemsContextProps);

export const FooterItemsContextProvider: React.FC<Props> = (props) => {
  const [state, dispatchFooterItems] = React.useReducer(footerItemsReducer, props.footerItems);

  const values: FooterItemsContextProps = {
    footerItems: state,
    dispatchFooterItems,
  };

  return (
    <FooterItemsContext.Provider value={values}>
      {props.children}
    </FooterItemsContext.Provider>
  );
};
