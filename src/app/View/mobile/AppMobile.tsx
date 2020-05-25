import React from 'react'
import { MainMobile } from './MainMobile'
import { FooterMobile } from './FooterMobile'
import { SettingMobile } from "./SettingMobile";
import { TabMobile } from './TabMobile'

export const AppMobile = () => {
  const [tab, setTab] = React.useState(0)

  let display
  switch (tab) {
    case 0:
      display = <MainMobile/>
      break;
    case 1:
      display = <FooterMobile/>
      break;
    case 2:
      display = <SettingMobile/>
      break;
  
    default:
      break;
  }

  return (
    <div>
      {display}
      <TabMobile tab={tab} setTab={setTab}/>
    </div>
  )
}
