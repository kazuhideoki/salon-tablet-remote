import { TStoreProps } from "./Store";
import { TFont1, TFont2 } from "./themes/fonts";

export type T_user_id = number;
export type T_user_name = string;
export type T_shop_name = string;
export type T_user_email = string;
export type T_show_article_type = 'scroll' | 'grid6'

export type T_selected_theme = 'default' | 'white' | 'natural';
export type T_theme_color = string;
export type T_theme_font = TFont1[0] | TFont2[0];
export type T_footer_icon_size = "medium" | "small";

export type T_is_generate_public_page = boolean;
export type T_public_page_slug = string;
// export type T_public_page_url = string;
export type T_is_admin = boolean;
export type T_created_at_user = string;
export type T_updated_at_user = string;

export type TUserInfo = {
  user_id: T_user_id;
  user_name: T_user_name | null;
  shop_name: T_shop_name | null;
  user_email: T_user_email;
  show_article_type: T_show_article_type;
  is_first_sign_in: boolean;

  selected_theme: T_selected_theme;
  theme_color: T_theme_color;
  theme_font1: T_theme_font;
  theme_font2: T_theme_font;
  theme_font_heading: T_theme_font;
  footer_icon_size: T_footer_icon_size;

  is_generate_public_page: T_is_generate_public_page;
  public_page_slug: T_public_page_slug;

  is_admin: T_is_admin;
  created_at: T_created_at_user;
  updated_at: T_updated_at_user | null;
} | null;

const initPagination = {
  page: 0,
  pageCount: 0,
  pageSize: 0,
  rowCount: 0,
};
export type TPaginationParams = typeof initPagination;

export type T_data_type_footer_item = 'default_data' | 'sample_data'
export type T_data_type_article = T_data_type_footer_item | 'web_article'

// ●●●●●● テーブル `articles`
export type T_article_id = number;
// ※tag_idsはDBから取り出した直後、値がない場合はnullのこともある （tagIdsToNumberArrayの前）
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
  data_type: T_data_type_article;
};
export type TArticle = { article_id: T_article_id } & ArticleWithoutArticleId;
export type TArticles = TArticle[];

export type TAllArticles = {
  article_id: T_article_id
  title: T_title
}[]

// ●●●●●● テーブル `footer_items`
export type T_footer_item_id = number;
export type T_is_published_footer_items = boolean;
export type T_created_at_footer_items = string;
export type T_updated_at_footer_items = string | null;
export type T_icon_name = string | null;
export type T_displayed_icon_name = string | null;
export type T_on_tap = "modal" | "link" | "appLink" | 'google';
// export type T_on_sidebar = boolean
export type T_item_content = string | null;
export type T_item_excerpt = string | null;
export type T_link_url = string | null;
export type T_app_link_url = string | null;
export type T_modal_size = "fullScreen" | "large" | "medium" | "small" | 'upperSide';
export type T_order = number;
export type T_order_sidebar = number;

export type FooterItemWithoutId = {
  user_id: T_user_id;
  is_published: T_is_published_footer_items;
  created_at: T_created_at_footer_items;
  updated_at: T_updated_at_footer_items | null;
  icon_name: T_icon_name | null;
  displayed_icon_name: T_displayed_icon_name | null;
  on_tap: T_on_tap;
  // on_sidebar: T_on_sidebar
  item_content: T_item_content | null;
  item_excerpt: T_item_excerpt | null;
  link_url: T_link_url | null;
  app_link_url: T_app_link_url | null;
  modal_size: T_modal_size;
  order: T_order;
  order_sidebar: T_order_sidebar
  // 初回サインイン時のサンプルデータのコピー元をtrueに
  data_type: T_data_type_footer_item;
};
export type FooterItem = {
  footer_item_id: T_footer_item_id;
} & FooterItemWithoutId;
export type FooterItems = FooterItem[];

// ●●●●●● テーブル `info_bar`

export type T_info_bar_id = number
export type T_info_bar_type = 'shop_name' | 'scrolling_sentence' | 'article'
export type T_scrolling_sentence = string
export type T_scrolling_animation_duration = number
export type T_selected_article_id = T_article_id;

export type TInfoBarWithoutId = {
  user_id: T_user_id;
  info_bar_type: T_info_bar_type;
  scrolling_sentence: T_scrolling_sentence;
  scrolling_animation_duration: T_scrolling_animation_duration;
  selected_article_id: T_selected_article_id;
};

export type TInfoBar = TInfoBarWithoutId & { info_bar_id: T_info_bar_id, }
export type TInfoBarData = {
  infoBar: TInfoBar;
  // scrolling_animation_duration: number;
  targetArticle: TArticle;
};

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
export type T_is_reconnect_needed = boolean

export type TInstagramAccount = {
  instagram_id: T_instagram_id;
  username: T_instagram_username;
  profile_img: T_profile_img;
  expires: T_expires;
  user_id: T_user_id;
  created_at: T_created_at_instagram_account;
  updated_at: T_updated_at_instagram_account;
  is_reconnect_needed: T_is_reconnect_needed;
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

export const initInstagramMedias = {
  data: [] as TInstagramMedia[],
  paging: {
    cursors: {
      before: "",
      after: "",
    },
    next: "" ,
    previous: "",
  },
} as TInstagramMedias

export type TInstagramMedias = {
  data: TInstagramMedia[];
  paging: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
    previous?: string;
  };
};

export type TSetModal =
  | "content_modal"
  | "footer_item_modal"
  | "google_search"
  | "instagram_media_modal"
  | "select_tags"
  | "select_instagram"
  | "edit_info_bar"
  | "edit_article"
  | "edit_footer_item"
  | "edit_tags"
  | "manage_instagram"
  | "setting_theme"
  | "setting_user_info"
  | "feedback_form"
  | "delete_account_form"
  | 'popup_not_email_verified'

export type T_selected_device = 'responsive' | 'mobile' | 'tablet'
export const initAppState = (data: TStoreProps) => ({
         isPublicPage: data.isPublicPage,
         uaDevice: data.device,
        //  ※DBには selected_deviceは入ってない, public_pageからの値。reducerは作ってある
         selectedDevice: data.samplePage || 'responsive' as T_selected_device,
         isSetting: !data.isPublicPage,
         isDrawerOpen: !data.isPublicPage,
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
           isModalSizeChanged: false,
           article: {} as TArticle,
           footerItem: {} as FooterItem,
           // 編集中のmodalSizeとonTapはこちらを参照↓、初期値はfooterItemから参照↑
           modalSize: "large" as T_modal_size,
           onTap: "modal" as T_on_tap,
         },
         // タグ選択のSelectTagsで選択されたタグデータを格納、これをもとにmainに記事を表示
         selectedArticlesTags: [] as number[],
         selectedInstagramAccount: {
           id: 0 as T_instagram_id,
           username: "" as T_instagram_username,
         },
         loading: {
           main: false,
           footer: false,
           manageTags: false,
           manageInstagramAccounts: false,
         },

         userInfo: data.userInfo,
        //  articles: data.articles,
        //  allArticles: data.allArticles,
        //  paginationParams: data.pagination,
         footerItems: data.footerItems,
         infoBarData: data.infoBarData,
         tags: data.tags,
         instagramAccounts: data.instagramAccounts,
         instagramMedias: initInstagramMedias,
       });

export type TAppState = ReturnType<typeof initAppState> ;

