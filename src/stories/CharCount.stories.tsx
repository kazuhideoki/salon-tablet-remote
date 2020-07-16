import React from 'react';
//@ts-ignore
import { CharCount, TCharCount } from '../app/View/viewComponents/CharCount';
export default {
  title: 'CharCount',
  component: CharCount,
};

export const OK = () => {
  const props = {
    charCount: 50,
    limitCount: 100,
    isShowCount: true
  }

  return (
    <CharCount {...props}/>
  )
}

export const OverLimit = () => {
  const props = {
    charCount: 200,
    limitCount: 100,
    isShowCount: true,
  };

  return (
    <CharCount {...props}/>
  )
}
export const OverLimitAlignRight = () => {
  const props: TCharCount = {
    charCount: 200,
    limitCount: 100,
    align: "right",
    isShowCount: true,
  };

  return (
    // <div style={{margin: "0 0 0 auto" }}>
      <CharCount {...props}/>
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
    <CharCount {...props}/>
  )
}