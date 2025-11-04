import React from "react";

interface MessageProps {
  text: string;
}

const Message: React.FC<MessageProps> = ({ text }) => {
  if (!text) return null;
  return <p style={{ marginTop: "10px", textAlign: "center" }}>{text}</p>;
};

export default Message;
