import { PaginationParams } from "../Store/Store";
import { reducerLogger } from "./reducerLogger";

export type MainHome = { type: "MAINHOME" };
export type Latest = { type: "LATEST" };
export type Prev = { type: "PREV" };
export type Next = { type: "NEXT" };
export type Oldest = { type: "OLDEST"; payload: number };
export type Num = { type: "NUM"; payload: number };
export type SetPaginationParams = {
  type: "SET_PAGINATION_PARAMS";
  payload: PaginationParams;
};

export type NoPayload = MainHome | Latest | Prev | Next
export type WithPayload = Oldest | Num | SetPaginationParams;

export type PaginationParamsAction = NoPayload | WithPayload;

export function paginationParamsReducer(
         state: PaginationParams,
         action: PaginationParamsAction 
       ) {
         let newState: PaginationParams;
         const func = paginationParamsReducer;

         switch (action.type) {
           case "MAINHOME":
             newState = {
               ...state,
               page: 1,
             };
             break;
           case "LATEST":
             newState = { ...state, page: 1 };
             break;
           case "PREV":
             const n = Number(state.page);
             newState = { ...state, page: n - 1 };
             break;
           case "NEXT":
             const m = Number(state.page);
             newState = { ...state, page: m + 1 };
             break;
           case "OLDEST":
             newState = { ...state, page: action.payload };
             break;
           case "NUM":
             newState = { ...state, page: action.payload };
             break;
           case "SET_PAGINATION_PARAMS":
            newState = { ...action.payload };
             break;

           default:
             console.log("エラーだよ,paginationParamsReducer");
             newState = { ...state };
         }
         reducerLogger({ state, newState, func, action });
         return newState;
       }


