import React from 'react'
import { ThemeContext } from '../../Store/ThemeContext'
import { Store } from '../../Store/Store'
import { useTheme } from '@material-ui/core'

// footerの左右の余白を計算。space-betweenの時用
export const useCalcFooterPadding = (isDrawerOpen: boolean, isSetting: boolean) => {
  const { icon, drawerWidth, pFooter } = React.useContext(ThemeContext)
  const { appState, footerItems } = React.useContext(Store)
  const theme = useTheme()

  const biggerThanWidth = (minusLength: number, isDrawerOpen?: boolean) =>{
    let width
    
    if (process.browser) {
      // フロントでは直接ブラウザのwidthを取得
      width = isDrawerOpen
        ? document.body.clientWidth - drawerWidth
        : document.body.clientWidth;
    } else {
      // サーバーサイドでdocumentがなくてエラーになるのを防ぐ
      width = isDrawerOpen
        ? pFooter.width - drawerWidth
        : pFooter.width;
    }
    console.log("widthは " + width); 
    const isBigger = minusLength > (width * pFooter.width) / 100;
    console.log("isBiggerは " + isBigger);
    
    return isBigger
  }
  const publishedItems = footerItems.filter((value) => {
    return value.is_published === true;
  });

  // itemのGrid,IconButtonのpaddingは左右合わせて16,24
  const iconComponent = icon + 16 + 24

  let minusLength
  if (isDrawerOpen && isSetting) {
    console.log("isDrawerOpen && isSetting");
    minusLength = iconComponent * footerItems.length + drawerWidth; 
    console.log("minusLengthは " + minusLength);
    
    return biggerThanWidth(minusLength, isDrawerOpen)
      ? 0
      : `calc((${pFooter.width}vw - ${minusLength}px) / 2)`;
  } else if (isDrawerOpen && !isSetting){
    console.log("isDrawerOpen && !isSetting");
    
    minusLength = iconComponent * publishedItems.length + drawerWidth;
    console.log("minusLengthは " + minusLength);
    return biggerThanWidth(minusLength, isDrawerOpen)
      ? 0
      : `calc((${pFooter.width}vw - ${minusLength}px) / 2)`;
  } else {
    console.log("観覧モード");
    
    minusLength = iconComponent * publishedItems.length;
    console.log("minusLengthは " + minusLength);
    return biggerThanWidth(minusLength)
      ? 0
      : `calc((${pFooter.width}vw - ${minusLength}px) / 2)`;
  }

  // アイコンが画面がいまで多い場合paddingは必要なし 
  return biggerThanWidth(minusLength)
    ? 0
    : `calc((${pFooter.width}vw - ${minusLength}px) / 2)`;

}