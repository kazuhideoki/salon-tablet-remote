import { useChangeShowArticleType } from '../../../../../hooks/userInfo/useChangeShowArticleType';
import { T_show_article_type } from '../../../../../store/Interface';

export const useHandleChangeShowArticleType = () => {
  const changeShowArticleType = useChangeShowArticleType();

  return (event: React.ChangeEvent<HTMLInputElement>) => {
    changeShowArticleType(
      (event.target as HTMLInputElement).value as T_show_article_type
    );
  };
};
