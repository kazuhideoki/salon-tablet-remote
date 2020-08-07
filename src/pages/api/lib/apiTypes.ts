export type TApiError = { err: boolean; data: { message: string } };
// 本当は & じゃないほうがいい？
export type TApiResponse<T> = T & TApiError;