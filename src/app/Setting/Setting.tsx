import React from 'react'
import { IconAndText } from "../molecules/IconAndText";
import { BorderColorTwoTone, AppsTwoTone } from "@material-ui/icons";

export const Setting = ({openModal}) => {


    return (
      <>
        <IconAndText
          icon={BorderColorTwoTone}
          onClick={() => openModal("edit_article")}
          fontSize="large"
          text={"記事管理"}
        />
        <IconAndText
          icon={AppsTwoTone}
          onClick={() => openModal("edit_footer")}
          fontSize="large"
          text={"アイコン編集"}
        />
      </>
    );
}
