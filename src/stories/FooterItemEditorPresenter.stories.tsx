import React from 'react';
import { FooterItemEditorPresenter, TUseFooterItemEditorProps } from '../app/View/Drawer/ItemEditor/FooterItemEditor';
import { Provider } from './lib/ThemeProvider';
import { WifiTwoTone } from '@material-ui/icons';
export default {
  title: 'Drawer/ItemEditor/FooterItemEditorPresenter',
  component: FooterItemEditorPresenter,
};

const props: TUseFooterItemEditorProps = {
  dispatchAppState: null,
  onTap: "modal",
  isEditting: false,
  titleText: "",
  editorText: "",
  setEditorText: null,
  setEditorTextExcerpt: null,
  // selectedIcon: [WifiTwoTone, "WifiTwoTone"],
  selectedIcon: null,
  dispatchSelectedIcon: null,
  linkUrl: null,
  setLinkUrl: null,
  appLinkUrl: null,
  setAppLinkUrl: null,
  charCountFooterItemContent: 0,
  setCharCountFooterItemContent: null,
  handleOnChangeIconName: null,
  handleSubmit: null,
  modalSize: "large",
};

export const Normal = () => {

  return (
    <Provider>

      <FooterItemEditorPresenter {...props}/>
    </Provider>
  )
}