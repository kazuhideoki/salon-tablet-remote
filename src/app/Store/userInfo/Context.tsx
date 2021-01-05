import React from 'react';
import { TUserInfoAction } from './actions';
import { UserInfoContextState, userInfoReducer } from './reducer';

export type Props = { userInfo: UserInfoContextState };

export type UserInfoContextProps = {
  userInfo: UserInfoContextState;
  dispatchUserInfo: React.Dispatch<TUserInfoAction>;
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
