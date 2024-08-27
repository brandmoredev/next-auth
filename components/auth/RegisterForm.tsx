"use client"

import React, { useState, useTransition } from 'react'
import CardWrapper from './CardWrapper'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@/schemas'
import { z } from 'zod';
import { register as registerUser } from '@/actions/register';
import FormError from '@/components/ui/formError';
import FormSuccess from '@/components/ui/formSuccess';


const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("")
  const [error, setError] = useState<string | undefined>("")

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(async() => {
      registerUser(values)
        .then(data => {
          setError(data.error)
          setSuccess(data.success)
    })
    })
  }

  return (
    <CardWrapper
      headerLabel="Auth"
      headerText="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="name"
            className="form_input"
            placeholder="John Doe"
            disabled={isPending}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            className="form_input"
            placeholder="Enter your email"
            disabled={isPending}
            {...register("email", { required: "Email should be valid" })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            className="form_input"
            type="password"
            placeholder="Enter your password"
            disabled={isPending}
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
          )}
        </div>
        
        <FormError message={error}/>
        <FormSuccess message={success}/>
        <button
          disabled={isPending}
          type="submit"
          className="btn"
        >
          Register
        </button>
      </form>
    </CardWrapper>
  )
}

export default RegisterForm
