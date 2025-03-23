import { z } from "zod";

export const onboardingSchema = z.object({
    imageUrl: z.string().optional().default(""),
    language: z.string({
        required_error: "Please enter the language you want to learn"
    }),
    nativeLang: z.string({
        required_error: "please enter your native language"
    }),
    age: z.coerce.number({
        required_error: "Age is required",
        invalid_type_error: "Age must be a number"
    }).min(0).max(80),
});