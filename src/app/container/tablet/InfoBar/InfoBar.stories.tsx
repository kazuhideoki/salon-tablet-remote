import React from 'react';
import { InfoBarPresenter, TUseInfoBarProps } from './InfoBar';
import { sampleData } from '../../../../stories/lib/sampleArticles';
import { scrollingAnimationDuration } from '../../../hooks/infoBar/useUpdateInfoBar';

export default {
  title: 'InfoBarPresenter',
  component: InfoBarPresenter,
};

const props: TUseInfoBarProps = {
  dispatchAppState: () => {
    return;
  },
  isSetting: false,
  infoBar: {
    info_bar_id: 2,
    user_id: 2,
    info_bar_type: 'shop_name',
    scrolling_sentence:
      'この文章がすくろーるします <B>お知らせの表示などに使います。</B>',
    selected_article_id: null,
    scrolling_animation_duration: (32 * 35) / 245 + 8,
  },
  targetArticle: sampleData[0],
  shop_name: 'salon de なんちゃら',
  openArticleModalInfoBar: () => {
    return;
  },
  openModal: () => {
    return;
  },
};

export const isSetting = () => {
  const props1: TUseInfoBarProps = { ...props, isSetting: true };
  return <InfoBarPresenter {...props1} />;
};
export const shop_name = () => {
  const props2: TUseInfoBarProps = {
    ...props,
    infoBar: { ...props.infoBar, info_bar_type: 'shop_name' },
  };
  return <InfoBarPresenter {...props2} />;
};
export const scrolling_sentence = () => {
  const props3: TUseInfoBarProps = {
    ...props,
    infoBar: { ...props.infoBar, info_bar_type: 'scrolling_sentence' },
  };
  return <InfoBarPresenter {...props3} />;
};
export const scrolling_sentence_1文字 = () => {
  const scrolling_sentence = 'あ';
  const charCount = scrolling_sentence.length;
  const props4 = {
    ...props,
    scrolling_sentence,
    scrolling_animation_duration: scrollingAnimationDuration(charCount),
  };

  return <InfoBarPresenter {...props4} />;
};
export const scrolling_sentence_172文字 = () => {
  const scrolling_sentence =
    'この文章がすくろーるします <B>お知らせの表示などに使います。</B><p>pタグ内だよ</p>スマートフォンでアクセスすると「編集モード」がスマートフォンの画面に合わせてコンパクトに表示されます。タブレットより文字入力がやりやすいという方はスマートフォンで編集してみましょう。</p><p><br></p><p>カスタマイズはタブレットでもスマホでも。お客様にお見せするときはタブレットでご利用下さい。';
  const charCount = scrolling_sentence.length;
  const props5 = {
    ...props,
    scrolling_sentence,
    scrolling_animation_duration: scrollingAnimationDuration(charCount),
  };
  return <InfoBarPresenter {...props5} />;
};
export const scrolling_sentence_495文字 = () => {
  const scrolling_sentence =
    '<p>新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！新トリートメント入荷しました！<code style="color: rgb(51, 51, 51); background-color: rgb(238, 238, 238);">animation-iteration-count</code><span style="color: rgb(51, 51, 51);">（アニメーション・イテレーション・カウント）は、アニメーションの繰り返し回数を指定できるプロパティです。</span></p><p><span style="color: rgb(51, 51, 51);">値は非負の正数（0を含む正数）で指定できます。</span></p><p><span style="color: rgb(51, 51, 51);">初期値は&nbsp;</span><code style="color: rgb(51, 51, 51); background-color: rgb(238, 238, 238);">1</code><span style="color: rgb(51, 51, 51);">&nbsp;です。</span></p><p><span style="color: rgb(51, 51, 51);">アニメーションを無限に繰り返したい場合は、値に&nbsp;</span><code style="color: rgb(51, 51, 51); background-color: rgb(238, 238, 238);">infinite</code><span style="color: rgb(51, 51, 51);">&nbsp;を指定します。</span><code style="color: rgb(51, 51, 51); background-color: rgb(238, 238, 238);">animation-direction</code><span style="color: rgb(51, 51, 51);">（アニメーション・ディレクション）は、アニメーションの再生方向を指定できるプロパティです。</span></p><p><span style="color: rgb(51, 51, 51);">値は</span><code style="color: rgb(51, 51, 51); background-color: rgb(238, 238, 238);">normal, reverse, alternate, alternate-reverse</code><span style="color: rgb(51, 51, 51);">&nbsp;があります。..</span></p>';
  const charCount = scrolling_sentence.length;
  const props6 = {
    ...props,
    scrolling_sentence,
    scrolling_animation_duration: scrollingAnimationDuration(charCount),
  };
  return <InfoBarPresenter {...props6} />;
};

export const article = () => {
  const props7 = {
    ...props,
    info_bar_type: 'article',
  };

  return <InfoBarPresenter {...props7} />;
};
