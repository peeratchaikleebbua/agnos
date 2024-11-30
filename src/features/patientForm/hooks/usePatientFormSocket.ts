import { PatientForm } from "@/core/entities/PatientForm/entity/PatientForm.entity";
import useSocketIOConnection from "@/shared/hooks/useSocketIOConnection";
import { useEffect, useRef, useState } from "react";
import { UseFormReset, UseFormSetValue, UseFormWatch } from "react-hook-form";

export interface IPatientFormSocketViewModel {
  clientId?: string;
  patientForm: PatientForm;
  status: string;
}

export interface IPatientFormSocket {
  url: string;
  watch: UseFormWatch<PatientForm>;
  isSubmitSuccessful?: boolean;
  receivePatientForm?: UseFormSetValue<PatientForm>;
  reset?: UseFormReset<PatientForm>;
  mode: "staff" | "patient";
}

export const usePatientFormSocket = ({
  url,
  watch,
  isSubmitSuccessful,
  receivePatientForm,
  reset,
  mode,
}: IPatientFormSocket) => {
  const inactivityTimeout = useRef<NodeJS.Timeout | null>(null);
  const [patientData, setPatientData] = useState<IPatientFormSocketViewModel>();

  const { handleEmitEvent, isConnected, socket } = useSocketIOConnection({
    url,
    eventHandlers: {
      "patientForm:recent": (patientForm: IPatientFormSocketViewModel) => {
        setPatientData(patientForm);
      },
    },
  });

  const updatePatientForm = (data) => {
    handleEmitEvent("patientForm:update", data);
  };

  useEffect(() => {
    if (mode === "patient") {
      const { unsubscribe } = watch((patient) => {
        // Clear inactivity timeout on typing
        if (inactivityTimeout.current) {
          clearTimeout(inactivityTimeout.current);
        }

        const status = isSubmitSuccessful ? "submitted" : "active";

        const patientData = {
          clientId: socket?.id,
          patientForm: patient,
          status,
        };

        console.log("run ", mode);

        updatePatientForm(patientData);

        // Set inactivity timeout
        if (status === "active") {
          inactivityTimeout.current = setTimeout(() => {
            const inactiveData = {
              ...patientData,
              status: "inactive", // If user stops typing for 5 seconds, status becomes "inactive"
            };
            updatePatientForm(inactiveData);
          }, 5000); // 5 seconds of inactivity
        }
      });

      return () => {
        if (inactivityTimeout.current) {
          clearTimeout(inactivityTimeout.current);
        }
        unsubscribe();
      };
    }
  }, [watch, isSubmitSuccessful]);

  return {
    isConnected,
    patientData,
  };
};
