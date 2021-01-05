import {
  FooterItem,
  Article,
  TInstagramMedia,
  TSetModal,
  TUaDeviceType,
  T_instagram_id,
  T_instagram_username,
  ModalSize,
  Ontap,
} from '../../../util/interface/Interface';

export type TInitAppState = {
  isPublicPage: boolean;
  device: TUaDeviceType;
};

export const initAppState = (data: TInitAppState) => ({
  isPublicPage: data.isPublicPage,
  uaDevice: data.device,
  isSetting: !data.isPublicPage,
  isDrawerOpen: !data.isPublicPage,
  setModal: 'edit_article' as TSetModal,
  isModalOpen: false,
  isShowInstagram: false,
  // modal表示するコンテン情報を格納
  currentModalContent: {
    modalSize: 'large' as ModalSize,
    article: {} as Article,
    footerItem: {} as FooterItem,
    instagramMedia: {} as TInstagramMedia,
  },

  edittingPrams: {
    isEditting: false,
    isModalSizeChanged: false,
    article: {} as Article,
    footerItem: {} as FooterItem,
    // 編集中のmodalSizeとonTapはこちらを参照↓、初期値はfooterItemから参照↑
    modalSize: 'large' as ModalSize,
    onTap: 'modal' as Ontap,
  },
  // タグ選択のSelectTagsで選択されたタグデータを格納、これをもとにmainに記事を表示
  selectedArticlesTags: [] as number[],
  selectedInstagramAccount: {
    id: 0 as T_instagram_id,
    username: '' as T_instagram_username,
  },
  loading: {
    main: false,
    footer: false,
    manageTags: false,
    manageInstagramAccounts: false,
  },
});
