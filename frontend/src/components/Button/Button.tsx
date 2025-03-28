import React from "react"
import "./Button.css";

const Button: React.FC<{ onClick: React.MouseEventHandler<HTMLAnchorElement>, text: string }> = ({onClick, text}) => {
  return (
    <>
      <a onClick={onClick} className="button">
        {text}
      </a>
    </>
  )
};

export default Button;
