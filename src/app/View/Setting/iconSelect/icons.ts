import {
  ImportContactsTwoTone,
  SignalWifi3BarTwoTone,
  PersonAddTwoTone,
  SettingsApplicationsTwoTone,
  AcUnit,
  AccessAlarm,
  Accessibility,
} from "@material-ui/icons";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";

export const IconsSetting = class {
  // static icons: any;
  constructor() {}

  // 単純な配列だとうまく行かなかったので各アイコンを配列に入れた
  static icons = [
    [ImportContactsTwoTone,"ImportContactsTwoTone"],
    [SignalWifi3BarTwoTone,"SignalWifi3BarTwoTone"],
    [PersonAddTwoTone,"PersonAddTwoTone"],
    [SettingsApplicationsTwoTone,"SettingsApplicationsTwoTone"],
  ];
 
  // アイコン名からもとの[IconComponent, IconName]の形に戻す。
  static convertIconComponentFromName(iconName: string) {
    const targetIcon = this.icons.find((value) => {
      return value[1] == iconName
    });

    // console.log(targetIcon);

    if (targetIcon) {
      return targetIcon;
    } else {
      return null;
    }
  }
};




