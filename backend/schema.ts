import { password } from "bun";
import { z } from "zod";

export const signupSchema = z.object({
    username : z.string().min(3),
    email : z.email(),
    password : z.string().min(6)
})

export const signinSchema = z.object({
    email : z.string(),
    password : z.string().min(6)
})

export const todoSchema = z.object({
    id : z.number(),
    title : z.string()
})
