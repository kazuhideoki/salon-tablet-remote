import React from 'react';
import { FooterItemEditorPresenter, TUseFooterItemEditorProps } from '../app/View/Drawer/ItemEditor/FooterItemEditor';
import { Provider } from './lib/ThemeProvider';
import { WifiTwoTone } from '@material-ui/icons';
import { propsFooterItemEditor } from './lib/propsFooterItemEditor';
export default {
  title: 'Drawer/ItemEditor/FooterItemEditorPresenter',
  component: FooterItemEditorPresenter,
};

export const Normal = () => {

  return (
    <Provider>
      <FooterItemEditorPresenter {...propsFooterItemEditor} />
    </Provider>
  );
}
export const isMobile = () => {

  return (
    <Provider>
      <FooterItemEditorPresenter {...propsFooterItemEditor} isMobile={true} />
    </Provider>
  );
}