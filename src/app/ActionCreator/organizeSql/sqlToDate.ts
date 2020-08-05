// データベースからフロントに渡ってきたデータを整形する
export const sqlToDate = (arg: string) => {
  
  // safariでのNaNになってしまうバグを防ぐため+を.に変換
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
