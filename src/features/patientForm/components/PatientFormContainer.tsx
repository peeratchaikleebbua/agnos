import Header from "@/shared/components/Header";
import React from "react";

export interface IPatientFormContainer {
  children: React.ReactNode;
  label: string;
  image?: string;
}

const PatientFormContainer = ({
  children,
  label,
  image,
}: IPatientFormContainer) => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center space-y-1">
      <Header label={label} image={image} />
      <div className="shadow-md rounded-lg px-8 py-6 sm:w-2/3 max-sm:w-3/4">{children}</div>
    </div>
  );
};

export default PatientFormContainer;
