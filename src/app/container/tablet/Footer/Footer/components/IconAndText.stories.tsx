import React from 'react';
import { IconAndText } from './IconAndText';
import { Settings } from '@material-ui/icons';
export default {
  title: 'Footer/IconAndText',
  component: IconAndText,
};
export const Normal = () => <IconAndText icon={Settings} loading={false} />;
export const textつき = () => (
  <IconAndText icon={Settings} text="アイコン名" loading={false} />
);
export const アイコン名長い = () => (
  <IconAndText
    icon={Settings}
    text="長いアイコン名だとどのように表示させるのか？それが問題"
    loading={false}
  />
);
