import React from 'react';
import {StyleSheet, View,TouchableWithoutFeedback} from 'react-native'
import Text from '../Utilities/Text';
import FormikTextInput from '../Utilities/FormikTextInput'
import {Formik} from 'formik'
import theme from '../../theme'
import * as yup from 'yup'

const signInStyles = StyleSheet.create({
    container  : {
      alignItems: 'stretch',
      backgroundColor : 'white',
    },
    signInButton:
    {
        borderRadius : 5,
        backgroundColor : theme.colors.primary, 
        padding : 15, 
        textAlign : 'center',
        color : 'white',
    }
})

const initialValues = {
    username: '',
    password: '',
  };
const validationSchema = yup.object().shape({
    username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
})
export const SignInForm = ({onSubmit}) =>{
  
    return (
        <View style={{margin : 15}}>
          <FormikTextInput testID="usernameField" name="username" placeholder="Username" />
          <FormikTextInput testID="passwordField" name="password" placeholder="Password" secureTextEntry = {true} />
          <TouchableWithoutFeedback testID="submitButton" onPress={onSubmit}>
            <Text fontWeight='bold' style={signInStyles.signInButton}>Sign in</Text>
          </TouchableWithoutFeedback>
        </View>
        );
}
const SignIn = ({onSubmit}) => {

      return (
        <View style={signInStyles.container}>
        <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        >
          {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
        </View>
      );
};

export default SignIn;