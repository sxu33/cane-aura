import { z } from "zod";
import { formatNumberWithDecimals } from "./utils";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimals(Number(value))),
    "Price must be in the right format, e.g., 87.20"
  );

export const insertProductSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),

  category: z.string().min(3, "category must be at least 3 characters"),

  description: z.string().min(3, "Description must be at least 3 characters"),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  price: currency,
  brand: z.string().min(3, "Brand must be at least 3 characters"),
  countInStock: z.coerce.number(),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
});

// Schema for sign in
export const signInSchema = z.object({
  email: z.email("Invalid email address").transform((e) => e.trim().toLowerCase()),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

//Schema for sign up
export const signUpSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.email("Invalid email address").transform((e) => e.trim().toLowerCase()),
    password: z.string().trim().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .trim()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

//Schema for emailTokenSchema
export const emailTokenSchema = z.object({
  token: z.string().min(1, "token should not be empty"),
});

// Schema for resending verification email
export const resendEmailSchema = z.object({
  email: z.email("Invalid email address").transform((e) => e.trim().toLowerCase()),
});
