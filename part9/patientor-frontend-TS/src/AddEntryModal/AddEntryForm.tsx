import { Field, Form, Formik } from 'formik'
import React from 'react'
import { Button, Grid } from 'semantic-ui-react'
import { DiagnosisSelection, TextField } from './FormField'
import { useStateValue } from '../state'
import {EntryTypes} from '../types'
import { assertNever } from '../helper'
import DetermineForm from './Entries/DetermineForm'


interface Props {
    onSubmit: (values: unknown) => void;
    onCancel: () => void;
    entryType : EntryTypes | undefined
  }
const determineType = (entryType : EntryTypes) => {
    switch(entryType){
      case 'HealthCheck':
        return{
          type : entryType,
          healthCheckRating: 0
        };
      case 'Hospital':
        return{
          type : entryType,
          discharge: {
              date: "",
              criteria: ""
            }
        };
      case 'OccupationalHealthcare':
      return {
          type : entryType,
          employerName: "",
          sickLeave: {
              startDate: "",
              endDate: ""
          }
      };
      default:
        return assertNever(entryType);
    }
}
const AddEntry : React.FC<Props> = ({onSubmit , onCancel , entryType}) =>{
    const [{ diagnosis }] = useStateValue()
    if(!entryType) return null
    return (
      <Formik
      initialValues={{
          description: "",
          date : "",
          specialist : "",
          diagnosisCodes : [],
          ...determineType(entryType)
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.diagnosisCodes) {
            errors.diagnosisCodes = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
  
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DetermineForm entryType={entryType}/>
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            /> 

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
    );
  
}

export default AddEntry