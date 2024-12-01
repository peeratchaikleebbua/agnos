import { UserRole } from "@/core/entities/User/entity/User.repository";
import { useRouter } from "next/navigation";

export const usePatientFormCoordinator = () => {
  const router = useRouter();
  const patientFormRouter = (role: UserRole) => {
    switch (role) {
      case UserRole.PATIENT:
        router.push("/patient");
        break;
      case UserRole.STAFF:
        router.push("/staff");
        break;
      default:
        break;
    }
  };

  return {
    patientFormRouter,
  };
};
