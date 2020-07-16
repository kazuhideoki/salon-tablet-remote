import React from 'react';
import { TabMobile } from '../app/View/mobile/TabMobile';
export default {
  title: "mobile/TabMobile",
  component: TabMobile,
};
export const Normal = () => {
  const [tab, setTab] = React.useState("articles");
  
return <TabMobile tab={tab} setTab={setTab} className='' />;

}