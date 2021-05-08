import { useStateFooterItemModal } from './context/useStateFooterItemModal';

export const useFooterItemModalProps = () => {
  const { footerItem } = useStateFooterItemModal();

  return {
    footerItem,
  };
};

export type FooterItemModalPresenterProps = ReturnType<
  typeof useFooterItemModalProps
>;
