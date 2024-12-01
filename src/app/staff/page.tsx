"use client";

import { UserRole } from "@/core/entities/User/entity/User.repository";
import PatientForm from "@/features/patientForm/components/PatientForm";
import { usePatientFormSocket } from "@/features/patientForm/hooks/viewModels/usePatientFormSocket";
import { usePatientFormViewModel } from "@/features/patientForm/hooks/viewModels/usePatientFormViewModel";
import { SOCKET_URL } from "@/infrastructures/socket-io/config/socket-io.config";
import React, { useEffect } from "react";

const StaffPage = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    watch,
    errors,
    isValid,
    setPatientData,
  } = usePatientFormViewModel();

  const { patientData, patientStatus } = usePatientFormSocket({
    url: SOCKET_URL,
    watch: watch,
    mode: UserRole.STAFF,
  });

  useEffect(() => {
    if (patientData) {
      setPatientData(patientData?.patientForm);
    }
  }, [patientData]);

  return (
    <PatientForm
      status={patientStatus}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      isValid={isValid}
      viewMode={true}
      label="Agnos Staff Management"
      image="/staff_image.png"
    />
  );
};

export default StaffPage;
