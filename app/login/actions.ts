"use server";

import { z } from "zod";

const LoginFormSchema = z.object({
  email: z.string().refine( val => /@zod\.com$/.test(val), {
    message: "Only @zod.com emails are allowed"
  }),
  username: z.string().min(5, { message: "Username should be at least 5 characters long." }),
  password: z.string()
    .min(10, { message: "Password should be at least 10 characters long." })
    .refine(
      (val) => /(?=.*\d)/.test(val), {
      message: "Password should contain at least one number (0123456789)."
    }),
})

export async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = Object.fromEntries(formData.entries());

  const validationResult = LoginFormSchema.safeParse(data);
  console.log(validationResult);
  if (validationResult.success) {
    return {
      message: 'Welcome back!',
      type: 'success',
    };
  } else {
    return {
      message: '',
      type: 'error',
      errors: validationResult.error.flatten().fieldErrors,
    }
  }
}