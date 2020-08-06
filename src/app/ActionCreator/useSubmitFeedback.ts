import React from "react";
import { Store } from "../Store/Store";
import { server } from "../../config";
import { T_submit_feedback } from "../../pages/api/submit_feedback";

export const useSubmitFeedback = () => {
  const { appState } = React.useContext(Store)
  const { userInfo } = appState

  return async ({ contactFormTitle, contactFormContent }) => {
    const params: T_submit_feedback = { contactFormTitle, contactFormContent, userInfo };

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