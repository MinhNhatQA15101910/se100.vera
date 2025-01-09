import React from 'react';
import Image from 'next/image';
import LoginForm from './_components/LoginForm';

const Login = () => {
  return (
    <div className="flex flex-row">
      <LoginForm />

      <Image
        src={'/auth-welcome.png'}
        alt="welcomeImage"
        width={0}
        height={0}
        sizes="100%"
        style={{
          width: '40vw',
          height: '100vh',
          objectFit: 'contain',
        }}
        className="hidden md:block"
      />
    </div>
  );
};

export default Login;
