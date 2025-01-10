'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppButton } from './ui/AppButton';
import { Input } from './ui/Input';
import { useChangePasswordMutation } from '@/hooks/useUserMutation';
import { toast } from 'react-toastify';
import { useUser } from '@/contexts/UserContext';

const formSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmNewPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ['confirmNewPassword'],
  });

type FormValues = z.infer<typeof formSchema>;

const ChangePasswordForm = ({ closeModal }: { closeModal: () => void }) => {
  const { logout } = useUser();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const changePasswordMutation = useChangePasswordMutation();

  const onFormSubmit = (data: FormValues) => {
    changePasswordMutation.mutate(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          toast.success('Password Changed Successfully!, Please log in again!');
          closeModal();
          logout()
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="space-y-4 p-2 min-w-[455px]"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <AppButton
            type="submit"
            className="bg-blue-500 hover:bg-general-pink-hover transition-colors duration-200 px-8"
          >
            Save
          </AppButton>
        </div>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
