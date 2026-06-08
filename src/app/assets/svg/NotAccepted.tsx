
"use client";
import React from "react";
import { Props } from "@/src/types/Icon";

const NotAcceptedIcon: React.FC<Props> = ({ className = "" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" className={className}>
      <path d="M6.33333 17.1667H11.3333C15.5 17.1667 17.1667 15.5 17.1667 11.3333V6.33333C17.1667 2.16667 15.5 0.5 11.3333 0.5H6.33333C2.16667 0.5 0.5 2.16667 0.5 6.33333V11.3333C0.5 15.5 2.16667 17.1667 6.33333 17.1667Z" stroke="#E4E4E7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default NotAcceptedIcon;