import { z } from "zod";
import { patientFormSchema } from "./PatientForm.repository";

export type PatientForm = z.infer<typeof patientFormSchema>;
