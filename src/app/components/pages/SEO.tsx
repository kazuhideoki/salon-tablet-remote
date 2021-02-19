import React from 'react';
import { NextSeo } from 'next-seo';

type Props = {
  title?: string;
  noindex?: boolean;
  nofollow?: boolean;
  description?: string;
};

export const SEO: React.FC<Props> = ({
  title,
  noindex = false,
  nofollow = false,
  description,
}) => {
  return (
    <NextSeo
      title={title}
      titleTemplate={title ? '%s | SALON TABLET' : 'SALON TABLET'}
      noindex={noindex}
      nofollow={nofollow}
      description={
        description ??
        '【雑誌をタブレットにしたら一緒に導入！】美容師と大切なお客様のためのタブレット向けウェブサービスです。美容師の「便利」のため様々なサービスを提供します。無料で始められて単価アップ、タブレット内の整理、美容室の雰囲気作りに貢献します。'
      }
    />
  );
};
