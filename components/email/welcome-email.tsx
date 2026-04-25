import * as React from "react";

export const WelcomeEmail = ({ name }: { name: string }) => (
  <div style={{ fontFamily: "sans-serif", padding: "20px", color: "#152d22" }}>
    <h1>Registration Successful! 🎉</h1>
    <p>Hi {name}, your account is now fully verified.</p>
    <p>You can now log in and explore our collection of natural handcrafted goods.</p>
    <a
      href={`${process.env.NEXT_PUBLIC_SERVER_URL}/sign-in`}
      style={{ color: "#15803d" }}
    >
      Go to Sign In
    </a>
  </div>
);
