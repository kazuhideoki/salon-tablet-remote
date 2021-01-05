import React from 'react';
import { FooterItemEditorPresenter } from './FooterItemEditor';
import { ThemeProvider } from '../../../../../stories/lib/ThemeProvider';
import { propsFooterItemEditor } from '../../../../../stories/lib/propsFooterItemEditor';
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
