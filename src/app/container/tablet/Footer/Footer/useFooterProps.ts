import { useIsMobile } from '../../../../../util/useIsMobile';
import { useDeleteFooterItem } from '../../../../hooks/footerItems/useDeleteFooterItem';
import { useStateFooter } from './context/useStateFooter';
import { useHandleOnUpdateFooterItem } from './context/useHandleOnUpdateFooterItem';
import { useHandleLoadingFooter } from './context/useHandleLoadingFooter';
import { useOpenFooterItemModal } from './context/useOpenFooterItemModal';
import { useSwitchOrder } from '../../../../hooks/footerItems/useSwitchOrder';

export const useFooterProps = () => {
  const { footerItems, loading, isSetting } = useStateFooter();

  const isMobile = useIsMobile();

  const handleOnUpDateFooterIcon = useHandleOnUpdateFooterItem();

  const handleLoadingFooter = useHandleLoadingFooter();

  const openFooterItemModal = useOpenFooterItemModal();

  const deleteFooterItem = useDeleteFooterItem();

  const switchOrder = useSwitchOrder();

  return {
    isSetting,
    openFooterItemModal,
    footerItems,
    handleOnUpDateFooterIcon,
    deleteFooterItem,
    isMobile,
    loading: loading.footer,
    handleLoadingFooter,
    switchOrder,
  };
};

export type FooterPresenterProps = ReturnType<typeof useFooterProps>;
