import React from 'react';
export const useStateDeleteAccountFrom = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  return {
    email,
    setEmail,
    password,
    setPassword,
  };
};
