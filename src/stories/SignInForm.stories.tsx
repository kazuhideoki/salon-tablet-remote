import React from 'react';
//@ts-ignore
import { SignInFormPresenter } from "../pageComponent/SignInForm";
export default {
  title: "pageComponent/SignInForm",
  component: SignInFormPresenter,
};

const props = {
  newEmail: "",
  setNewEmail: null,
  UserEmail: "",
  setUserEmail: null,
  password: "",
  setPassword: null,
};

export const Normal = () => (
         <SignInFormPresenter
         //@ts-ignore
          props={props}
           csrfToken='abc'
           providers={ {facebook: {
             signinUrl: "abc.com",
             id: 0,
             name: 'facebook',

           }}}
         />
       );