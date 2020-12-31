import { server, localhost } from "./loadUrl";

export const apiWrapPost = async (params: any, url: string) => {
  const str = process.browser ? server : localhost;

  const res = await fetch(`${str}/api/${url}`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  const result = await res.json();
  if (result.err) throw result;
  return result;
}