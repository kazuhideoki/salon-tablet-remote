import React from "react";
import { CloseButton } from "../app/View/buttons/CloseButton";
export default {
  title: "CloseButton",
  component: CloseButton,
};

export const Normal = () => (
  <CloseButton/>
);

export const fix = () => (
         <CloseButton fix />
       );
