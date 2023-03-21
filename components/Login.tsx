"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-screen bg-[#11A37F]">
      <Image
        src="https://uploads-ssl.webflow.com/621396eaae0610d2e24c450e/63d01548c5b3156b13a40e1f_ChatGPT-Feature-1200x900.png"
        width={300}
        height={300}
        alt="logo"
      />
      <button className="text-white text-3xl animate-pulse" onClick={() => signIn("google")}>
        Sign in to use ChatGPT
      </button>
    </div>
  );
};

export default Login;
