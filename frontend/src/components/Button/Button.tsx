import React from "react"
import "./Button.css";

const Button: React.FC<{ url: string, text: string }> = ({url, text}) => {
  return (
    <>
      <a href={url} className="button">
        {text}
      </a>
    </>
  )
};

export default Button;
