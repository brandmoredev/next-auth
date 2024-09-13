"use server"
import bcrypt from "bcrypt";

import * as z from "zod"
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/utils/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async(values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields"}
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email);

  // if user tries to login with a provider account
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Something went wrong!"}
  }

  // Resend a new verification email if user is not verified
  if (!existingUser.emailVerified) {
    const isMatchingPassword = await bcrypt.compare(password, existingUser.password);
    console.log("TEST", isMatchingPassword)
    
    if (isMatchingPassword) {
      const verificationToken = await generateVerificationToken(existingUser.email)
  
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      )
    } else {
      return { error: "Invalid credentials"}
    }
    
    return { success: "Confirmation email sent" }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!"}
        default:
          return { error: "Something went wrong"}
      }
    }

    throw error
  }
}