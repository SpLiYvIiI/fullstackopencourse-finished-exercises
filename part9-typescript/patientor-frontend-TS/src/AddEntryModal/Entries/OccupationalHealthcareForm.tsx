import { Field } from 'formik'
import React from 'react'
import {TextField } from '../FormField'


const OccupationalHealthcareForm : React.FC = () => {
    return(
        <div>
        <Field 
            label="Employer name"
            placeholder="Name"
            name="employerName"
            component={TextField}
        />
        <Field 
            label="Sick leave start"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
        />
        <Field 
            label="Sick leave end"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
        />
        </div>
    )
}


export default OccupationalHealthcareForm