export const useClearHistory = () => {
  return () => {
    const deleting = confirm("Googleの検索履歴を削除してもよろしいですか？");
    if (deleting) {
      localStorage.setItem("googleSearchHistory", "");
      alert("履歴を削除しました。");
    }
  };
}