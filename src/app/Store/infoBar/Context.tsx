import React from 'react';
import { InfoBarAction } from './actions';
import { infoBarReducer, InfoBarContextState } from './reducer';

export type Props = { infoBarData: InfoBarContextState };

export type InfoBarContextProps = {
  infoBarData: InfoBarContextState;
  dispatchInfoBar: React.Dispatch<InfoBarAction>;
};
export const InfoBarContext = React.createContext({} as InfoBarContextProps);

export const InfoBarContextProvider: React.FC<Props> = (props) => {
  const [state, dispatchInfoBar] = React.useReducer(
    infoBarReducer,
    props.infoBarData
  );

  const values: InfoBarContextProps = {
    infoBarData: state,
    dispatchInfoBar,
  };

  return (
    <InfoBarContext.Provider value={values}>
      {props.children}
    </InfoBarContext.Provider>
  );
};
