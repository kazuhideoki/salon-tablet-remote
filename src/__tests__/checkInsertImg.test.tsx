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

  // expect(hasImg).toBe(false);
  expect(result.current[0]).toBe(false);
   
  act(() => {
    checkInsertImg(delta, result.current[1]);
    // setHasImg(true)
  })

  // expect(hasImg).toBe(true);
  expect(result.current[0]).toBe(true);

});
