import React from 'react';
import { initAppState, InitAppState } from './initialValue';
import { AppStateAction } from './actions';
import { appStateReducer, AppStateContextState } from './reducer';

export type AppStateContextProps = {
  appState: AppStateContextState;
  dispatchAppState: React.Dispatch<AppStateAction>;
};

export const AppStateContext = React.createContext({} as AppStateContextProps);

export const AppStateContextProvider: React.FC<InitAppState> = (props) => {
  console.log('propsは ' + props.samplePage);

  const [state, dispatchAppState] = React.useReducer(
    appStateReducer,
    initAppState(props)
  );

  const values: AppStateContextProps = {
    appState: state,
    dispatchAppState,
  };

  console.log('stateは ' + JSON.stringify(state));

  return (
    <AppStateContext.Provider value={values}>
      {props.children}
    </AppStateContext.Provider>
  );
};

const s = {
  isPublicPage: true,
  uaDevice: 'tablet',
  isSetting: false,
  isDrawerOpen: false,
  setModal: 'edit_article',
  isModalOpen: false,
  isShowInstagram: false,
  currentModalContent: {
    modalSize: 'large',
    article: {},
    footerItem: {},
    instagramMedia: {},
  },
  edittingPrams: {
    isEditting: false,
    isModalSizeChanged: false,
    article: {},
    footerItem: {},
    modalSize: 'large',
    onTap: 'modal',
  },
  selectedArticlesTags: [],
  selectedInstagramAccount: { id: 0, username: '' },
  loading: {
    main: false,
    footer: false,
    manageTags: false,
    manageInstagramAccounts: false,
  },
};
