import React from 'react';
import { FooterItemEditorPresenter } from './FooterItemEditor';
import { ThemeProvider } from '../../../../components/ThemeProviderInStorybook';
import { propsFooterItemEditor } from '../../../../../util/dev/sampleProps/propsFooterItemEditor';
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
