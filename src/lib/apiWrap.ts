import { server, localhost } from './loadUrl';

const fetchPost = async (str: string, url: string, params: any) => {
  return await fetch(`${str}/api/${url}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(params),
  });
};

const fetchGet = async (str: string, url: string) => {
  return await fetch(`${str}/api/${url}`);
};

const apiWrap = async (
  fetch: any,
  url: string,
  params?: any,
  returning = true
) => {
  const str = process.browser ? server : localhost;

  try {
    const res = await fetch(str, url, params);
    if (returning) {
      const result = await res.json();
      if (result.err) throw result;
      return result;
    }
  } catch (err) {
    throw `${url}: ${err}`;
  }
};

export const apiWrapPost = (url: string, params: any, returning = true) =>
  apiWrap(fetchPost, url, params, returning);

export const apiWrapGet = (url: string, returning = true) =>
  apiWrap(fetchGet, url, null, returning);
