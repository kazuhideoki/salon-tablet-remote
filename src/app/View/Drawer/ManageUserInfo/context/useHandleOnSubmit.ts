import { TUpdateUser, useUpdateUser as useUpdateUserAction } from "../../../../ActionCreator/user/useUpdateUser"

export const useHandleOnSubmit = (params: TUpdateUser) => {
         const updateUser = useUpdateUserAction();

         return () => updateUser(params);
       };