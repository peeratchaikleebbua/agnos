import { PatientForm } from "@/core/entities/PatientForm/entity/PatientForm.entity";
import useSocketIOConnection from "@/shared/hooks/useSocketIOConnection";

export interface IPatientFormSocketViewModel {
  patientForm: PatientForm;
  status: string;
}

export const usePatientFormSocket = (
  url: string,
  receivePatientForm: (receiveForm: IPatientFormSocketViewModel) => void
) => {
  const { handleEmitEvent, isConnected } = useSocketIOConnection({
    url,
    eventHandlers: {
      "patientForm:recent": (patientForm: IPatientFormSocketViewModel) => {
        receivePatientForm(patientForm);
      },
    },
  });

  const updatePatientForm = (patientForm: IPatientFormSocketViewModel) => {
    handleEmitEvent("patientForm: updatePatientForm", patientForm);
  };

  return {
    isConnected,
    updatePatientForm,
  };
};
