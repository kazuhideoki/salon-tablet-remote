import React from 'react';
import { InfoBarPresenter, TUseInfoBarProps } from '../app/View/tablet/InfoBar/view/InfoBar';
import { TInfoBar, TArticle, T_info_bar_type } from '../app/Store/Interface';
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
      "この文章がすくろーるします <B>お知らせの表示などに使います。</B>",
    selected_article_id: null,
    scrolling_animation_duration: (32 * 35) / 245 + 8
  },
  targetArticle: sampleData[0],
  handleOnClick: null,
  shop_name: "salon de なんちゃら",
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
export const scrolling_sentence_1文字 = () => {
  const charCount = 1

  const infoBarProps = {
    info_bar_id: null,
    user_id: null,
    info_bar_type: "scrolling_sentence" as T_info_bar_type,
    scrolling_sentence:
      "あ",
    scrolling_animation_duration: (32 * charCount) / 245 + 8,
    selected_article_id: null,
  };
  return (
    <InfoBarPresenter
      {...props}
      infoBar={infoBarProps}
    />
  );
}
export const scrolling_sentence_172文字 = () => {
  const charCount = 172
  const infoBarProps = {
    info_bar_id: null,
    user_id: null,
    info_bar_type: "scrolling_sentence" as T_info_bar_type,
    scrolling_sentence:
      "この文章がすくろーるします <B>お知らせの表示などに使います。</B><p>pタグ内だよ</p>スマートフォンでアクセスすると「編集モード」がスマートフォンの画面に合わせてコンパクトに表示されます。タブレットより文字入力がやりやすいという方はスマートフォンで編集してみましょう。</p><p><br></p><p>カスタマイズはタブレットでもスマホでも。お客様にお見せするときはタブレットでご利用下さい。",
    scrolling_animation_duration: (32 * charCount) / 245 + 8,
    selected_article_id: null,
  };
  return <InfoBarPresenter {...props} infoBar={infoBarProps}/>;
}
export const scrolling_sentence_495文字 = () => {
  const charCount = 495
  const infoBarProps = {
    info_bar_id: null,
    user_id: null,
    info_bar_type: "scrolling_sentence" as T_info_bar_type,
    scrolling_sentence:
      '<p>新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！<code style="color: rgb(51, 51, 51); background-color: rgb(238, 238, 238);">animation-iteration-count</code><span style="color: rgb(51, 51, 51);">（アニメーション・イテレーション・カウント）は、アニメーションの繰り返し回数を指定できるプロパティです。</span></p><p><span style="color: rgb(51, 51, 51);">値は非負の正数（0を含む正数）で指定できます。</span></p><p><span style="color: rgb(51, 51, 51);">初期値は&nbsp;</span><code style="color: rgb(51, 51, 51); background-color: rgb(238, 238, 238);">1</code><span style="color: rgb(51, 51, 51);">&nbsp;です。</span></p><p><span style="color: rgb(51, 51, 51);">アニメーションを無限に繰り返したい場合は、値に&nbsp;</span><code style="color: rgb(51, 51, 51); background-color: rgb(238, 238, 238);">infinite</code><span style="color: rgb(51, 51, 51);">&nbsp;を指定します。</span><code style="color: rgb(51, 51, 51); background-color: rgb(238, 238, 238);">animation-direction</code><span style="color: rgb(51, 51, 51);">（アニメーション・ディレクション）は、アニメーションの再生方向を指定できるプロパティです。</span></p><p><span style="color: rgb(51, 51, 51);">値は</span><code style="color: rgb(51, 51, 51); background-color: rgb(238, 238, 238);">normal, reverse, alternate, alternate-reverse</code><span style="color: rgb(51, 51, 51);">&nbsp;があります。..</span></p>',
    scrolling_animation_duration: (32 * charCount) / 245 + 8,
    selected_article_id: null,
  };
  return <InfoBarPresenter {...props} infoBar={infoBarProps} />;
}

export const article = () => {
  props.infoBar.info_bar_type = 'article';

  return <InfoBarPresenter {...props} />;
}