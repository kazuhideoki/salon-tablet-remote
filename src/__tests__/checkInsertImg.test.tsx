import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { checkInsertImg } from "../app/Setting/QuillEditor";

const delta = {
  ops: [
    {
      retain: 5,
    },
    {
      insert: {
        image: "data:image/png;base64,QMwCCT.........",
      },
    },
  ],
};

test("checkInsertImg", () => {
  const { result } = renderHook(() => React.useState(false))
  const [hasImg, setHasImg] = result.current
   
  checkInsertImg(delta, setHasImg);

  expect(hasImg).toBe(true);


});
