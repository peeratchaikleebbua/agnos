import { PatientForm } from "@/core/entities/PatientForm/entity/PatientForm.entity";
import { IPaitentStatusColor, patientFormSchema } from "@/core/entities/PatientForm/entity/PatientForm.repository";
import { IStatus } from "@/shared/components/Status";
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
  image?: string
}

export const usePatientFormViewModel = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid, isSubmitSuccessful, isSubmitted },
    setError,
  } = useForm<PatientForm>({
    mode: "all",
    // defaultValues: {
    //   firstName: "Peeratchai",
    //   lastName: "Kleebbua",
    //   dateOfBirth: "2024-12-11",
    //   gender: "Male",
    //   phoneNumber: "0884452365",
    //   email: "pee.test@gmail.com",
    //   address: "bangkok",
    //   preferredLanguage: "thai",
    //   nationality: "Thailand",
    //   emergencyContact: {
    //     name: "NongPee",
    //     relationship: "Brother",
    //   },
    //   religion: "Buddhist",
    // },
    resolver: zodResolver(patientFormSchema),
  });

  const onSubmit = async (patientForm: PatientForm) => {
    console.log("SUBMIT SUCCESS", patientForm);
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
    reset
  };
};