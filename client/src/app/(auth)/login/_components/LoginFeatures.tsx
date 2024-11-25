import Image from "next/image";
import BottomGradient from '@/components/BottomGradient';

const loginOptions = [
  {
    title: 'CONTINUE WITH FACEBOOK',
    imgSrc: '/facebook.png',
    alt: 'facebook',
  },
  { title: 'CONTINUE WITH APPLE', imgSrc: '/apple.png', alt: 'apple' },
  { title: 'CONTINUE WITH GOOGLE', imgSrc: '/google.png', alt: 'google' },
];

const LoginFeatures = () => {
  return (
    <div className="flex flex-col space-y-4">
      {loginOptions.map((network, index) => {
        return (
          <button
            className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black h-10 font-medium bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)] border border-general-pink rounded-full text-nowrap"
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
  );
};


export default LoginFeatures