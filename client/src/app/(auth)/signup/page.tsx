import React from "react";

import Image from "next/image";
import SignupForm from "./_components/SignupForm";

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
          height: "100vh",
          objectFit: "contain"
        }}
        className="hidden md:block"
      />
      <SignupForm />
    </div>
  );
};

export default page;
