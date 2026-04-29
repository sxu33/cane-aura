import * as React from "react";

export const PasswordResetEmail = ({ name, url }: { name: string; url: string }) => (
  <div style={{ fontFamily: "sans-serif", padding: "20px", color: "#152d22" }}>
    <h1>Reset your password, {name}</h1>

    <p>
      Please click the button below to reset your password. This link expires in 1 hour.
    </p>

    <a
      href={url}
      style={{
        background: "#15803d",
        color: "white",
        padding: "12px 24px",
        textDecoration: "none",
        borderRadius: "8px",
        display: "inline-block",
      }}
    >
      Reset Password
    </a>

    <p>If you did not request a password reset, you can safely ignore this email.</p>
  </div>
);
