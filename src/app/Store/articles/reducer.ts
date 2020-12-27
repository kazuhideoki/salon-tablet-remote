import { reducerLogger } from "../../Reducer/reducerLogger";
import { TArticles } from "../Types";
import { TArticlesAction } from "./actions";
import * as types from './types'

export const articlesReducer = (state: TArticles, action: TArticlesAction) => {
    let newState: TArticles;
    const func = articlesReducer;
    switch (action.type) {
      case types.SET:
        newState = action.payload
        break;
      }

    reducerLogger({ state, newState, func, action })
    return newState
}