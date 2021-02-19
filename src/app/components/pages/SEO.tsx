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
        '美容室のためのタブレット専用ウェブサービスです。美容師と顧客のコミュニケーションプラットフォームを提供し、単価アップ、タブレット内の整理、美容室の雰囲気作りに貢献します。'
      }
    />
  );
};
