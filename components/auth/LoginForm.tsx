"use client"

import React, { useState, useTransition } from 'react'
import CardWrapper from './CardWrapper'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schemas'
import { z } from 'zod';
import { login } from '@/actions/login';
import FormError from '@/components/ui/formError';
import FormSuccess from '@/components/ui/formSuccess';


const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("")
  const [error, setError] = useState<string | undefined>("")
  const [statusBar, setStatusBar] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(async() => {
      setStatusBar(true)

      login(values)
        .then(data => {
          console.log(data)
          setError(data?.error)
    })
    })
  }

  return (
    <CardWrapper
      headerLabel="Auth"
      headerText="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            className="form_input"
            placeholder="Enter your email"
            disabled={isPending}
            {...register("email", { required: "Email is required", onChange: () => setStatusBar(false) })}
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
            
            {...register("password", { required: "Password is required", onChange: () => setStatusBar(false) })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
          )}
        </div>
        
        { statusBar &&
          <>
            <FormError message={error}/>
            <FormSuccess message={success}/>
          </>
        }
        
        <button
          disabled={isPending}
          type="submit"
          className={`${isPending ? "btn_disabled" : "btn"}`}
        >
          Login
        </button>
      </form>
    </CardWrapper>
  )
}

export default LoginForm
