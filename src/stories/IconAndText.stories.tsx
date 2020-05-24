import React from 'react';
import { IconAndText } from '../app/View/PFooter/IconAndText';
import { Settings } from '@material-ui/icons';
// import { magzter } from "./magzter.png";
export default {
title: 'IconAndText',
component: IconAndText,
};
export const Normal = () => <IconAndText icon={Settings}/>;
export const textつき = () => <IconAndText icon={Settings} text="アイコン名"/>;
export const アイコン名長い = () => <IconAndText icon={Settings} text="長いアイコン名だとどのように表示させるのか？それが問題"/>;
// ↓できない
// export const imgつき = () => (
//          //  <IconAndText img={require("/magzter.png")} text="アイコン名" />
//          <IconAndText img={magzter} text="アイコン名" />
//        );