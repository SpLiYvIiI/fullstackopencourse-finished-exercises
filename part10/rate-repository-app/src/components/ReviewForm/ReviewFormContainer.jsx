import React from 'react';
import {StyleSheet, View,TouchableWithoutFeedback} from 'react-native'
import Text from '../Utilities/Text';
import FormikTextInput from '../Utilities/FormikTextInput'
import {Formik} from 'formik'
import theme from '../../theme'
import * as yup from 'yup'

const createReviewStyles = StyleSheet.create({
    container  : {
      alignItems: 'stretch',
      backgroundColor : 'white',
    },
    createReviewButton:
    {
        borderRadius : 5,
        backgroundColor : theme.colors.primary, 
        padding : 15, 
        textAlign : 'center',
        color : 'white',
    }
})

const initialValues = {
    repositoryName : '', 
    ownerName : '',
    rating  : '', 
    text : ''
  };
const validationSchema = yup.object().shape({
    ownerName: yup
    .string()
    .required('Repository owner username is a required'),
    repositoryName: yup
    .string()
    .required('Repository name is a required'),
    rating : yup
    .number()
    .required('Rating is required')
    .min(0)
    .max(100)
})
export const CreateReviewForm = ({onSubmit}) =>{
    return (
        <View style={{margin : 15}}>
          <FormikTextInput  name="ownerName" placeholder="Repository owner name" />
          <FormikTextInput  name="repositoryName" placeholder="Repository name" />
          <FormikTextInput  name="rating" placeholder="Rating between 0 and 100" />
          <FormikTextInput  name="text" placeholder="Review" multiline = {true}/>
          <TouchableWithoutFeedback  onPress={onSubmit}>
            <Text fontWeight='bold' style={createReviewStyles.createReviewButton}>Create a Review</Text>
          </TouchableWithoutFeedback>
        </View>
        );
}
const createReview = ({onSubmit}) => {

      return (
        <View style={createReviewStyles.container}>
        <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        >
          {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
        </Formik>
        </View>
      );
};

export default createReview;