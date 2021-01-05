import { TFont1, TFont2 } from '../../app/store/theme/lib/fonts';

export type ShowArticleType = 'scroll' | 'grid6';
export type SelectedTheme = 'default' | 'white' | 'natural';
export type ThemeFont = TFont1[0] | TFont2[0];
export type FooterIconSize = 'medium' | 'small';

export type UserInfo = {
  user_id: number;
  user_name: string;
  shop_name: string;
  user_email: string;
  show_article_type: ShowArticleType;
  is_first_sign_in: boolean;

  selected_theme: SelectedTheme;
  theme_color: string;
  theme_font1: ThemeFont;
  theme_font2: ThemeFont;
  theme_font_heading: ThemeFont;
  footer_icon_size: FooterIconSize;
  is_generate_public_page: boolean;
  public_page_slug: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string | null;
};

const initPagination = {
  page: 0,
  pageCount: 0,
  pageSize: 0,
  rowCount: 0,
};
export type PaginationParams = typeof initPagination;

export type DataTypeFooterItem = 'default_data' | 'sample_data';
export type DataTypeArticle = DataTypeFooterItem | 'web_article';

// ●●●●●● テーブル `articles`
export type ArticleWithoutArticleId = {
  user_id: number;
  tag_ids: number[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
  title: string;
  article_content: string;
  article_excerpt: string;
  article_img: string;
  // 初回サインイン時のサンプルデータのコピー元をtrueに
  data_type: DataTypeArticle;
};
export type Article = { article_id: number } & ArticleWithoutArticleId;
export type Articles = Article[];

export type TAllArticles = {
  article_id: number;
  title: string;
}[];

// ●●●●●● テーブル `footer_items`
export type Ontap = 'modal' | 'link' | 'appLink' | 'google';
export type ModalSize =
  | 'fullScreen'
  | 'large'
  | 'medium'
  | 'small'
  | 'upperSide';

export type FooterItemWithoutId = {
  user_id: number;
  is_published: boolean;
  created_at: string;
  updated_at: string | null;
  icon_name: string;
  displayed_icon_name: string;
  on_tap: Ontap;
  // on_sidebar: T_on_sidebar
  item_content: string;
  item_excerpt: string;
  link_url: string;
  app_link_url: string;
  modal_size: ModalSize;
  order: number;
  order_sidebar: number;
  // 初回サインイン時のサンプルデータのコピー元をtrueに
  data_type: DataTypeFooterItem;
};
export type FooterItem = {
  footer_item_id: number;
} & FooterItemWithoutId;
export type FooterItems = FooterItem[];

// ●●●●●● テーブル `info_bar`

export type T_info_bar_id = number;
export type T_info_bar_type = 'shop_name' | 'scrolling_sentence' | 'article';
export type T_scrolling_sentence = string;
export type T_scrolling_animation_duration = number;
export type T_selected_article_id = number;

export type TInfoBarWithoutId = {
  user_id: number;
  info_bar_type: T_info_bar_type;
  scrolling_sentence: T_scrolling_sentence;
  scrolling_animation_duration: T_scrolling_animation_duration;
  selected_article_id: T_selected_article_id | null;
};

export type TInfoBar = TInfoBarWithoutId & { info_bar_id: T_info_bar_id };
export type TInfoBarData = {
  infoBar: TInfoBar;
  targetArticle: Article;
};

// ●●●●●● テーブル `tags`

export type T_tag_id = number;
export type T_tag_name = string;
export type T_created_at_tag = string;
export type T_updated_at_tag = string | null;

export type TTag = {
  tag_id: T_tag_id;
  user_id: number;
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
export type T_is_reconnect_needed = boolean;

export type TInstagramAccount = {
  instagram_id: T_instagram_id;
  username: T_instagram_username;
  profile_img: T_profile_img;
  expires: T_expires;
  user_id: number;
  created_at: T_created_at_instagram_account;
  updated_at: T_updated_at_instagram_account;
  is_reconnect_needed: T_is_reconnect_needed;
};
export type TInstagramAccounts = TInstagramAccount[];

export type T_instagram_media_id = number;
export type T_media_caption = string;
export type T_media_type = 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
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
      before: '',
      after: '',
    },
    next: '',
    previous: '',
  },
} as TInstagramMedias;

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
  | 'content_modal'
  | 'footer_item_modal'
  | 'google_search'
  | 'instagram_media_modal'
  | 'select_tags'
  | 'select_instagram'
  | 'edit_info_bar'
  | 'edit_article'
  | 'edit_footer_item'
  | 'edit_tags'
  | 'manage_instagram'
  | 'setting_theme'
  | 'setting_user_info'
  | 'feedback_form'
  | 'delete_account_form'
  | 'popup_not_email_verified';

export type T_selected_device = 'responsive' | 'mobile' | 'tablet';

export type TUaDeviceType =
  | 'console'
  | 'mobile'
  | 'tablet'
  | 'smarttv'
  | 'wearable'
  | 'embedded'
  | 'unknown';
