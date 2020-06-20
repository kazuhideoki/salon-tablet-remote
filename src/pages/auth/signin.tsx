import React from 'react'
import { providers, signin, csrfToken } from "next-auth/client";
import { server } from '../../config'

export default ({ providers, csrfToken }) => {
  return (
    <>
      {/* {Object.values(providers).map(provider => {

        if (provider === undefined) {
          console.log("なにかのproviderがないよ");
          
          return null         
        }
        
        return (
        //@ts-ignore
        <p key={provider.name}>
          <a href={
            //@ts-ignore
            provider.signinUrl
            } onClick={(e) => e.preventDefault()}>
            <button onClick={() => signin(provider)}>Sign in with {
              //@ts-ignore
            provider.name
            }</button>
          </a>page/auth/signin.tsxだよ
        </p>
        )
        
      })} */}
      <form
        method="post"
        action="/api/auth/signin/email"
        onSubmit={(e) => {
          e.preventDefault();
          //@ts-ignore
          signin("email", { email: document.getElementById("email").value });
          // signin("email", { email: document.getElementById("email").nodeValue });
        }}
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Email address
          <input type="text" id="email" name="email" />
        </label>
        <button type="submit">Sign in with Email</button>
      </form>
      <form method="post" action={`${server}/api/auth/callback/credentials`}>
        <input name="email" type="text" defaultValue="" />
        <input name="password" type="password" defaultValue="" />
        <button type="submit">Sign in</button>
      </form>
    </>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      providers: await providers(context),
      csrfToken: await csrfToken(context)
    }
  }
}