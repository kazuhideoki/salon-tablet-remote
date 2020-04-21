import { PaginationParams } from "./Store";
import { reducerLogger } from "./reducerLogger";

export type MainHome = { type: "MAINHOME" };
export type Latest = { type: "LATEST" };
export type Prev = { type: "PREV" };
export type Next = { type: "NEXT" };
export type Oldest = { type: "OLDEST"; payload: number };
export type Num = { type: "NUM"; payload: number };

export type NoPayload = MainHome | Latest | Prev | Next
export type WithPayload = Oldest | Num 

export type PaginationParamsAction = NoPayload | WithPayload;

export function paginationParamsReducer(
         state: PaginationParams,
         action: PaginationParamsAction
       ) {
         let newState: PaginationParams;
         const func = paginationParamsReducer;

         switch (action.type) {
           case "MAINHOME":
             // 言語に沿ってcategoriesを設定
             newState = {
               ...state,
               currentPage: 1,
             };
             break;
           case "LATEST":
             newState = { ...state, currentPage: 1 };
             break;
           case "PREV":
             const n = Number(state.currentPage);
             newState = { ...state, currentPage: n - 1 };
             break;
           case "NEXT":
             const m = Number(state.currentPage);
             newState = { ...state, currentPage: m + 1 };
             break;
           case "OLDEST":
             newState = { ...state, currentPage: action.payload };
             break;
           case "NUM":
             newState = { ...state, currentPage: action.payload };
             break;

           default:
             console.log("エラーだよ,paginationParamsReducer");
             newState = { ...state };
         }
         reducerLogger({ state, newState, func, action });
         return newState;
       }
