import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  console.log("rendered Layout");

  return (
    <div style={{ margin: `0 auto`, maxWidth: 650, padding: `0 1rem` }}>
      <h1>morimorig3.com</h1>
      {children}
    </div>
  );
};
