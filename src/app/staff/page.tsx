"use client";

import PatientForm from "@/features/patientForm/components/PatientForm";
import { usePatientFormSocket } from "@/features/patientForm/hooks/usePatientFormSocket";
import { usePatientFormViewModel } from "@/features/patientForm/hooks/usePatientFormViewModel";
import { SOCKET_URL } from "@/infrastructures/socket-io/config/socket-io.config";
import React, { useEffect } from "react";

const StaffPage = () => {
  const { handleSubmit, onSubmit, register, watch, errors, isValid, reset } =
    usePatientFormViewModel();

  const { patientData } = usePatientFormSocket({
    url: SOCKET_URL,
    watch: watch,
    mode: "staff",
  });

  useEffect(() => {
    reset(patientData?.patientForm);
  }, [patientData]);

  return (
    <PatientForm
      status={patientData?.status}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      isValid={isValid}
      viewMode={true}
    />
  );
};

export default StaffPage;
