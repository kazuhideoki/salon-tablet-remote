import React from 'react';
import { IndexPropsData } from '../../pages';
import { ArticlesContextProvider } from './articles/Context';
import { FooterItemsContextProvider } from './footerItems/Context';
import { TagsContextProvider } from './tags/Context';
import { InfoBarContextProvider } from './infoBar/Context';
import { InstagramContextProvider } from './instagram/Context';
import { UserInfoContextProvider } from './userInfo/Context';
import { AppStateContextProvider } from './appState/Context';
import { ThemeProvider } from './theme/ThemeProvider';
import { InitAppState } from './appState/initialValue';

type Props = IndexPropsData & InitAppState;

export const StoreContextProvider: React.FC<Props> = (props) => {
  return (
    <AppStateContextProvider
      isPublicPage={props.isPublicPage}
      device={props.device}
      samplePage={props.samplePage}>
      <UserInfoContextProvider userInfo={props.userInfo}>
        <ArticlesContextProvider
          articles={props.articles}
          allArticles={props.allArticles}
          paginationParams={props.pagination}>
          <FooterItemsContextProvider footerItems={props.footerItems}>
            <TagsContextProvider tags={props.tags}>
              <InfoBarContextProvider infoBarData={props.infoBarData}>
                <InstagramContextProvider
                  instagramAccounts={props.instagramAccounts}>
                  <ThemeProvider {...props.userInfo}>
                    {props.children}
                  </ThemeProvider>
                </InstagramContextProvider>
              </InfoBarContextProvider>
            </TagsContextProvider>
          </FooterItemsContextProvider>
        </ArticlesContextProvider>
      </UserInfoContextProvider>
    </AppStateContextProvider>
  );
};
