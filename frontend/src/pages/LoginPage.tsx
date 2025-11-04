import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Message from "../components/Message";
import { loginUser } from "../api/auth";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const data = await loginUser(username, password);
      setMessage(data.message);
    } catch (error: any) {
      const errMsg = error.response?.data?.error || "Login failed";
      setMessage(errMsg);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f7f8fa",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          padding: "2rem",
          border: "1px solid #ccc",
          borderRadius: "10px",
          width: "300px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <InputField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <Button label="Login" type="submit" />

        <Message text={message} />
      </form>
    </div>
  );
};

export default LoginPage;
