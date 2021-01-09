import { ShowArticleType } from '../../../../../../util/interface/Interface';
import { useChangeShowArticleType } from '../../../../../hooks/userInfo/useChangeShowArticleType';

export const useHandleChangeShowArticleType = () => {
  const changeShowArticleType = useChangeShowArticleType();

  return (event: React.ChangeEvent<HTMLInputElement>) => {
    changeShowArticleType(
      (event.target as HTMLInputElement).value as ShowArticleType
    );
  };
};
