import { useStateInstagramMediaModal } from './context/useStateInstagramMediaModal';

export const useInstagramMediaModalProps = () => {
  const { instagramMedia } = useStateInstagramMediaModal();

  return {
    instagramMedia,
  };
};

export type InstagramMediaModalPresenterProps = ReturnType<
  typeof useInstagramMediaModalProps
>;
