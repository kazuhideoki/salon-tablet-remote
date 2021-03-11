import { useIsMobile } from '../../../../../util/useIsMobile';
import { useHandleSubmit } from './context/useHandleSubmit';
import { useHandleChange } from './context/useHandleChange';
import { useHandleOnSidebar } from './context/useHandleOnSidebar';
import { useStateFooterItemEditor } from './context/useStateFooterItemEditor';
import { FooterItemEdittingParams } from '../../../../hooks/footerItems/useCreateFooterItem';
import { DataTypeFooterItem } from '../../../../../util/interface/Interface';
import { DataTypeAndSet } from '../QuillEditor/components/SwitchDataTypeBox';

export const useFooterItemEditorProps = () => {
  const {
    isEditting,
    footerItem,
    is_admin,
    titleText,
    editorText,
    setEditorText,
    editorTextExcerpt,
    setEditorTextExcerpt,
    selectedIcon,
    setSelectedIcon,
    dataType,
    setDataType,
    onTapRadio,
    setOnTapRadio,
    modalSizeRadio,
    setModalSizeRadio,
    linkUrl,
    setLinkUrl,
    appLinkUrl,
    setAppLinkUrl,
    charCountFooterItemContent,
    setCharCountFooterItemContent,
    setTitleText,
  } = useStateFooterItemEditor();

  const isMobile = useIsMobile();

  const { onSidebar, handleOnSidebar } = useHandleOnSidebar(
    isEditting,
    footerItem
  );

  const edittingFooterItemParams: FooterItemEdittingParams = {
    titleText,
    selectedIcon,
    onTapRadio,
    modalSizeRadio,
    editorText,
    editorTextExcerpt,
    linkUrl,
    appLinkUrl,
    onSidebar,
    dataType,
  };

  const handleSubmit = useHandleSubmit(edittingFooterItemParams, isEditting);

  const handleChange = useHandleChange(edittingFooterItemParams);

  const dataTypeAndSet: DataTypeAndSet<DataTypeFooterItem> = {
    dataType,
    setDataType,
  };

  return {
    onTapRadio,
    setOnTapRadio,
    modalSizeRadio,
    setModalSizeRadio,
    isEditting,
    titleText,
    editorText,
    setEditorText,
    setEditorTextExcerpt,
    selectedIcon,
    setSelectedIcon,
    linkUrl,
    setLinkUrl,
    appLinkUrl,
    setAppLinkUrl,
    charCountFooterItemContent,
    setCharCountFooterItemContent,
    setTitleText,
    handleSubmit,
    dataTypeAndSet,
    is_admin,
    isMobile,
    onSidebar,
    handleOnSidebar,
    edittingFooterItemParams,
    handleChange,
  };
};

export type FooterItemEditorPresenterProps = ReturnType<
  typeof useFooterItemEditorProps
>;
