import { z } from "zod";

export const patientFormSchema = z.object({
  firstName: z.string().min(1, { message: "firstName is required" }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "lastName is required" }),
  dateOfBirth: z.string(),
  gender: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  address: z.string().min(1, { message: "address is required" }),
  preferredLanguage: z
    .string()
    .min(1, { message: "preferredLanguage is required" }),
  nationality: z.string().min(1, { message: "nationality is required" }),
  emergencyContact: z
    .object({
      name: z
        .string()
        .min(1, { message: "Emergency Contact Name is required" }),
      relationship: z.string().min(1, { message: "Relationship is required" }),
    })
    .optional(),
  religion: z.string().optional(),
});