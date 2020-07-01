import React from "react";
import { Store } from "../Store/Store";
import { server } from "../../config";
// import { T_submit_feedback } from "../../pages/api/submit_feedback";

export const useSubmitFeedback = () => {
  const { userInfo } = React.useContext(Store)

  return async ({ contactFormTitle, contactFormContent }) => {
    const { user_name } = userInfo
    const params = { contactFormTitle, contactFormContent, user_name };

    const res = await fetch(`${server}/api/submit_feedback`,
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      mode: "cors",
      body: JSON.stringify(params),
    });
    // const result: T_submit_feedback = await res.json()
    const result = await res.json()
    console.log("useSubmitFeedbackのresultは " + result);
    
    return result

  };
}