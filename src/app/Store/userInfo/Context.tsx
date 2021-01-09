import React from 'react';
import { UserInfoAction } from './actions';
import { UserInfoContextState, userInfoReducer } from './reducer';

export type Props = { userInfo: UserInfoContextState };

export type UserInfoContextProps = {
  userInfo: UserInfoContextState;
  dispatchUserInfo: React.Dispatch<UserInfoAction>;
};

export const UserInfoContext = React.createContext({} as UserInfoContextProps);

export const UserInfoContextProvider: React.FC<Props> = (props) => {
  const [state, dispatchUserInfo] = React.useReducer(
    userInfoReducer,
    props.userInfo
  );

  const values: UserInfoContextProps = {
    userInfo: state,
    dispatchUserInfo,
  };

  return (
    <UserInfoContext.Provider value={values}>
      {props.children}
    </UserInfoContext.Provider>
  );
};
