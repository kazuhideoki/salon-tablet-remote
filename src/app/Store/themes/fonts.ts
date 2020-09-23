export type TFont =
  | "Roboto"
  | "Helvetica"
  | "futura-pt"
  | '"ヒラギノ角ゴ ProN"';
export const fonts: TFont[] = ["Roboto", "Helvetica", "futura-pt", '"ヒラギノ角ゴ ProN"'];
const font = fonts[0]

// export type TFonts = typeof fonts