// データベースからフロントに渡ってきたデータを整形する
export const sqlToDate = (arg: string) => {
  
  // safariでのNaNになってしまうバグを防ぐため+を.に変換
  // (参考) https://qiita.com/pearmaster8293/items/b5b0df28147eb049f1ea
  var date0 = arg.replace("+", ".")
  const date = new Date(date0);

  return (
    date.getMonth() + 1 + "月" + date.getDate() + "日"
    // +
    // date.getHours() +
    // "時" +
    // date.getMinutes() +
    // "分"
  );
};
