import type { ImageProps } from "next/image";
import NextImage from "next/image";

interface Props extends ImageProps {
  optimized?: boolean;
}

const optimizedBasedOnEnv = process.env.VERCEL_ENV === "production";

export function AppImage({ optimized = false, ...props }: Props) {
  return (
    <NextImage
      {...props}
      unoptimized={!(optimized && optimizedBasedOnEnv)}
      alt={props.alt}
    />
  );
}
