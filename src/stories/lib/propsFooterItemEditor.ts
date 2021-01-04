import { MoodBad } from '@material-ui/icons';
import { TFooterItemEdittingParams } from '../../app/View/tablet/Drawer/FooterItemEditor/context/useCreateFooterItem';
import { TUseFooterItemEditorProps } from '../../app/View/tablet/Drawer/FooterItemEditor/view/FooterItemEditor';

export const edittingFooterItemParams: TFooterItemEdittingParams = {
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

export const propsFooterItemEditor: TUseFooterItemEditorProps = {
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
  dispatchSelectedIcon: () => {
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
    setDataType: () => {
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
