"use client";

import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import FormContainer from "@/components/FormContainer";
import { Label, LabelInputContainer } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import Separator from "@/components/Separator";
import { Checkbox } from "@/components/ui/CheckBox";
import { AppButton } from "@/components/ui/AppButton";
import { CheckedState } from "@radix-ui/react-checkbox";

const Login = () => {
  const [isRememberMe, setIsRememberMe] = useState<boolean | "indeterminate">(
    false
  );

  const loginOptions = [
    {
      title: "CONTINUE WITH FACEBOOK",
      imgSrc: "/facebook.png",
      alt: "facebook",
    },
    { title: "CONTINUE WITH APPLE", imgSrc: "/apple.png", alt: "apple" },
    { title: "CONTINUE WITH GOOGLE", imgSrc: "/google.png", alt: "google" },
  ];

  const handleRememberMe = (checked: CheckedState) => {
    setIsRememberMe(checked === true);
  };

  return (
    <div className="flex flex-row">
      <FormContainer className="flex flex-col w-[40vw] items-center justify-center">
        <div className="flex flex-row items-center justify-center mb-7">
          <Image src={"/vera-icon.png"} alt="vera" width={64} height={64} />
          <h1 className="text-[30px] font-bold tracking-wider text-white">
            LOG IN TO <span className="text-general-pink">VERA</span>
          </h1>
        </div>

        <div className="flex flex-col space-y-4">
          {loginOptions.map((network, index) => {
            return (
              <button
                className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black h-10 font-medium bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)] border border-general-pink rounded-full"
                type="submit"
                key={index}
              >
                <Image
                  src={network.imgSrc}
                  alt={network.alt}
                  width={24}
                  height={24}
                />
                <span className="text-general-white tracking-[1.5px] text-sm">
                  {network.title}
                </span>
                <BottomGradient />
              </button>
            );
          })}
        </div>

        <Separator title="or" sameBGColor="#181818" />

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address or Username</Label>
          <Input
            id="email"
            placeholder="musicinmyhear@gmail.com"
            type="email"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <a
          className="flex mb-4 underline text-general-white text-[16px] hover:text-general-pink transition-colors duration-200"
          href="/reset-password"
        >
          Forgot your password
        </a>

        <div className="flex flex-row w-full items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={isRememberMe}
              onCheckedChange={handleRememberMe}
              id="rememberMe"
              className={`w-6 h-6 rounded-md ${
                isRememberMe ? "bg-general-pink" : "bg-transparent"
              } ${
                isRememberMe ? "border-none" : "border border-general-pink"
              } flex items-center justify-center transition-colors duration-200`}
            />
            <label
              htmlFor="rememberMe"
              className="text-general-white text-sm font-medium leading-none peer-disabled  :cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <AppButton className="bg-general-pink hover:bg-general-pink-hover rounded-full h-12 w-[120px] group" type="submit">
            <p className="font-bold text-[14px] text-gray-950  group-hover:text-gray-700 transition-colors duration-200">
              LOG IN
            </p>
          </AppButton>
        </div>

        <Separator />

        <div className="flex flex-col items-center justify-between space-y-4">
          <Link
            className="text-general-white hover:text-general-pink transition-colors duration-200 no-underline"
            href="/signup"
          >
            Don't have an account?
          </Link>
          <button
            className=" relative group/btn block  w-full rounded-full h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] border border-general-pink"
            type="submit"
          >
            <p className="text-[13px] font-bold tracking-[1.5px] text-center text-general-pink">
              SIGN IN VERA
            </p>
            <BottomGradient />
          </button>
        </div>
      </FormContainer>
      <Image
        src={"/auth-welcome.png"}
        alt="welcomeImage"
        width={0}
        height={0}
        sizes="100%"
        style={{
          width: "40vw",
          height: "auto",
        }}
      />
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default Login;
