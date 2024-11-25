'use client';

import React, { useState } from 'react';
import FormContainer from '@/components/FormContainer';
import Image from 'next/image';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { LabelInputContainer } from '@/components/ui/Label';
import { AppButton } from '@/components/ui/AppButton';
import { useUser } from '@/contexts/UserContext';
import * as z from 'zod';
import { useLoading } from '@/contexts/LoadingContext';

const resetPasswordSchema = z.object({
  email: z.string().email(),
});

const ResetPasswordForm = () => {
  const { resetPassword } = useUser();
  const { setIsLoading } = useLoading();
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );
  const [formData, setFormData] = useState({
    email: '',
  });

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

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    try {
      setIsLoading(true);
      const validatedData = resetPasswordSchema.parse(formData);

      await resetPassword({
        email: validatedData.email,
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
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer
      className="flex flex-col bg-black bg-opacity-70 p-4 mx-4 md:mx-0"
      onSubmit={handleFormSubmission}
    >
      <div className="flex flex-col md:flex-row items-center gap-4 mb-7">
        <Image src="/vera-icon.png" alt="vera" width={64} height={64} />
        <h1 className="text-[24px] md:text-[30px] font-bold tracking-wider text-white text-center md:text-left">
          RESET YOUR PASSWORD
        </h1>
      </div>
      <p className="text-general-white text-[16px] md:text-[18px] mb-3 max-w-[500px] text-center md:text-left">
        Enter the email address linked to your VERA account and we&apos;ll send
        you an email.
      </p>
      <LabelInputContainer className="mb-3 w-full">
        <Label htmlFor="resetPassword">Email address or username</Label>
        <Input
          id="resetPassword"
          placeholder="musicinmyheart@gmail.com"
          type="email"
          className="w-full"
          onChange={handleInputChange}
        />
        {errors.email && (
          <span className="text-red-500 text-sm mt-1">{errors.email}</span>
        )}
      </LabelInputContainer>
      <div className="flex w-full items-center justify-center">
        <AppButton
          className="bg-general-pink hover:bg-general-pink-hover rounded-full h-12 w-full md:w-[120px] group"
          type="submit"
        >
          <p className="font-bold text-[14px] text-gray-950 group-hover:text-gray-700 transition-colors duration-200">
            SEND LINK
          </p>
        </AppButton>
      </div>
    </FormContainer>
  );
};

export default ResetPasswordForm;
