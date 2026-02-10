import { object, string } from "yup";

export const loginSchema = object({
    username: string().required("Username is required"),
    password: string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
})

export const registerSchema = object({
    username: string().required("Username is required"),
    email: string().email('Invalid email format').required("Email is required"),
    password: string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
})