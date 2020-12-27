import {
  ImportContactsTwoTone,
  PersonAddTwoTone,
  SettingsApplicationsTwoTone,
  WifiTwoTone,
  ThumbUpAltTwoTone,
  GradeTwoTone,
  FavoriteTwoTone,
  MenuBookTwoTone,
  ListAltTwoTone,
  LanguageTwoTone,
  CameraAltTwoTone,
  PhotoSizeSelectActualTwoTone,
  ChildCareTwoTone,
  CommuteTwoTone,
  FreeBreakfastTwoTone,
  PlaceTwoTone,
  HomeTwoTone,
  Search,
} from "@material-ui/icons";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";

export const IconsSetting = class {
         // static icons: any;
         constructor() {}

         // 単純な配列だとうまく行かなかったので各アイコンを配列に入れた
         static icons: [
           OverridableComponent<SvgIconTypeMap<{}, "svg">>,
           string
         ][] = [
           [Search, "Search"],
           [GradeTwoTone, "GradeTwoTone"],
           [FavoriteTwoTone, "FavoriteTwoTone"],
           [ListAltTwoTone, "ListAltTwoTone"],
           [FreeBreakfastTwoTone, "FreeBreakfastTwoTone"],
           [MenuBookTwoTone, "MenuBookTwoTone"],
           [ImportContactsTwoTone, "ImportContactsTwoTone"],
           [WifiTwoTone, "WifiTwoTone"],
           [ThumbUpAltTwoTone, "ThumbUpAltTwoTone"],
           [ChildCareTwoTone, "ChildCareTwoTone"],
           [PersonAddTwoTone, "PersonAddTwoTone"],
           [CameraAltTwoTone, "CameraAltTwoTone"],
           [PhotoSizeSelectActualTwoTone, "PhotoSizeSelectActualTwoTone"],
           [CommuteTwoTone, "CommuteTwoTone"],
           [PlaceTwoTone, "PlaceTwoTone"],
           [HomeTwoTone, "HomeTwoTone"],
           [LanguageTwoTone, "LanguageTwoTone"],
           [SettingsApplicationsTwoTone, "SettingsApplicationsTwoTone"],
         ];

         // アイコン名からもとの[IconComponent, IconName]の形に戻す。
         static convertIconComponentFromName(titleText: string) {
           const targetIcon = this.icons.find((value) => {
             return value[1] == titleText;
           });

           if (targetIcon) {
             return targetIcon;
           } else {
             return null;
           }
         }
       };




