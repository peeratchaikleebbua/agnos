"use client";

import { UserRole } from "@/core/entities/User/entity/User.repository";
import PatientForm from "@/features/patientForm/components/PatientForm";
import { usePatientFormSocket } from "@/features/patientForm/hooks/viewModels/usePatientFormSocket";
import { usePatientFormViewModel } from "@/features/patientForm/hooks/viewModels/usePatientFormViewModel";
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
  } = usePatientFormViewModel();

  const { submitSuccess } = usePatientFormSocket({
    url: SOCKET_URL,
    watch: watch,
    isSubmitSuccessful: isSubmitted,
    mode: UserRole.PATIENT,
  });
  return (
    <PatientForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      isValid={isValid}
      label="Agnos Patient Form"
      image="/patient_image.png"
      viewMode={submitSuccess}
    />
  );
};

export default PatientPage;
