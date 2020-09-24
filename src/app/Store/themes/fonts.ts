
export type TFont =
  | "Roboto"
  | "Helvetica"
  | "futura-pt"
  | '"M PLUS Rounded 1c"'
  | '"Kosugi Maru"'
  | 'えんぴつ楷書'
  | '"ヒラギノ角ゴ ProN"';
export const fonts: TFont[] = [
         "Roboto",
         "Helvetica",
         "futura-pt",
         '"M PLUS Rounded 1c"', // 300
         '"Kosugi Maru"',
         'えんぴつ楷書',
         '"ヒラギノ角ゴ ProN"',
       ];
const font = fonts[0]

// export type TFonts = typeof fonts