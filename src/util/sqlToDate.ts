// データベースからフロントに渡ってきたデータを整形する
export const sqlToDate = (arg: string): string => {
  // safariでのNaNになってしまうバグを防ぐため+を.に変換
  // (参考) https://qiita.com/pearmaster8293/items/b5b0df28147eb049f1ea
  const date = new Date(arg.replace('+', '.'));

  return date.getMonth() + 1 + '月' + date.getDate() + '日';
};
