import React from 'react'
import { Typography, PropTypes } from '@material-ui/core';

export type TCharCount = {
  charCount: number
  limitCount: number
  align?: PropTypes.Alignment
  isShowCount?: boolean
}

export const CharCount:React.FC<TCharCount> = (props) => {
  return (
    //@ts-ignore
    <div>
      {props.charCount <= props.limitCount || (
        <Typography
          variant="subtitle1"
          align={props.align}
          color={props.charCount <= props.limitCount ? "textPrimary" : "error"}
        >
          {`文字数をオーバーしています、${props.limitCount}文字以下にして下さい`}
        </Typography>
      )}
      {props.isShowCount && (
        <Typography align={props.align}>
          <Typography
            variant="subtitle1"
            component="span"
            // align={props.align}
            color={
              props.charCount <= props.limitCount ? "textPrimary" : "error"
            }
          >
            {props.charCount}
          </Typography>
          <Typography
            variant="subtitle1"
            component="span"
            // align={props.align}
            color="textPrimary"
          >
            /{props.limitCount}
          </Typography>
        </Typography>
      )}
    </div>
  );
}
