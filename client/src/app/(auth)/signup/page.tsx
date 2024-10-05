import React from "react";

import Image from "next/image";
import Link from "next/link";
import FormContainer from "@/components/FormContainer";
import { Label, LabelInputContainer } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { AppButton } from "@/components/ui/AppButton";
import Separator from "@/components/Separator";
import SegmentedControl from "@/components/SegmentedControl";

const page = () => {
  return (
    <div className="flex flex-row">
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
      <FormContainer className="w-[40vw]">
        <div className="flex flex-row items-center justify-center mb-7">
          <Image src={"/vera-icon.png"} alt="vera" width={64} height={64} />
          <h1 className="text-[30px] font-bold tracking-wider text-white">
            SIGN UP TO <span className="text-general-pink">VERA</span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div>
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
        <LabelInputContainer className="mb-4">
          <Label htmlFor="confirPassword">Confirm password</Label>
          <Input id="confirPassword" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <div className="flex flex-row items-end justify-between">
          <SegmentedControl />
          <AppButton className="bg-general-pink hover:bg-general-pink-hover rounded-full h-12 w-[120px] group" type="submit">
            <p className="font-bold text-[14px] text-gray-950  group-hover:text-gray-700 transition-colors duration-200">
              SIGN UP
            </p>
          </AppButton>
        </div>

        <Separator />

        <div className="flex flex-col items-center justify-between space-y-4">
          <Link
            className="text-general-white hover:text-general-pink transition-colors duration-200 no-underline"
            href="/login"
          >
            Already have an account?
          </Link>
          <button
            className=" relative group/btn block  w-full rounded-full h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] border border-general-pink"
            type="submit"
          >
            <p className="text-[13px] font-bold tracking-[1.5px] text-center text-general-pink">
              SIGN UP FOR VERA
            </p>
            <BottomGradient />
          </button>
        </div>
      </FormContainer>
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

export default page;
