import { THsl } from "../../app/View/Drawer/ManageTheme/ManageTheme";

type props = THsl | number[] //両方のパターンに対応させる？★

export const generateSecondaryColor = (props: props) => {
  let params
  let h:number, s: number, l: number
  let newParams: number[]
  if (Array.isArray(props)) {
    params = {
      h: props[0],
      s: props[1],
      l: props[2],
    }

    // s = params.s * 4 / 5
    s = params.s
    // l = params.l + (1 - params.l) / 2;
    l = params.l + (100 - params.l) / 2;
    
  } else {
    params = Object.assign(props, {})
  
    // s = params.s * 4 / 5 * 100
    s = params.s * 100
    l = (params.l + (1 - params.l) / 2) * 100
  }

  h = params.h + 50;
  if (h > 360) {
    h = h - 360;
  }
  
    
  newParams = [h,s,l]

  // console.log('★もとの値hslは★ ' + JSON.stringify(props));
  // console.log('★生成後のparamは★ ' + JSON.stringify(newParams));

  return newParams

}