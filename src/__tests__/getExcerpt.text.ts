import { getExcerpt } from "../app/View/getExcerpt";
import { renderHook, act } from "@testing-library/react-hooks";
import { onlyText, withImg } from "./sampleArticleContent";

test("getExcerpt", () => {
  // const { result } = renderHook(() => React.useState(false));

  expect(false).toBe(false);

  // imageがある
  act(() => {
    //@ts-ignore
    checkImg(delta, result.current[1], removeImg);
  });
  
});
