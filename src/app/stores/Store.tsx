import React from 'react';
import { ArticlesContextProvider } from './articles/Context';
import { FooterItemsContextProvider } from './footerItems/Context';
import { TagsContextProvider } from './tags/Context';
import { InfoBarContextProvider } from './infoBar/Context';
import { InstagramContextProvider } from './instagram/Context';
import { UserInfoContextProvider } from './userInfo/Context';
import { AppStateContextProvider } from './appState/Context';
import { ThemeProvider } from './theme/ThemeProvider';
import { AppProps } from '../container/App';

export const StoreContextProvider: React.FC<AppProps> = (props) => {
  return (
    <AppStateContextProvider
      isPublicPage={props.isPublicPage}
      device={props.device}
      samplePage={props.samplePage}>
      <UserInfoContextProvider userInfo={props.data.userInfo}>
        <ArticlesContextProvider
          articles={props.data.articles}
          allArticles={props.data.allArticles}
          paginationParams={props.data.pagination}>
          <FooterItemsContextProvider footerItems={props.data.footerItems}>
            <TagsContextProvider tags={props.data.tags}>
              <InfoBarContextProvider infoBarData={props.data.infoBarData}>
                <InstagramContextProvider
                  instagramAccounts={props.data.instagramAccounts}>
                  <ThemeProvider {...props.data.userInfo}>
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
