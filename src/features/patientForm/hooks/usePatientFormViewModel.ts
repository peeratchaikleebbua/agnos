import { PatientForm } from "@/core/entities/PatientForm/entity/PatientForm.entity";
import { patientFormSchema } from "@/core/entities/PatientForm/entity/PatientForm.repository";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const usePatientFormViewModel = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful, isSubmitted },
    setError,
  } = useForm<PatientForm>({
    mode: "onChange",
    defaultValues: {
      firstName: "Peeratchai",
      lastName: "Kleebbua",
      dateOfBirth: "2024-12-11",
      gender: "Male",
      phoneNumber: "0884452365",
      email: "pee.test@gmail.com",
      address: "bangkok",
      preferredLanguage: "thai",
      nationality: "Thailand",
      emergencyContact: {
        name: "NongPee",
        relationship: "Brother",
      },
      religion: "Buddhist",
    },
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
    isSubmitted
  };
};
