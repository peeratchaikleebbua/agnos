import { PatientForm } from "@/core/entities/PatientForm/entity/PatientForm.entity";
import {
  patientFormDuration,
  patientStatusColor,
  PatientStatusEnum,
} from "@/core/entities/PatientForm/entity/PatientForm.repository";
import { UserRole } from "@/core/entities/User/entity/User.repository";
import useSocketIOConnection from "@/shared/hooks/useSocketIOConnection";
import { useEffect, useRef, useState } from "react";
import { UseFormWatch } from "react-hook-form";

export interface IPatientFormSocketViewModel {
  clientId?: string;
  patientForm: PatientForm;
  status: string;
}

export interface IPatientFormSocket {
  url: string;
  watch: UseFormWatch<PatientForm>;
  isSubmitSuccessful?: boolean;
  mode: UserRole;
}

export const usePatientFormSocket = ({
  url,
  watch,
  isSubmitSuccessful,
  mode,
}: IPatientFormSocket) => {
  const inactivityTimeout = useRef<NodeJS.Timeout | null>(null);
  const [patientData, setPatientData] = useState<IPatientFormSocketViewModel>();

  // handle listen to event
  const { handleEmitEvent, isConnected, socket } = useSocketIOConnection({
    url,
    eventHandlers: {
      "patientForm:recent": (patientForm: IPatientFormSocketViewModel) => {
        setPatientData(patientForm);
      },
    },
  });

  const patientStatus = patientStatusColor.find(
    (patient) => patient.status === patientData?.status
  );

  // handle emit update patientData
  const updatePatientForm = (data: unknown) => {
    handleEmitEvent("patientForm:update", data);
  };

  useEffect(() => {
    if (isSubmitSuccessful && patientData) {
      const submittedPatientData: IPatientFormSocketViewModel = {
        clientId: socket?.id,
        patientForm: patientData.patientForm,
        status: PatientStatusEnum.SUBMIT,
      };
      updatePatientForm(submittedPatientData);
    }

    if (mode === UserRole.PATIENT) {
      const { unsubscribe } = watch((patient) => {
        // Clear inactivity timeout on typing
        if (inactivityTimeout.current) {
          clearTimeout(inactivityTimeout.current);
        }

        const status = isSubmitSuccessful
          ? PatientStatusEnum.SUBMIT
          : PatientStatusEnum.ACTIVE;

        const updatePatientData = {
          clientId: socket?.id,
          patientForm: patient,
          status,
        };

        updatePatientForm(updatePatientData);

        // Set inactivity timeout
        if (status === PatientStatusEnum.ACTIVE) {
          inactivityTimeout.current = setTimeout(() => {
            const inactiveData = {
              ...updatePatientData,
              status: PatientStatusEnum.INACTIVE, // If patient stops typing for interval duration, status becomes "inactive"
            };
            updatePatientForm(inactiveData);
          }, patientFormDuration); // duration of inactivity
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
    patientStatus,
    submitSuccess: patientStatus?.status === PatientStatusEnum.SUBMIT,
  };
};
