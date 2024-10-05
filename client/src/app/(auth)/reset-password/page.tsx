import React from "react";

import Image from "next/image";
import Link from "next/link";

import FormContainer from "@/components/FormContainer";
import { Label, LabelInputContainer } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { AppButton } from "@/components/ui/AppButton";

const ResetPassword = () => {
  return (
    <div
      className="flex flex-col w-screen h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/auth-bg.png')` }}
    >
      <FormContainer className="w-[37vw] bg-black bg-opacity-70  p-4 pl-12 pr-12">
        <div className="flex flex-row items-center justify-center mb-7">
          <Image src={"/vera-icon.png"} alt="vera" width={64} height={64} />
          <h1 className="text-[30px] font-bold tracking-wider text-white">
            RESET YOUR PASSWORD
          </h1>
        </div>
        <p className="text-general-white text-[18px] mb-6">
          Enter the email address linked to your VERA account and we'll send you
          an email.
        </p>
        <LabelInputContainer className="mb-6">
          <Label htmlFor="resetPassword" className="w-[80%]">
            Email address or username
          </Label>
          <Input
            id="resetPassword"
            placeholder="musicinmyheart@gmail.com"
            type="text"
          />
        </LabelInputContainer>
        <div className="flex flex-row w-full items-center justify-center">
          <Link href={"/verify-code"}>
            <AppButton
              className="bg-general-pink hover:bg-general-pink-hover rounded-full h-12 w-[120px] group"
              type="submit"
            >
              <p className="font-bold text-[14px] text-gray-950  group-hover:text-gray-700 transition-colors duration-200">
                SEND LINK
              </p>
            </AppButton>
          </Link>
        </div>
      </FormContainer>
    </div>
  );
};

export default ResetPassword;
