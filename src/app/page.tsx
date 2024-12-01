"use client";

import { UserRole } from "@/core/entities/User/entity/User.repository";
import { usePatientFormCoordinator } from "@/features/patientForm/hooks/coordinators/usePatientFormCoordinator";

export default function Home() {
  const { patientFormRouter } = usePatientFormCoordinator();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
      <p>Click To Observe Your Patient Customer</p>
      <div className="flex flex-row space-x-4">
        <button
          className="bg-blue-600 rounded font-bold text-white px-5 py-3 hover:bg-blue-300"
          onClick={() => patientFormRouter(UserRole.PATIENT)}
        >
          Open Patient Form
        </button>
        <button
          className="bg-orange-600 rounded font-bold text-white px-5 py-3 hover:bg-orange-300"
          onClick={() => patientFormRouter(UserRole.STAFF)}
        >
          Open Staff View Management
        </button>
      </div>
    </div>
  );
}
