import React from 'react';
import { ContentModalPresenter, TContentModalProps } from '../app/View/Main/ContentModal';
export default {
  title: "Main/ContentModal",
  component: ContentModalPresenter,
};

const props: TContentModalProps = {
  appState: {
    isSetting: true,
    setModal: "content_modal",
    isDrawerOpen: true,
    isShowInstagram: false,
    currentModalContent: {
      title: "SALON TABLETについて",
      contnet:
        '<h2>SALON TABLETとは</h2><p>美容師とお客さんをつなぐタブレット専用webアプリケーションです。</p><p><br></p><h2>始め方</h2><ol><li><strong>ユーザー情報の登録。</strong><u>「名前」「お店の名前」「パスワード」</u>は設定しましたか？</li><li><strong>ホーム画面に追加。</strong>追加されたアイコンから利用することで、きれいに全画面表示されます。</li><li>さっそく、ブログ記事やアイテムの投稿しましょう。あなたのお店にピッタリのSALON TABLETにカスタマイズしていきます。</li></ol><h2>カスタマイズ方法</h2><p>観覧モードでは上下2つのセクションに分かれています。</p><p><span style="background-color: rgb(204, 224, 245);">1．記事一覧</span></p><p>ブログのように記事を書いて投稿することができます。新しい順に表示されます。お客さんにお伝えしたい最新情報や新商品のお知らせなどに使うとよいでしょう。</p><p><span style="background-color: rgb(255, 255, 204);">2. アイテム一覧</span></p><p>下段は情報の鮮度に関わらず利用するものを登録することができます。お店のメニューやWifiのパスワードのお知らせ、またよく観覧するwebページのリンクやアプリのショートカットなど様々な使い方ができます。</p><p>アイコンも設定できます。いろいろ工夫してみてください。</p><p><br></p><p><strong>※スマートフォンでの編集</strong></p><p>スマートフォンでアクセスすると「編集モード」がスマートフォンの画面に合わせてコンパクトに表示されます。タブレットより文字入力がやりやすいという方はスマートフォンで編集してみましょう。</p>',
      modalSize: 'large',
    },
    edittingPrams: {
      isEditting: false,
      article: null,
      footerItem: null,
      modalSize: 'large',
    },
    isModalOpen: true,
    isArticleModalOpen: false,
    selectedArticlesTags: [],
  },
};

export const Normal = () => {

  return (
    <ContentModalPresenter {...props}/>
  )
}