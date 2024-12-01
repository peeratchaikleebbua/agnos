import { z } from "zod";

export const patientFormSchema = z.object({
  firstName: z.string().min(1, { message: "กรุณากรอกชื่อจริง" }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "กรุณากรอกนามสกุล" }),
  dateOfBirth: z
    .string()
    .min(1, { message: "กรุณากรอก เดือน/วัน/ปี เกิด" })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "กรอกรูปแบบ เดือน/วัน/ปี",
    }),
  gender: z.string().min(1, { message: "กรุณาระบุเพศ" }),
  phoneNumber: z
    .string()
    .regex(/^\+?[0]\d{1,14}$/, { message: "หมายเลขโทรศัพท์ไม่ถูกต้อง" })
    .min(10, { message: "กรุณากรอกหมายเลขโทรศัพท์ให้ครบถ้วน" }),
  email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง"),
  address: z.string().min(1, { message: "กรุณากรอกที่อยู่" }),
  preferredLanguage: z.string().min(1, { message: "กรุณากรอกภาษาที่ต้องการ" }),
  nationality: z.string().min(1, { message: "กรุณากรอกสัญชาติ" }),
  emergencyContact: z
    .object({
      name: z.string(),
      relationship: z.string(),
    })
    .optional(),
  religion: z.string().optional(),
});

export enum PatientStatusEnum {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUBMIT = "submit",
}

export const patientStatusColor = [
  {
    status: PatientStatusEnum.ACTIVE,
    color: "blue",
  },
  {
    status: PatientStatusEnum.INACTIVE,
    color: "gray",
  },
  {
    status: PatientStatusEnum.SUBMIT,
    color: "green",
  },
];

export type IPaitentStatusColor = (typeof patientStatusColor)[0];

export const patientFormDuration = 1000; // millisecond unit
