import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { reducerLogger } from '../../../../../../util/dev/reducerLogger';

type State = [
  OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>,
  string
];

export const selectedIconReducer = (
  state: State,
  action: {
    type: 'SET_ICON';
    payload: State;
  }
): State => {
  let newState: State;
  const func = selectedIconReducer;
  switch (action.type) {
    case 'SET_ICON':
      newState = action.payload;
      break;

    default:
      console.log('エラー, selectedIconReducer');
      newState = { ...state };
  }
  reducerLogger({ state, newState, func, action });
  return newState;
};
