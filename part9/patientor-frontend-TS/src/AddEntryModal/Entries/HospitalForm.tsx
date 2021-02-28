import { Field } from 'formik'
import React from 'react'
import { TextField } from '../FormField'


const HospitalForm : React.FC = () => {
    return(
        <div>
        <Field
        label="Discharge date"
        placeholder="YYYY-MM-DD"
        name="discharge.date"
        component={TextField}
      />
      <Field
      label="Discharge criteria"
      placeholder="Criteria"
      name="discharge.criteria"
      component={TextField}
      />
        </div>
    )
}


export default HospitalForm