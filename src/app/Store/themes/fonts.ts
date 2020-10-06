// 英語用のフォント theme_font1
export type TFont1 =
  | ['未設定', '']
  | ["Roboto"]
  | ["Helvetica"]
  | ["futura-pt"]
export const fonts1: TFont1[] = [
         ["未設定", ""],
         ["Roboto"],
         ["Helvetica"],
         ["futura-pt"],
       ];

// ※保存されるのは[0]の方。[1]がある場合は1が名前0になる,


// 日本語用フォント theme_font2
export type TFont2 =
  | ['"M PLUS Rounded 1c"']
  | ['"Kosugi Maru"']
  | ["えんぴつ楷書"]
  | ["まきばフォント"]
  | ["ふい字"]
  // | ["ヒラギノ角ゴシック", '"ヒラギノ角ゴ ProN"']
  | ['"ヒラギノ角ゴ ProN"', "ヒラギノ角ゴシック"]
  // | ["源ノ明朝", '"Noto Serif JP"'];
  | ['"Noto Serif JP"', "源ノ明朝"];
  // | ['"Noto Serif JP"']
export const fonts2: TFont2[] = [
         ['"M PLUS Rounded 1c"'],
         ['"Kosugi Maru"'],
         ["えんぴつ楷書"],
         ["まきばフォント"],
         ["ふい字"],
         ['"ヒラギノ角ゴ ProN"', "ヒラギノ角ゴシック"],
         ['"Noto Serif JP"', "源ノ明朝"],
         //  ['"Noto Serif JP"'],
       ];

export const Deprecated_FontNameToFontFamily = (fontName: TFont1[0] | TFont2[0]) => {

  const target1 = fonts1.filter((value) => {
    return value[0] === fontName
  })
  // [1]がある場合、そちらをreturn
  if (target1.length) {
    const value = target1[0]
    if (typeof value === 'object') {
      return value[0]
    }
    return value
  }

  const target2 = fonts2.filter((value) => {
    return value[0] === fontName
  })
  if (target2.length) {
    const value = target2[0];
    if (typeof value === "object") {
      return value[0];
    }
    return value;
  }
}
