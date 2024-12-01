import { PatientForm } from "@/core/entities/PatientForm/entity/PatientForm.entity";
import {
  patientFormDuration,
  patientStatusColor,
  PatientStatusEnum,
} from "@/core/entities/PatientForm/entity/PatientForm.repository";
import { UserRole } from "@/core/entities/User/entity/User.repository";
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
  mode: UserRole;
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
  const [patientList, setPatientList] = useState<IPatientFormSocketViewModel[]>(
    []
  );

  const { handleEmitEvent, isConnected, socket } = useSocketIOConnection({
    url,
    eventHandlers: {
      "patientForm:recent": (patientForm: IPatientFormSocketViewModel) => {
        setPatientData(patientForm);
        setPatientList((prevList) => updatePatientList(prevList, patientForm));
      },
    },
  });

  const updatePatientForm = (data) => {
    handleEmitEvent("patientForm:update", data);
  };

  const patientStatus = patientStatusColor.find(
    (patient) => patient.status === patientData?.status
  );

  useEffect(() => {
    if (isSubmitSuccessful) {
      const submittedPatientData = {
        clientId: socket?.id,
        patientForm: patientData,
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

        const patientData = {
          clientId: socket?.id,
          patientForm: patient,
          status,
        };

        updatePatientForm(patientData);

        // Set inactivity timeout
        if (status === PatientStatusEnum.ACTIVE) {
          inactivityTimeout.current = setTimeout(() => {
            const inactiveData = {
              ...patientData,
              status: PatientStatusEnum.INACTIVE, // If user stops typing for 5 seconds, status becomes "inactive"
            };
            updatePatientForm(inactiveData);
          }, patientFormDuration); // 5 seconds of inactivity
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
    submitSuccess: patientStatus?.status === PatientStatusEnum.SUBMIT
  };
};

function updatePatientList(
  prevList: IPatientFormSocketViewModel[],
  newPatient: IPatientFormSocketViewModel
) {
  const existingPatient = prevList.findIndex(
    (patient) => patient.clientId === newPatient.clientId
  );

  if (existingPatient !== -1) {
    // update existing patient Data
    const updatedPatientList = [...prevList];
    updatedPatientList[existingPatient] = newPatient;
    return updatedPatientList;
  } else {
    // add new patient to the list
    return [...prevList, newPatient];
  }
}
