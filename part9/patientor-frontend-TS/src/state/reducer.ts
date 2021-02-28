import { State } from "./state";
import { Patient,Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    } |
    {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    } | 
    {
      type: "ADD_ENTRY",
      payload :{
        id : number,
        entry : Entry
      }
    }
    ;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSIS_LIST":{
      return{
        ...state,
        diagnosis : action.payload
      }
    }

    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":{
      state.patients[action.payload.id].entries.push(action.payload.entry)
      return state
    }
    default:
      return state;
  }
};

export const setPatientList  = (patientList : Patient[]) : Action => {
  return { 
    type: "SET_PATIENT_LIST", 
    payload: patientList 
  }
}

export const addPatient = (newPatient : Patient) : Action =>{
  return{
    type: "ADD_PATIENT",
     payload: newPatient
  }
}
export const addEntry = (newEntry : Entry, id : number) : Action =>{
  return{
    type : 'ADD_ENTRY',
    payload : {
      id : id,
      entry : newEntry
    }
  }
}
export const setDiagnosisList = (diagnosisList : Diagnosis[]) : Action =>{
  return{
    type : "SET_DIAGNOSIS_LIST",
    payload : diagnosisList
  }
}