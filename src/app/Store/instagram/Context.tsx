import React from 'react';
import {
  initInstagramMedias,
  TInstagramAccounts,
  TInstagramMedias,
} from '../../../util/interface/Interface';
import { TInstagramAction } from './actions';
import { instagramReducer, InstagramContextState } from './reducer';

export type Props = { instagramAccounts: TInstagramAccounts };

export type InstagramContextProps = {
  instagramAccounts: TInstagramAccounts;
  instagramMedias: TInstagramMedias;
  dispatchInstagram: React.Dispatch<TInstagramAction>;
};
export const InstagramContext = React.createContext(
  {} as InstagramContextProps
);

export const InstagramContextProvider: React.FC<Props> = (props) => {
  const [state, dispatchInstagram] = React.useReducer(instagramReducer, {
    instagramAccounts: props.instagramAccounts,
    instagramMedias: initInstagramMedias,
  });

  const values: InstagramContextProps = {
    instagramAccounts: state.instagramAccounts,
    instagramMedias: state.instagramMedias,
    dispatchInstagram,
  };

  return (
    <InstagramContext.Provider value={values}>
      {props.children}
    </InstagramContext.Provider>
  );
};
