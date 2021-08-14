import { Field } from 'formik'
import React from 'react'
import { NumberField } from '../FormField'


const HealthCheckFrom : React.FC = () => {
    return(
        <Field
        label="Health check rating"
        name="healthCheckRating"
        component={NumberField}
        min={0}
        max={3}
    />
    )
}


export default HealthCheckFrom