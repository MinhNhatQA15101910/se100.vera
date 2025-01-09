'use client';

import Image from 'next/image';
import FormContainer from '@/components/FormContainer';
import { Label, LabelInputContainer } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { AppButton } from '@/components/ui/AppButton';
import Separator from '@/components/Separator';
import SegmentedControl from '@/app/(auth)/signup/_components/SegmentedControl';
import ToLogin from './ToLogin';
import { useLoading } from '@/contexts/LoadingContext';
import { useUser } from '@/contexts/UserContext';
import { z } from 'zod';
import { useState } from 'react';
import { GenderType, UserType } from '@/types/declaration';
import GenderSelection from './GenderSelection';

const signupSchema = z
  .object({
    firstname: z.string().min(1, 'First name is required'),
    lastname: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(50, 'Password must be shorter than 50 characters'),
    gender: z.enum(['male', 'female'], {
      errorMap: () => ({ message: 'Gender must be either male or female' }),
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const SignupForm = () => {
  const { setLoadingState } = useLoading();
  const { validateSignup } = useUser();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    gender: 'male',
    confirmPassword: '',
  });
  const [isRole, setIsRole] = useState<UserType>('Listener');
  const [isGender, setIsGender] = useState<GenderType>('male');
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (errors[id]) {
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
      setLoadingState(true);
      const validatedData = signupSchema.parse({
        ...formData,
        gender: isGender,
      });

      await validateSignup({
        email: validatedData.email,
        password: validatedData.password,
        firstName: validatedData.firstname,
        lastName: validatedData.lastname,
        gender: isGender,
        role: isRole,
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
            SIGN UP TO <span className="text-general-pink">VERA</span>
          </h1>
        </div>

        <div className="flex flex-row md:flex-row space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="Tyler"
              type="text"
              value={formData.firstname}
              onChange={handleInputChange}
            />
            {errors.firstname && (
              <span className="text-red-500 text-sm mt-1">
                {errors.firstname}
              </span>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Durden"
              type="text"
              value={formData.lastname}
              onChange={handleInputChange}
            />
            {errors.lastname && (
              <span className="text-red-500 text-sm mt-1">
                {errors.lastname}
              </span>
            )}
          </LabelInputContainer>
        </div>

        <GenderSelection isGender={isGender} setIsGender={setIsGender} />
        {errors.gender && (
          <span className="text-red-500 text-sm mt-1">{errors.gender}</span>
        )}

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
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
        <LabelInputContainer className="mb-4">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            placeholder="••••••••"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </span>
          )}
        </LabelInputContainer>

        <div className="flex flex-row items-end justify-between space-x-2 md:space-x-0">
          <SegmentedControl isRole={isRole} setIsRole={setIsRole} />
          <AppButton
            className="bg-general-pink hover:bg-general-pink-hover rounded-full h-12 w-[120px] group"
            type="submit"
          >
            <p className="font-bold text-[14px] text-gray-950 group-hover:text-gray-700 transition-colors duration-200">
              SIGN UP
            </p>
          </AppButton>
        </div>

        <Separator />
      </FormContainer>
      <ToLogin />
    </div>
  );
};

export default SignupForm;
