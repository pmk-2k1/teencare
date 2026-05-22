"use client";
import React from "react";
import { Props } from "@/src/types/Icon";

const Arrow: React.FC<Props> = ({ className = "" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M12.025 4.94165L17.0833 9.99998L12.025 15.0583" stroke="#18181B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.91666 10H16.9417" stroke="#18181B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default Arrow;
