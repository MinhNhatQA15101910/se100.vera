'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useUser } from '@/contexts/UserContext';
import { useLoading } from '@/contexts/LoadingContext';
import Image from 'next/image';
import FormContainer from '@/components/FormContainer';
import { Label, LabelInputContainer } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import Separator from '@/components/Separator';
import { Checkbox } from '@/components/ui/check-box';
import { AppButton } from '@/components/ui/AppButton';
import LoginFeatures from './LoginFeatures';
import ToSignup from './ToSignup';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const LoginForm = () => {
  const { login } = useUser();
  const { isLoading, setLoadingState } = useLoading();
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [id]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = loginSchema.parse(formData);
      setLoadingState(true);

      await login({
        email: validatedData.email,
        password: validatedData.password,
        rememberMe: isRememberMe,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path[0]] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <div className="flex flex-col w-[40vw] items-center justify-center">
      <FormContainer onSubmit={handleSubmit}>
        <div className="flex flex-row items-center justify-center mb-7">
          <Image src={'/vera-icon.png'} alt="vera" width={64} height={64} />
          <h1 className="text-[30px] font-bold tracking-wider text-white text-nowrap">
            LOG IN TO <span className="text-general-pink">VERA</span>
          </h1>
        </div>

        <LoginFeatures />

        <Separator title="or" sameBGColor="#181818" />

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address or Username</Label>
          <Input
            id="email"
            placeholder="musicinmyhear@gmail.com"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">{errors.email}</span>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">{errors.password}</span>
          )}
        </LabelInputContainer>

        <a
          className="flex mb-4 underline text-general-white text-[16px] hover:text-general-pink transition-colors duration-200"
          href="/reset-password"
        >
          Forgot your password
        </a>

        <div className="flex flex-row w-full items-center justify-between">
          <div className="flex items-center space-x-2 group">
            <Checkbox
              checked={isRememberMe}
              onCheckedChange={() => setIsRememberMe((prevState) => !prevState)}
              id="rememberMe"
              className={`w-6 h-6 rounded-md ${
                isRememberMe ? 'bg-general-pink' : 'bg-transparent'
              } border-general-pink flex items-center justify-center transition-colors duration-200 group-hover:border-general-pink-hover`}
            />
            <label
              htmlFor="rememberMe"
              className="text-general-white text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-hover:text-general-pink-hover transition-colors duration-200"
            >
              Remember me
            </label>
          </div>
          <AppButton
            type="submit"
            className="bg-general-pink hover:bg-general-pink-hover rounded-full h-12 w-[120px] group"
            disabled={isLoading}
          >
            <p className="font-bold text-[14px] text-gray-950 group-hover:text-gray-700 transition-colors duration-200">
              LOG IN
            </p>
          </AppButton>
        </div>
        <Separator />
      </FormContainer>
      <ToSignup />
    </div>
  );
};

export default LoginForm;
