import { server, localhost } from "./loadUrl";

const fetchPost = async (str: string, url:string, params: any) => {
  return await fetch(`${str}/api/${url}`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });
}

const fetchGet = async (str: string, url:string) => {
  return await fetch(`${str}/api/${url}`);
}

const apiWrap= async (url: string, fetch: any, params?: any) => {
  const str = process.browser ? server : localhost;

  const res = await fetch(str, url, params)

  const result = await res.json();
  if (result.err) throw result;
  return result;
}

export const apiWrapPost = (url: string, params: any) => apiWrap(url, fetchPost, params)

export const apiWrapGet = (url: string) => apiWrap(url, fetchGet)