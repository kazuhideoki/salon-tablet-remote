import React from 'react'
export const useStateDeleteAccountFrom = () => {
    const [emailForConfirm, setEmailForConfirm] = React.useState("");
  return {
    emailForConfirm,
    setEmailForConfirm,
  };
}