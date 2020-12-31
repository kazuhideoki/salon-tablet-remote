export type TApiError = { err?: boolean; data?: any };
// 本当は & じゃないほうがいい？
export type TApiResponse<T> = T & TApiError;