import React from 'react';
import { AuthCircular } from '../util/AuthCircular';
export default {
  title: 'AuthCircular',
  component: AuthCircular,
};

export const Normal = () => {
  return <AuthCircular message="読み込み中" />;
};
