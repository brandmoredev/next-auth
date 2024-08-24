import { z } from 'zod';

//Zod is a TypeScript-first schema declaration and validation library
//that helps you define and validate data structures,
//ensuring that they conform to specific rules before being used in your application.

const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});


const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(1, {
    message: "Minimum of 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required"
  })
})

export { LoginSchema, RegisterSchema }