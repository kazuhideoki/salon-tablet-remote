import {
  FooterItemEdittingParams,
  useCreateFooterItem,
} from '../../../../../hooks/footerItems/useCreateFooterItem';
import { useUpdateFooterItem } from '../../../../../hooks/footerItems/useUpdateFooterItem';

export const useHandleSubmit = (
  edittingFooterItemParams: FooterItemEdittingParams,
  isEditting: boolean
) => {
  const createFooterItem = useCreateFooterItem();
  const updateFooterItem = useUpdateFooterItem();

  return (is_published: boolean) => {
    const params = { ...edittingFooterItemParams, is_published };

    if (isEditting) {
      updateFooterItem(params);
    } else {
      createFooterItem(params);
    }
  };
};
