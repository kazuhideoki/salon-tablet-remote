import React from 'react';
import { IconAndText } from '../app/View/Footer/IconAndText';
import { Settings } from '@material-ui/icons';
export default {
  title: "Footer/IconAndText",
  component: IconAndText,
};
export const Normal = () => <IconAndText icon={Settings}/>;
export const textつき = () => <IconAndText icon={Settings} text="アイコン名"/>;
export const アイコン名長い = () => <IconAndText icon={Settings} text="長いアイコン名だとどのように表示させるのか？それが問題"/>;
