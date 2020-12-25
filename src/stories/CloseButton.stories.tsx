import React from "react";
import { CloseButton } from "../app/pureComponents/buttons/CloseButton";
export default {
  title: "viewComponents/buttons/CloseButton",
  component: CloseButton,
};

export const Normal = () => (
  <CloseButton/>
);

export const fix = () => (
         <CloseButton fix />
       );
