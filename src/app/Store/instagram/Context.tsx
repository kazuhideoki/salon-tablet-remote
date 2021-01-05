import React from 'react';
import {
  initInstagramMediaObject,
  InstagramAccounts,
  InstagramMediaObject,
} from '../../../util/interface/Interface';
import { InstagramAction } from './actions';
import { instagramReducer } from './reducer';

export type Props = { instagramAccounts: InstagramAccounts };

export type InstagramContextProps = {
  instagramAccounts: InstagramAccounts;
  instagramMediaObject: InstagramMediaObject;
  dispatchInstagram: React.Dispatch<InstagramAction>;
};
export const InstagramContext = React.createContext(
  {} as InstagramContextProps
);

export const InstagramContextProvider: React.FC<Props> = (props) => {
  const [state, dispatchInstagram] = React.useReducer(instagramReducer, {
    instagramAccounts: props.instagramAccounts,
    instagramMediaObject: initInstagramMediaObject,
  });

  const values: InstagramContextProps = {
    instagramAccounts: state.instagramAccounts,
    instagramMediaObject: state.instagramMediaObject,
    dispatchInstagram,
  };

  return (
    <InstagramContext.Provider value={values}>
      {props.children}
    </InstagramContext.Provider>
  );
};
