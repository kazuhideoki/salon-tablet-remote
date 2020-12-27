export type TApiError = { err?: boolean; data?: { message: any } };
// 本当は & じゃないほうがいい？
export type TApiResponse<T> = T & TApiError;