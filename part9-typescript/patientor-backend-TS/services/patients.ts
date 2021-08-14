import {newPatientEntry,Patient,newHospitalEntry,newHealthCheckEntry,newPatientE,newOccupationalHealthcareEntry, Entry} from '../types'
import patientData from '../data/patients'


const getEntries = (): Patient[] =>{
    return patientData
}
const getNonSensitiveEntries = () : Patient[] => {
    return patientData.map(patient=>{
        return {
            id : patient.id,
            name : patient.name,
            gender : patient.gender,
            ssn : patient.ssn,
            dateOfBirth : patient.dateOfBirth,
            occupation : patient.occupation,
            entries : patient.entries
        }
    })
}
const findById = (id : number): Patient | undefined => {
    const entry = patientData.find(patient => patient.id === id)
    return entry
}

const addPatient = (patient : newPatientEntry) : Patient => {
    const newPatient = {
        id: Math.max(...patientData.map(d => d.id)) + 1,
        entries : [],
        ...patient
    };
    patientData.push(newPatient)
    return newPatient
}
const addNewEntry = (newPatientE  : newPatientE, patientId : number) : Entry=>{
    const patient = patientData.find(patient => patient.id === patientId)
    if(!patient){
        throw new Error(`Patient with id ${patientId} doesn't exist in database`)
    }
    let newPatientEWithId;
    switch(newPatientE.type){
        case 'HealthCheck':
            newPatientEWithId = {
                id: Math.max(...patient.entries.map(d => d.id)) + 1,
                ...newPatientE as newHealthCheckEntry
            };
            break;
        case 'Hospital' :
            newPatientEWithId ={
                id: Math.max(...patient.entries.map(d => d.id)) + 1,
                ...newPatientE as newHospitalEntry
            };
            break;
        case 'OccupationalHealthcare':
            newPatientEWithId ={
                id: Math.max(...patient.entries.map(d => d.id)) + 1,
                ...newPatientE as newOccupationalHealthcareEntry
            };
            break;
        default:
            throw new Error(`Entry type ${newPatientE.type} doesn't exist`);
    }
    patient.entries = patient.entries.concat(newPatientEWithId);
    return newPatientEWithId
}

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    findById,
    addNewEntry
}

