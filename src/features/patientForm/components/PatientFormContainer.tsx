import React from "react";

const PatientFormContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      <div className="shadow-md rounded-lg px-8 py-6 w-1/2">{children}</div>
    </div>
  );
};

export default PatientFormContainer;
