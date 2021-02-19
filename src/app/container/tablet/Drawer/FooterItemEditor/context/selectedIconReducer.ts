import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { reducerLogger } from '../../../../../../util/dev/reducerLogger';

export type SelectedIcon = [
  OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>,
  string
];

export const selectedIconReducer = (
  state: SelectedIcon,
  action: {
    type: 'SET_ICON';
    payload: SelectedIcon;
  }
): SelectedIcon => {
  let newState: SelectedIcon;
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
