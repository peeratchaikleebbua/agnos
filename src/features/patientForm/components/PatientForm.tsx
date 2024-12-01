"use client";

import React from "react";
import { IPatientFormViewModel } from "../hooks/viewModels/usePatientFormViewModel";
import TextField from "@/shared/components/TextField";
import PatientFormContainer from "./PatientFormContainer";
import Status from "@/shared/components/Status";

const PatientForm = ({
  status,
  handleSubmit,
  onSubmit,
  register,
  errors,
  isValid,
  viewMode = false,
  label,
  image,
}: IPatientFormViewModel) => {
  return (
    <PatientFormContainer label={label} image={image}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-3">
          <TextField
            label="First Name"
            name="firstName"
            register={register}
            error={errors.firstName}
            placeholder="Enter your first name"
            viewMode={viewMode}
          />

          <TextField
            label="Middle Name"
            name="middleName"
            register={register}
            error={errors.middleName}
            placeholder="Enter your middle name"
            viewMode={viewMode}
          />

          <TextField
            label="Last Name"
            name="lastName"
            register={register}
            error={errors.lastName}
            placeholder="Enter your last name"
            viewMode={viewMode}
          />

          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            register={register}
            error={errors.dateOfBirth}
            placeholder="วันเกิด"
            viewMode={viewMode}
          />

          <TextField
            label="Gender"
            name="gender"
            register={register}
            error={errors.gender}
            placeholder="Enter your gender"
            viewMode={viewMode}
          />

          <TextField
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            register={register}
            error={errors.phoneNumber}
            placeholder="Enter your phone number"
            viewMode={viewMode}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
            placeholder="Enter your email"
            viewMode={viewMode}
          />

          <TextField
            label="Address"
            name="address"
            register={register}
            error={errors.address}
            placeholder="Enter your address"
            viewMode={viewMode}
          />

          <TextField
            label="Preferred Language"
            name="preferredLanguage"
            register={register}
            error={errors.preferredLanguage}
            placeholder="Enter your preferred language"
            viewMode={viewMode}
          />

          <TextField
            label="Nationality"
            name="nationality"
            register={register}
            error={errors.nationality}
            placeholder="Enter your nationality"
            viewMode={viewMode}
          />

          {/* Nested Emergency Contact Fields */}
          <TextField
            label="Emergency Contact Name"
            name="emergencyContact.name"
            register={register}
            error={errors.emergencyContact?.name}
            placeholder="Enter emergency contact name"
            viewMode={viewMode}
          />

          <TextField
            label="Emergency Contact Relationship"
            name="emergencyContact.relationship"
            register={register}
            error={errors.emergencyContact?.relationship}
            placeholder="Enter relationship"
            viewMode={viewMode}
          />
          {/* Nested Emergency Contact Fields */}

          <TextField
            label="Religion"
            name="religion"
            register={register}
            error={errors.religion}
            placeholder="Enter your religion"
            viewMode={viewMode}
          />
          {status && <Status status={status} />}
        </div>
        {!viewMode && (
          <button
            disabled={!isValid}
            className={`mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded ${
              isValid ? "hover:bg-blue-700" : "opacity-50"
            }`}
            type="submit"
          >
            submit
          </button>
        )}
      </form>
    </PatientFormContainer>
  );
};

export default PatientForm;
