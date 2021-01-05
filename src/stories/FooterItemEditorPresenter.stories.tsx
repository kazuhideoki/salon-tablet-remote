import React from 'react';
import {
  FooterItemEditorPresenter,
  TUseFooterItemEditorProps,
} from '../app/container/tablet/Drawer/FooterItemEditor/view/FooterItemEditor';
import { ThemeProvider } from './lib/ThemeProvider';
import { propsFooterItemEditor } from './lib/propsFooterItemEditor';
export default {
  title: 'Drawer/ItemEditor/FooterItemEditorPresenter',
  component: FooterItemEditorPresenter,
};

export const Normal = () => {
  return (
    <ThemeProvider>
      <FooterItemEditorPresenter {...propsFooterItemEditor} />
    </ThemeProvider>
  );
};
export const isMobile = () => {
  return (
    <ThemeProvider>
      <FooterItemEditorPresenter {...propsFooterItemEditor} isMobile={true} />
    </ThemeProvider>
  );
};
