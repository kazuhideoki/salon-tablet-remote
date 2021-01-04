import { T_theme_color } from '../app/Store/Interface';
const colorConvert = require('color-convert');

import { THsl } from '../app/View/tablet/Drawer/ManageTheme/view/ManageTheme';

type props = THsl | number[]; //両方のパターンに対応させる？★

export const generateSecondaryColor = (props: props) => {
  let params: THsl;
  let h: number, s: number, l: number;
  if (Array.isArray(props)) {
    params = {
      h: props[0],
      s: props[1],
      l: props[2],
    };

    s = params.s;
    l = params.l + (100 - params.l) / 2;
  } else {
    params = Object.assign(props, {});

    s = params.s * 100;
    l = (params.l + (1 - params.l) / 2) * 100;
  }

  h = params.h + 50;
  if (h > 360) {
    h = h - 360;
  }

  const newParams = [h, s, l];

  return newParams;
};

export const secondaryColor = (theme_color: T_theme_color) => {
  return `#${colorConvert.hsl.hex(
    generateSecondaryColor(colorConvert.hex.hsl(theme_color))
  )}`;
};
