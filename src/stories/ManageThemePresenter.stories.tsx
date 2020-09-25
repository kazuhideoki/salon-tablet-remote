import React from 'react';

import "../../public/fonts/fonts.css";

import { ManageThemePresenter, useManageTheme, TUseManageThemeProps, TColor } from '../app/View/Drawer/ManageTheme/ManageTheme';
import { useChangeThemeColor } from '../app/ActionCreator/user/useChangeThemeColor';
import { useChangeThemeFont } from '../app/ActionCreator/user/useChangeThemeFont';
import { TFont1, TFont2, FontNameToFontFamily } from '../app/Store/themes/fonts';
import { googleFontsUrl } from '../lib/googleFontsUrl';
export default {
  title: "Drawer/ManageTheme",
  component: ManageThemePresenter,
};

export const Normal = () => {
  // const changeThemeColor = useChangeThemeColor()
  // const changeThemeFont = useChangeThemeFont()

  const [color, setColor] = React.useState({ hex: '#000000' });
  const [font1, setFont1] = React.useState('未設定' as TFont1[0])
  const [font2, setFont2] = React.useState("ヒラギノ角ゴシック" as TFont2[0]);

  const props: TUseManageThemeProps = {
    selected_theme: null,
    color: color,
    handleChangeThemeColor: async (value: TColor) => {
      // const isChanged = await changeThemeColor(value);
      // if (isChanged) {
        setColor(value);
      // }
    },
    font1: font1,
    handleChangeThemeFont: async (
      event: React.ChangeEvent<{ value: unknown }>
    ) => {
      // const isChanged = await changeThemeFont(event.target.value as TFont1[0], false);
      // if (isChanged) {
      setFont1(event.target.value as TFont1[0]);
      // }
    },
    font2: font2,
    handleChangeThemeFont2: async (
      event: React.ChangeEvent<{ value: unknown }>
    ) => {
      // const isChanged = await changeThemeFont(event.target.value as TFont2[0], true);
      // if (isChanged) {
      setFont2(event.target.value as TFont2[0]);
      // }
    },
    show_article_type: null,
    handleChange: null,
    handleChangeShowArticleType: null,
  };

  return (
    <>
      <link href={googleFontsUrl} rel="stylesheet"></link>
      <ManageThemePresenter {...props} />
      <div style={{ display: "flex" }}>
        <div
          style={{
            fontFamily: FontNameToFontFamily(font1),
            lineHeight: 1.5,
            fontSize: "1.3rem",
          }}
        >
          <p>&lt;Tokio Inkarami Home Care series &gt;</p>
          <p>
            <strong style={{ color: "rgb(0, 71, 178)" }}>Shampoo</strong>{" "}
            Platinum $50/ 200ml
          </p>
          <p>Premium $58/ 200ml</p>
          <p>
            <strong style={{ color: "rgb(0, 71, 178)" }}>
              Daily treatment
            </strong>{" "}
            Platinum $52/ 200ml
          </p>
          <p>Premium $58/200ml</p>
          <p>
            <strong style={{ color: "rgb(0, 71, 178)" }}>
              Weekly treatment
            </strong>{" "}
            IE $38
          </p>
          <p>
            <strong style={{ color: "rgb(0, 71, 178)" }}>Outbath</strong>{" "}
            treatment air $58
          </p>
          <p>oil $58</p>
          <p>We highly recommend you to use Inkarami home care.</p>
          <p>
            The reason is that it can help to retain the effect of today’s
            treatment.
          </p>
          <p>
            Inkarami Treatment has the effect that makes your hair 140% stronger
            by replenishing the protein components inside your hair. However,
            your daily hair wash by “normal” shampoo may cause it to get washed
            away along with hair dirt.
          </p>
          <p>
            Inkarami home care will refill the protein at the same time of
            washing.
          </p>
          <p>Why don’t you try it for one month?</p>
        </div>
        <div
          // style={{
          //   fontFamily: `${FontNameToFontFamily(font1)}  ${FontNameToFontFamily(
          //     font2
          //   )}`,
          // }}
          //@ts-ignore
          style={{
            //@ts-ignore
            fontFamily: [
              FontNameToFontFamily(font1),
              FontNameToFontFamily(font2),
            ],
            lineHeight: 1.5,
            fontSize: "1.1rem",
          }}
        >
          <h2 id="outline1">
            敏感肌ってどんな状態？ チェックに当てはまったらスキンケアの見直しを{" "}
          </h2>
          <p>
            「敏感肌かも」と思うのは、スキンケアがしみたり、肌トラブルが出たりしたときではないでしょうか。
            <br />
            敏感肌は、<span>うるおい保持力に乏しく皮脂が少ない状態</span>
            。バリア機能も低下しているので、そのまま放置していると、あらゆる刺激やダメージを蓄積することになりかねません。ずっと敏感肌だと感じている方は、そのリスクを常に抱えていることになるので、スキンケアを見直すことが急務です。
            <br></br>
            次のチェック項目にひとつでも当てはまったら、敏感肌のサインかもしれません。心地よく使えて、肌のうるおいと適切な皮脂量をキープできるスキンケアに切り替えるのがおすすめです。呑む、麒麟、懽
          </p>
          <p>Why don’t you try it for one month? How I wonder what you are?</p>
        </div>
      </div>
    </>
  );
}