"use client";

import PatientForm from "@/features/patientForm/components/PatientForm";
import { usePatientFormSocket } from "@/features/patientForm/hooks/usePatientFormSocket";
import { usePatientFormViewModel } from "@/features/patientForm/hooks/usePatientFormViewModel";
import { SOCKET_URL } from "@/infrastructures/socket-io/config/socket-io.config";
import React from "react";

const PatientPage = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    watch,
    errors,
    isValid,
    isSubmitted,
    setValue,
  } = usePatientFormViewModel();

  console.log("error", errors);
  console.log("isValid", isValid);

  const {} = usePatientFormSocket({
    url: SOCKET_URL,
    watch: watch,
    isSubmitSuccessful: isSubmitted,
    mode: "patient",
  });
  return (
    <PatientForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      isValid={isValid}
    />
  );
};

export default PatientPage;
