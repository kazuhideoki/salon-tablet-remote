import React from "react";
import { TInstagramAccountsAction } from "./actions";
import { instagramAccountsReducer, InstagramAccountsContextState } from "./reducer";

export type Props = {instagramAccounts: InstagramAccountsContextState};

export type InstagramAccountsContextProps = {
  instagramAccounts: InstagramAccountsContextState;
  dispatchInstagramAccounts: React.Dispatch<TInstagramAccountsAction>;
};
export const InstagramAccountsContext = React.createContext({} as InstagramAccountsContextProps);

export const InstagramAccountsContextProvider: React.FC<Props> = (props) => {
  const [state, dispatchInstagramAccounts] = React.useReducer(instagramAccountsReducer, props.instagramAccounts);

  const values: InstagramAccountsContextProps = {
    instagramAccounts: state,
    dispatchInstagramAccounts,
  };

  return (
    <InstagramAccountsContext.Provider value={values}>
      {props.children}
    </InstagramAccountsContext.Provider>
  );
};
