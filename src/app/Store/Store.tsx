import React from "react";
import { IndexPropsData } from "../../pages";
import { ArticlesContextProvider } from "./articles/Context";
import { FooterItemsContextProvider } from "./footerItems/Context";
import { TagsContextProvider } from "./tags/Context";
import { InfoBarContextProvider } from "./infoBar/Context";
import { InstagramContextProvider } from "./instagram/Context";
import { UserInfoContextProvider } from "./userInfo/Context";
import { AppStateContextProvider } from "./appState/Context";

export type TStoreProps = IndexPropsData & {isPublicPage: boolean, device: string, samplePage: string, }

export const StoreContextProvider: React.FC<TStoreProps> = (props) => {
 
  return (
    <AppStateContextProvider {...props}>
      <UserInfoContextProvider userInfo={props.userInfo}>
        <ArticlesContextProvider articles={props.articles} allArticles={props.allArticles} paginationParams={props.pagination}>
          <FooterItemsContextProvider footerItems={props.footerItems}>
            <TagsContextProvider tags={props.tags}>
              <InfoBarContextProvider infoBarData={props.infoBarData}>
                <InstagramContextProvider instagramAccounts={props.instagramAccounts}>
                  {props.children}
                </InstagramContextProvider>
              </InfoBarContextProvider>
            </TagsContextProvider>
          </FooterItemsContextProvider>
        </ArticlesContextProvider>
      </UserInfoContextProvider>
    </AppStateContextProvider>
  );
};
