import React from 'react';
import {StyleSheet, View,TouchableWithoutFeedback} from 'react-native'
import Text from '../Utilities/Text';
import FormikTextInput from '../Utilities/FormikTextInput'
import {Formik} from 'formik'
import theme from '../../theme'
import * as yup from 'yup'

const signUpStyles = StyleSheet.create({
    container  : {
      alignItems: 'stretch',
      backgroundColor : 'white',
    },
    createSignUpButton:
    {
        borderRadius : 5,
        backgroundColor : theme.colors.primary, 
        padding : 15, 
        textAlign : 'center',
        color : 'white',
    }
})

const initialValues = {
    username : '', 
    password : '',
    passwordconfirm  : '', 
  };
const validationSchema = yup.object().shape({
    username: yup
    .string()
    .required('Username is required')
    .min(1)
    .max(30),
    password: yup
    .string()
    .min(5)
    .max(50)
    .required('Password is required'),
     passwordConfirm: 
     yup
     .string()
     .oneOf([yup.ref('password')],`Passwords doesn't match`)
     .required('Password confirm is required')
})
export const SignUpForm = ({onSubmit}) =>{
    return (
        <View style={{margin : 15}}>
          <FormikTextInput  name="username" placeholder="Username" />
          <FormikTextInput  name="password" placeholder="Password" secureTextEntry = {true} />
          <FormikTextInput  name="passwordConfirm" placeholder="Password confrimation"  secureTextEntry = {true}/>
          <TouchableWithoutFeedback  onPress={onSubmit}>
            <Text fontWeight='bold' style={signUpStyles.createSignUpButton}>Sign up</Text>
          </TouchableWithoutFeedback>
        </View>
        );
}
const SignUp = ({onSubmit}) => {
      return (
        <View style={signUpStyles.container}>
        <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        >
          {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
        </View>
      );
};

export default SignUp;