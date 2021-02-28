export interface DiagnoseEntry {
    code : string,
    name : string,
    latin? : string
} 
export interface BaseEntry {
  id: number;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}
interface Discharge {
  date: string,
  criteria: string
}
interface  SickLeave {
  startDate: string,
  endDate: string,
}
interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
interface HospitalEntry extends BaseEntry{
  type: 'Hospital',
  discharge : Discharge
}
interface OccupationalHealthcareEntry extends BaseEntry{
  type : 'OccupationalHealthcare',
  employerName: string,
  sickLeave?: SickLeave
}
export enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}
export type newPatientEntry = Omit<Patient,'id' | 'entries'>


export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type newHealthCheckEntry = Omit<HealthCheckEntry,'id'>

export type newOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry,'id'>

export type newHospitalEntry = Omit<HospitalEntry,'id'>

export type newPatientE = Omit <Entry,'id'>

export interface Patient {
  id: number;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >
