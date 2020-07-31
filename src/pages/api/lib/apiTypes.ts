export type TApiError = { err: boolean; data: { message: string } };
export type TApiResponse<T> = T & TApiError;