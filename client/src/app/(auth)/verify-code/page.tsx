"use client";

import React, { useState } from "react";

import Link from "next/link";

import ReactCodeInput from "react-code-input";

import { AppButton } from "@/components/ui/AppButton";

const VerifyCode = () => {
  const [code, setCode] = useState<string>("");

  const handleChange = (value: string) => {
    setCode(value);
    console.log("Entered Code:", value);
  };

  return (
    <div
      className="flex flex-col w-screen h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/auth-bg.png')` }}
    >
      <div className="flex flex-col items-center justify-center bg-black bg-opacity-70 p-4">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full max-w-[400px] mb-4">
            <h1 className="text-[30px] font-bold tracking-wider text-white">
              Verify your code
            </h1>
            <p className="text-[18px] text-gray-400">
              Enter the passcode you just received on your email address ending
              with ********in@gmail.com
            </p>
          </div>
          <ReactCodeInput
            className="flex space-x-3 mb-4"
            type="number"
            fields={6}
            onChange={handleChange}
            inputStyle={{
              backgroundColor: "transparent",
              width: "70px",
              height: "70px",
              borderRadius: "4px",
              border: "1px solid #EE10B0",
              color: "var(--general-white)",
              textAlign: "center",
              fontSize: "40px",
              MozAppearance: "textfield",
              WebkitAppearance: "none", 
              appearance: "none",
            }}
            name={""}
            inputMode={"numeric"}
          />
          <div className="flex flex-row w-full items-center justify-center">
            <Link href={"/login"}>
              <AppButton
                className="bg-general-pink hover:bg-general-pink-hover rounded-full h-12 w-[120px] group"
                type="button"
              >
                <p className="font-bold text-[14px] text-gray-950  group-hover:text-gray-700 transition-colors duration-200">
                  VERIFY
                </p>
              </AppButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
