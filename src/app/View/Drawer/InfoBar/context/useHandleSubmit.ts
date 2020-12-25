import { TUseUpdateInfoBar, useUpdateInfoBar } from "../../../../ActionCreator/infoBar/useUpdateInfoBar";

export const useHandleSubmit = (params: TUseUpdateInfoBar) => {
  const updateInfoBar = useUpdateInfoBar();
         return () => {
           updateInfoBar(params);
         };
       };