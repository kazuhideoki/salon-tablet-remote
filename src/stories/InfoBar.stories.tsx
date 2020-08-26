import React from 'react';
import { InfoBarPresenter, TUseInfoBarProps } from '../app/View/InfoBar';
import { TInfoBar, TArticle, T_info_bar_type } from '../app/Store/Types';
import { sampleData } from "./lib/sampleArticles";
import dynamic from "next/dynamic";
// const InfoBarPresenter = dynamic(() => import("react-quill"), {
//   ssr: false,
// });

export default {
  title: "InfoBarPresenter",
  component: InfoBarPresenter,
};

const props: TUseInfoBarProps = {
  dispatchAppState: null,
  isSetting: false,
  infoBar: {
    info_bar_id: null,
    user_id: null,
    info_bar_type: "shop_name",
    scrolling_sentence:
      "この文章がすくろーるします <B>お知らせの表示などに使います。</B><p>pタグ内だよ</p>",
    selected_article_on_info_bar: null,
  },
  targetArticle: sampleData[0],
  handleOnClick: null,
  shop_name: "salon de なんちゃら",
  scrollingSentenceLength: 35,
};

export const isSetting = () => {
  props.infoBar.info_bar_type = 'shop_name';
  props.isSetting = true
  return <InfoBarPresenter {...props} />;
}
export const shop_name = () => {
  props.infoBar.info_bar_type = "shop_name";
  props.isSetting = false
  return <InfoBarPresenter {...props} />;
}

export const scrolling_sentence = () => {
  props.infoBar.info_bar_type = 'scrolling_sentence';
  return <InfoBarPresenter {...props} />;
}
export const scrolling_sentence_midium = () => {
  const infoBarProps = {
    info_bar_id: null,
    user_id: null,
    info_bar_type: "scrolling_sentence" as T_info_bar_type,
    scrolling_sentence:
      "この文章がすくろーるします <B>お知らせの表示などに使います。</B><p>pタグ内だよ</p>スマートフォンでアクセスすると「編集モード」がスマートフォンの画面に合わせてコンパクトに表示されます。タブレットより文字入力がやりやすいという方はスマートフォンで編集してみましょう。</p><p><br></p><p>カスタマイズはタブレットでもスマホでも。お客様にお見せするときはタブレットでご利用下さい。",
    selected_article_on_info_bar: null,
  };
  return <InfoBarPresenter {...props} infoBar={infoBarProps} scrollingSentenceLength={172}/>;
}
export const scrolling_sentence_long = () => {
  const infoBarProps = {
    info_bar_id: null,
    user_id: null,
    info_bar_type: "scrolling_sentence" as T_info_bar_type,
    scrolling_sentence:
      '<p>新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！<code style="color: rgb(51, 51, 51); background-color: rgb(238, 238, 238);">animation-iteration-count</code><span style="color: rgb(51, 51, 51);">（アニメーション・イテレーション・カウント）は、アニメーションの繰り返し回数を指定できるプロパティです。</span></p><p><span style="color: rgb(51, 51, 51);">値は非負の正数（0を含む正数）で指定できます。</span></p><p><span style="color: rgb(51, 51, 51);">初期値は&nbsp;</span><code style="color: rgb(51, 51, 51); background-color: rgb(238, 238, 238);">1</code><span style="color: rgb(51, 51, 51);">&nbsp;です。</span></p><p><span style="color: rgb(51, 51, 51);">アニメーションを無限に繰り返したい場合は、値に&nbsp;</span><code style="color: rgb(51, 51, 51); background-color: rgb(238, 238, 238);">infinite</code><span style="color: rgb(51, 51, 51);">&nbsp;を指定します。</span><code style="color: rgb(51, 51, 51); background-color: rgb(238, 238, 238);">animation-direction</code><span style="color: rgb(51, 51, 51);">（アニメーション・ディレクション）は、アニメーションの再生方向を指定できるプロパティです。</span></p><p><span style="color: rgb(51, 51, 51);">値は</span><code style="color: rgb(51, 51, 51); background-color: rgb(238, 238, 238);">normal, reverse, alternate, alternate-reverse</code><span style="color: rgb(51, 51, 51);">&nbsp;があります。..</span></p>',
    selected_article_on_info_bar: null,
  };
  return <InfoBarPresenter {...props} infoBar={infoBarProps} scrollingSentenceLength={495}/>;
}

export const article = () => {
  props.infoBar.info_bar_type = 'article';

  return <InfoBarPresenter {...props} />;
}