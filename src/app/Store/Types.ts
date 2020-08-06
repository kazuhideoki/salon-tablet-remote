import { IndexPropsData } from "../../pages";

export type T_user_id = number;
export type T_user_name = string;
export type T_shop_name = string;
export type T_user_email = string;
export type T_selected_theme = string;
export type T_created_at_user = string;
export type T_updated_at_user = string;

export type TUserInfo = {
  user_id: T_user_id;
  user_name: T_user_name | null;
  shop_name: T_shop_name | null;
  user_email: T_user_email;
  selected_theme: T_selected_theme;
  is_first_sign_in: boolean;
  bcrypt_password?: string;
  created_at: T_created_at_user;
  updated_at: T_updated_at_user | null;
  isSetPassword: boolean;
};

const initPagination = {
  page: 0,
  pageCount: 0,
  pageSize: 0,
  rowCount: 0,
};
export type PaginationParams = typeof initPagination;

export type T_is_sample = boolean;

// ●●●●●● テーブル `articles`
export type T_article_id = number;
// ※tag_idsはDBから取り出した直後、値がない場合はnullのこともある （tagIdsParseの前）
export type T_tag_ids = number[];
export type T_is_published_articles = boolean;
export type T_created_at = string;
export type T_updated_at = string;
export type T_title = string;
export type T_article_content = string;
export type T_article_excerpt = string;
export type T_article_img = string;

export type ArticleWithoutArticleId = {
  user_id: T_user_id;
  tag_ids: T_tag_ids;
  is_published: T_is_published_articles;
  created_at: T_created_at;
  updated_at: T_updated_at;
  title: T_title;
  article_content: T_article_content;
  article_excerpt: T_article_excerpt;
  article_img: T_article_img;
  // 初回サインイン時のサンプルデータのコピー元をtrueに
  is_sample_data: T_is_sample;
};
export type TArticle = { article_id: T_article_id } & ArticleWithoutArticleId;
export type TArticles = TArticle[];

// ●●●●●● テーブル `footer_items`
export type T_footer_item_id = number;
export type T_is_published_footer_items = boolean;
export type T_created_at_footer_items = string;
export type T_updated_at_footer_items = string | null;
export type T_icon_name = string | null;
export type T_displayed_icon_name = string | null;
export type T_on_tap = string;
export type T_item_content = string | null;
export type T_item_excerpt = string | null;
export type T_link_url = string | null;
export type T_app_link_url = string | null;
export type T_modal_size = "fullScreen" | "large" | "medium" | "small";
export type T_order = number;

export type FooterItemWithoutId = {
  user_id: T_user_id;
  is_published: T_is_published_footer_items;
  created_at: T_created_at_footer_items;
  updated_at: T_updated_at_footer_items | null;
  icon_name: T_icon_name | null;
  displayed_icon_name: T_displayed_icon_name | null;
  on_tap: T_on_tap;
  item_content: T_item_content | null;
  item_excerpt: T_item_excerpt | null;
  link_url: T_link_url | null;
  app_link_url: T_app_link_url | null;
  modal_size: T_modal_size;
  order: T_order;
  // 初回サインイン時のサンプルデータのコピー元をtrueに
  is_sample_data: T_is_sample;
};
export type FooterItem = {
  footer_item_id: T_footer_item_id;
} & FooterItemWithoutId;
export type FooterItems = FooterItem[];

// ●●●●●● テーブル `tags`

export type T_tag_id = number;
export type T_tag_name = string;
export type T_created_at_tag = string;
export type T_updated_at_tag = string | null;

export type TTag = {
  tag_id: T_tag_id;
  user_id: T_user_id;
  tag_name: T_tag_name;
  created_at: T_created_at_tag;
  updated_at: T_updated_at_tag;
};

export type TTags = TTag[];

export type T_instagram_id = number;
export type T_instagram_username = string;
export type T_profile_img = string;
export type T_expires = string;
export type T_created_at_instagram_account = string;
export type T_updated_at_instagram_account = string;

export type TInstagramAccount = {
  instagram_id: T_instagram_id;
  username: T_instagram_username;

  profile_img: T_profile_img;
  expires: T_expires;
  user_id: T_user_id;
  created_at: T_created_at_instagram_account;
  updated_at: T_updated_at_instagram_account;
};
export type TInstagramAccounts = TInstagramAccount[];

export type T_instagram_media_id = number;
export type T_media_caption = string;
export type T_media_type = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
export type T_media_url = string;
export type T_media_permalink = string;
export type T_media_thumbnail_url = string;
export type T_media_timestamp = string;

export type TInstagramMedia = {
  id: T_instagram_media_id;
  caption: T_media_caption;
  media_type: T_media_type;
  media_url: T_media_url;
  permalink: T_media_permalink;
  thumbnail_url: T_media_thumbnail_url;
  timestamp: T_media_timestamp;
  username: T_instagram_username;

};

export type TInstagramMedias = {
  data: TInstagramMedia[];
  paging: {
    
    cursors: {
      before: string;
      after: string;
    };
    // ページ送りがある場合 nextやpreviousが入る。(https〜のget)
    next: string;
    previous: string;
  };
};

export type TSetModal =
  | "content_modal"
  | "footer_item_modal"
  | "instagram_media_modal"
  | "select_tags"
  | "select_instagram"
  | "edit_article"
  | "edit_footer_item"
  | "edit_tags"
  | "manage_instagram"
  | "setting_theme"
  | "setting_user_info"
  | "feedback_form"
  | "delete_account_form"; 

export const initAppState = (data: IndexPropsData) => ({
    isSetting: true,
    isDrawerOpen: true,
    setModal: "edit_article" as TSetModal,
    isModalOpen: false,
    isShowInstagram: false,
    // modal表示するコンテン情報を格納
    currentModalContent: {
      modalSize: "large" as T_modal_size,
      article: {} as TArticle,
      footerItem: {} as FooterItem,
      instagramMedia: {} as TInstagramMedia,
    },

    edittingPrams: {
      isEditting: false,
      article: {} as TArticle,
      footerItem: {} as FooterItem,
      modalSize: "large" as T_modal_size,
    },
    // タグ選択のSelectTagsで選択されたタグデータを格納、これをもとにmainに記事を表示
    selectedArticlesTags: [] as number[],
    selectedInstagramAccount: {
      id: 0 as T_instagram_id,
      username: "" as T_instagram_username,
    },
    loading: {
      mainArticles: false,
    },

    userInfo: data.session as TUserInfo,
    articles: data.articles as TArticles,
    paginationParams: data.pagination,
    footerItems: data.footerItems as FooterItems,
    tags: data.tags as TTags,
    instagramAccounts: data.instagramAccounts as TInstagramAccounts,
    instagramMedias: { data: [] } as TInstagramMedias,
  })

export type TAppState = ReturnType<typeof initAppState> ;

