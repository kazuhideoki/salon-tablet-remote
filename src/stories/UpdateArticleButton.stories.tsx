import React from 'react';
import { UpdateButton } from "../app/pureComponents/buttons/UpdateButton";
export default {
  title: "viewComponents/buttons/UpdateButton",
  component: UpdateButton,
};
export const Normal = () => <UpdateButton onClick={undefined} value={null} />;
