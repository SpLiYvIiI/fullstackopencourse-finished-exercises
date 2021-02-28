import React from 'react'
import { assertNever } from '../../helper';
import { EntryTypes } from '../../types'
import HealthCheckFrom from './HealthCheckFrom';
import HospitalForm from './HospitalForm';
import OccupationalHealthcareForm from './OccupationalHealthcareForm'

interface Props {
    entryType : EntryTypes;
}
const DetermineForm : React.FC<Props> = ({entryType}) =>{
    switch(entryType){
        case 'HealthCheck':
            return <HealthCheckFrom />
        case 'Hospital':
            return <HospitalForm />
        case 'OccupationalHealthcare':
            return <OccupationalHealthcareForm />
        default:
            return assertNever(entryType)
    }
}


export default DetermineForm;