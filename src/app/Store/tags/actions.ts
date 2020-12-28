import * as types from "./types";
import { TTags } from "../Types";

export const set = (tags: TTags) => ({
         type: types.SET,
         payload: tags,
       });

export type TTagsAction = ReturnType<typeof set>;
