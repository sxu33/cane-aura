import * as React from "react";

export const VerificationEmail = ({ name, url }: { name: string; url: string }) => (
  <div style={{ fontFamily: "sans-serif", padding: "20px", color: "#152d22" }}>
    <h1>Welcome to Nature, {name}!</h1>
    <p>
      Please click the button below to verify your email address and activate your
      account:
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
      Verify Email
    </a>
    <p>If you did not create an account, you can safely ignore this email.</p>
  </div>
);
