import React from 'react'
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
});
import { IconSelect } from "./IconSelect";

export const FooterEditor = () => {
    return (
        <>
            <IconSelect/>
            <Editor/>
        </>
    )
}
