import React from 'react';
//@ts-ignore
import { CharCounter, TCharCounter } from '../app/pureComponents/CharCounter';
export default {
  title: 'viewComponents/CharCounter',
  component: CharCounter,
};

export const OK = () => {
  const props = {
    charCount: 50,
    limitCount: 100,
    isShowCount: true
  }

  return (
    <CharCounter {...props}/>
  )
}

export const OverLimit = () => {
  const props = {
    charCount: 200,
    limitCount: 100,
    isShowCount: true,
  };

  return (
    <CharCounter {...props}/>
  )
}
export const OverLimitAlignRight = () => {
  const props: TCharCounter = {
    charCount: 200,
    limitCount: 100,
    align: "right",
    isShowCount: true,
  };

  return (
    // <div style={{margin: "0 0 0 auto" }}>
      <CharCounter {...props}/>
    // </div>
  )
}
export const OverLimitNoShowCount = () => {
  const props = {
    charCount: 200,
    limitCount: 100,
    isShowCount: false,
  };

  return (
    <CharCounter {...props}/>
  )
}