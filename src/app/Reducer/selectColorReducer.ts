import { reducerLogger } from "./reducerLogger";
import { T_theme_color } from "../Store/Types";

type TPrimarySecondaryColor = {
  hex: T_theme_color, 
  hex2: any
}

export const selectColorReducer = (
         state: TPrimarySecondaryColor,
         action: {
           type: "SET_COLOR";
           payload: TPrimarySecondaryColor;
         }
       ) => {
         let newState: TPrimarySecondaryColor;
         const func = selectColorReducer;
         switch (action.type) {
           case "SET_COLOR":
             newState = action.payload;
             break;

           default:
             console.log("エラー, selectColorReducer");
             newState = { ...state };
         }
         reducerLogger({ state, newState, func, action });
         return newState;
       };
