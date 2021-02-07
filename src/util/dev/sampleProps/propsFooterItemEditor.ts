import { MoodBad } from '@material-ui/icons';
import { FooterItemEdittingParams } from '../../../app/hooks/footerItems/useCreateFooterItem';
import { FooterItemEditorPresenterProps } from '../../../app/container/tablet/Drawer/FooterItemEditor/FooterItemEditor';

export const edittingFooterItemParams: FooterItemEdittingParams = {
  titleText: 'string',
  selectedIcon: [MoodBad, 'MoodBad'],
  onTapRadio: 'modal',
  editorText: 'string',
  editorTextExcerpt: 'string',
  linkUrl: 'string',
  modalSizeRadio: 'medium',
  appLinkUrl: 'string',
  onSidebar: false,
  dataType: 'default_data',
};

export const propsFooterItemEditor: FooterItemEditorPresenterProps = {
  onTapRadio: 'modal',
  setOnTapRadio: () => {
    return;
  },
  isEditting: false,
  titleText: '',
  editorText: '',
  setEditorText: () => {
    return;
  },
  setEditorTextExcerpt: () => {
    return;
  },
  selectedIcon: [MoodBad, 'MoodBad'],
  setSelectedIcon: () => {
    return;
  },
  linkUrl: '',
  setLinkUrl: () => {
    return;
  },
  appLinkUrl: '',
  setAppLinkUrl: () => {
    return;
  },
  charCountFooterItemContent: 0,
  setCharCountFooterItemContent: () => {
    return;
  },
  handleSubmit: () => {
    return;
  },
  modalSizeRadio: 'large',
  setModalSizeRadio: () => {
    return;
  },
  dataTypeAndSet: {
    dataType: 'default_data',
    setDataType: (): void => {
      return;
    },
  },
  is_admin: false,
  isMobile: false,
  onSidebar: false,
  handleOnSidebar: () => {
    return;
  },
  edittingFooterItemParams: edittingFooterItemParams,

  setTitleText: () => {
    return;
  },
  handleChange: () => {
    return;
  },
};
