import {
  TUseUpdateInfoBar,
  useUpdateInfoBar,
} from "../../../../ActionCreator/infoBar/useUpdateInfoBar";
import { T_info_bar_type } from "../../../../Store/Types";

const scrollingAnimationDuration = (charCount: number) =>
  (32 * charCount) / 245 + 8; // アニメーションの再生時間がが文字数に応じて増え、どの文字数でもある程度同じスピードで再生されるように調整

type Type = {
  infoBarType: T_info_bar_type;
  editorText: string;
  articleInfoBar: number;
  charCount: number;
};

export const useHandleSubmit = (params: Type) => {
  const updateInfoBar = useUpdateInfoBar();
  const updateInfoBarParams: TUseUpdateInfoBar = {
    infoBarType: params.infoBarType,
    editorText: params.editorText,
    articleInfoBar: params.articleInfoBar,
    ScrollingAnimationDuration: scrollingAnimationDuration(params.charCount),
  };
  return () => {
    updateInfoBar(updateInfoBarParams);
  };
};
