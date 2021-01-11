// 英語用のフォント theme_font1
export type Font1 = ['未設定', ''] | ['Roboto'] | ['Helvetica'] | ['futura-pt'];
export const fonts1: Font1[] = [
  ['未設定', ''],
  ['Roboto'],
  ['Helvetica'],
  ['futura-pt'],
];

// ※保存されるのは[0]の方。[1]がある場合は1が名前0になる,

// 日本語用フォント theme_font2
export type Font2 =
  | ['"M PLUS Rounded 1c"']
  | ['"Kosugi Maru"']
  | ['ふい字']
  | ['"ヒラギノ角ゴ ProN"', 'ヒラギノ角ゴシック']
  | ['"Noto Serif JP"', '源ノ明朝'];
export const fonts2: Font2[] = [
  ['"M PLUS Rounded 1c"'],
  ['"Kosugi Maru"'],
  ['ふい字'],
  ['"ヒラギノ角ゴ ProN"', 'ヒラギノ角ゴシック'],
  ['"Noto Serif JP"', '源ノ明朝'],
];
