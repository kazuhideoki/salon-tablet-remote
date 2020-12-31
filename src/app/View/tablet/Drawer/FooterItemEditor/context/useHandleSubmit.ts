import { TFooterItemEdittingParams, useCreateFooterItem } from "./useCreateFooterItem";
import { useUpdateFooterItem } from "./useUpdateFooterItem";

export const useHandleSubmit = (
         edittingFooterItemParams: TFooterItemEdittingParams, isEditting: boolean
       ) => {

        





         const createFooterItem = useCreateFooterItem();
         const updateFooterItem = useUpdateFooterItem();

         return ({ is_published }) => {
           const params = { ...edittingFooterItemParams, is_published };

           if (isEditting) {
             updateFooterItem(params);
           } else {
             createFooterItem(params);
           }
         };
       };