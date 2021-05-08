import { useStateContentModal } from './context/useStateContentModal';

export const useContentModalProps = () => {
  const { article } = useStateContentModal();

  return {
    article,
  };
};

export type ContentModalPresenterProps = ReturnType<
  typeof useContentModalProps
>;
