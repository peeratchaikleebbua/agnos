import { PatientForm } from "@/core/entities/PatientForm/entity/PatientForm.entity";
import {
  IPaitentStatusColor,
  patientFormSchema,
} from "@/core/entities/PatientForm/entity/PatientForm.repository";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldErrors,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

export interface IPatientFormViewModel {
  status?: IPaitentStatusColor;
  handleSubmit: UseFormHandleSubmit<PatientForm>;
  onSubmit: (patientForm: PatientForm) => Promise<void>;
  register: UseFormRegister<PatientForm>;
  errors: FieldErrors<PatientForm>;
  isValid: boolean;
  viewMode?: boolean;
  label: string;
  image?: string;
}

export const usePatientFormViewModel = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    getValues,
    trigger,
    formState: { errors, isValid, isSubmitSuccessful, isSubmitted },
    setError,
  } = useForm<PatientForm>({
    mode: "all",
    resolver: zodResolver(patientFormSchema),
  });

  const onSubmit = async (patientForm: PatientForm) => {
    console.log("SUBMIT SUCCESS", patientForm);
  };

  const setPatientData = (patientForm: PatientForm) => {
    Object.entries(patientForm).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        setValue(key as keyof typeof patientForm, value, { shouldValidate: false });
      }
    });
  };

  return {
    watch,
    register,
    errors,
    setError,
    handleSubmit,
    onSubmit,
    isValid,
    isSubmitSuccessful,
    isSubmitted,
    setValue,
    reset,
    getValues,
    trigger,
    setPatientData,
  };
};
