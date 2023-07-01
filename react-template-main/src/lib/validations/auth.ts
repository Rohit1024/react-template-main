import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

export type registerSchemaType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be atleast 6 characters" }),
});

export type loginSchemaType = z.infer<typeof loginSchema>;


export const profileSchema = z.object({
  displayName: z.string().min(1, {message : "Display Name Required"}),
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
});

export type profileSchemaType = z.infer<typeof profileSchema>;

export const forgotPasswordSchema = z
.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  })
})

export type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
