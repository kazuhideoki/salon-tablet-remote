import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { reducerLogger } from "../../../../../../../lib/dev/reducerLogger";

type Type = [OverridableComponent<SvgIconTypeMap<{}, "svg">>, string]

export const selectedIconReducer = (
         state: Type,
         action: {
           type: "SET_ICON";
           payload: Type;
         }
       ) => {
         let newState: Type;
         const func = selectedIconReducer;
         switch (action.type) {
           case "SET_ICON":
             newState = action.payload;
             break;

           default:
             console.log("エラー, selectedIconReducer");
             newState = { ...state };
         }
         reducerLogger({ state, newState, func, action });
         return newState;
       };
