import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { checkInsertImg } from "../app/Setting/QuillEditor";

const delta = {
  ops: [
    {
      attributes: {
        color: "#ffebcc",
        bold: true,
      },
      insert: "d",
    },
    {
      insert: "\n\n",
    },
    {
      insert: {
        image:
          "data:image/jpeg;bas/9k=",
      },
    },
    {
      insert: "\n",
    },
    {
      attributes: {
        color: "#ffebcc",
      },
      insert: "dfsaa",
    },
    {
      insert: "\n",
    },
  ],
};
const delta2 = {ops: [
    {
      retain: 5,
    },
    {
      insert: {
        notImg: 'no ima',
      },
    },
  ],
}
test("checkInsertImg", () => {
  const { result } = renderHook(() => React.useState(false))

  expect(result.current[0]).toBe(false);
   
  // imageがある
  act(() => {
    checkInsertImg(delta, result.current[1]);
  })
  expect(result.current[0]).toBe(true);

  // imageがない
  act(() => {
    checkInsertImg(delta2, result.current[1]);
  });
  expect(result.current[0]).toBe(false);

});
