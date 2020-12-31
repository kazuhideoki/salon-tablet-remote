import * as types from "./types";
import { TTags } from "../Interface";

export const set = (tags: TTags) => ({
         type: types.SET,
         payload: tags,
       });

export type TTagsAction = ReturnType<typeof set>;
