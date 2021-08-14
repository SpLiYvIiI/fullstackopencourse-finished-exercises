import React from 'react'
import useSignIn from '../../hooks/useSignIn'
import { useHistory } from 'react-router-native';
import SignInFormConteiner from './SignInFormConteiner'


const SignIn = () => {
    const [signIn] = useSignIn();
    const history = useHistory()
    const onSubmit = async (values) => {
       const { username, password } = values;
      try {
        const { data } = await signIn({ username, password });
        history.push('/')
        console.log(data)
      } catch (e) {
        console.log(e);
      } 
    };
    return(
        <SignInFormConteiner onSubmit={onSubmit}/>
    )
}

export default SignIn