import React from 'react';
import { CharCounter, CharCounterProps } from './CharCounter';
export default {
  title: 'viewComponents/CharCounter',
  component: CharCounter,
};

export const OK = (): JSX.Element => {
  const props = {
    charCount: 50,
    limitCount: 100,
    isShowCount: true,
  };

  return <CharCounter {...props} />;
};

export const OverLimit = (): JSX.Element => {
  const props = {
    charCount: 200,
    limitCount: 100,
    isShowCount: true,
  };

  return <CharCounter {...props} />;
};
export const OverLimitAlignRight = (): JSX.Element => {
  const props: CharCounterProps = {
    charCount: 200,
    limitCount: 100,
    align: 'right',
    isShowCount: true,
  };

  return <CharCounter {...props} />;
};
export const OverLimitNoShowCount = (): JSX.Element => {
  const props = {
    charCount: 200,
    limitCount: 100,
    isShowCount: false,
  };

  return <CharCounter {...props} />;
};
