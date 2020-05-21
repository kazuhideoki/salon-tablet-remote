import { getExcerpt } from "../app/View/PMain/getExcerpt";
import { renderHook, act } from "@testing-library/react-hooks";
import { onlyText, withImg } from "./sampleArticleContent";



test("getExcerpt", () => {

  //@ts-ignore
  const result = getExcerpt(onlyText, 100)
  //@ts-ignore
  expect(result.length).toBe(100);

  //@ts-ignore
  const result2 = getExcerpt(withImg, 100);
  //@ts-ignore
  expect(result2.length).toBe(100);

  act(() => {
    //@ts-ignore
  });
  
});
