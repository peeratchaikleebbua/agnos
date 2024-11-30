"use client";

import React from "react";
import { usePatientFormViewModel } from "../hooks/usePatientFormViewModel";
import TextField from "@/shared/components/TextField";
import { usePatientFormSocket } from "../hooks/usePatientFormSocket";
import { SOCKET_URL } from "@/infrastructures/socket-io/config/socket-io.config";

const PatientForm = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    watch,
    errors,
    isValid,
    isSubmitted
  } = usePatientFormViewModel();

  const {  } = usePatientFormSocket(
    SOCKET_URL,
    watch,
    isSubmitted
  );

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className=" shadow-md rounded-lg px-8 py-6 max-w-md">
        {/* <div className="">
          <Image
            src={"next.svg"}
            alt="patientFormImage"
            
            objectFit="contain"
          />
        </div> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-3">
            <TextField
              label="First Name"
              name="firstName"
              register={register}
              error={errors.firstName}
              placeholder="Enter your first name"
            />

            <TextField
              label="Middle Name"
              name="middleName"
              register={register}
              error={errors.middleName}
              placeholder="Enter your middle name"
            />

            <TextField
              label="Last Name"
              name="lastName"
              register={register}
              error={errors.lastName}
              placeholder="Enter your last name"
            />

            <TextField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              register={register}
              error={errors.dateOfBirth}
            />

            <TextField
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              register={register}
              error={errors.phoneNumber}
              placeholder="Enter your phone number"
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              register={register}
              error={errors.email}
              placeholder="Enter your email"
            />

            <TextField
              label="Address"
              name="address"
              register={register}
              error={errors.address}
              placeholder="Enter your address"
            />

            <TextField
              label="Preferred Language"
              name="preferredLanguage"
              register={register}
              error={errors.preferredLanguage}
              placeholder="Enter your preferred language"
            />

            <TextField
              label="Nationality"
              name="nationality"
              register={register}
              error={errors.nationality}
              placeholder="Enter your nationality"
            />

            <TextField
              label="Religion"
              name="religion"
              register={register}
              error={errors.religion}
              placeholder="Enter your religion"
            />

            {/* Nested Emergency Contact Fields */}
            <TextField
              label="Emergency Contact Name"
              name="emergencyContact.name"
              register={register}
              error={errors.emergencyContact?.name}
              placeholder="Enter emergency contact name"
            />

            <TextField
              label="Emergency Contact Relationship"
              name="emergencyContact.relationship"
              register={register}
              error={errors.emergencyContact?.relationship}
              placeholder="Enter relationship"
            />
          </div>

          <button
            disabled={!isValid}
            className={`mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded ${
              isValid ? "hover:bg-blue-700" : "opacity-50"
            }`}
            type="submit"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
