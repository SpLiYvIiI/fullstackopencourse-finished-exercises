import React from 'react'
import { useHistory } from 'react-router'
import useCreateUser from '../../hooks/useCreateUser'
import SignUpFormContainer from './SignUpContainer'




const SignUp = () =>{
    const [createUser] = useCreateUser();
    const history = useHistory()
    const onSubmit = async (values) => {
        const { username, password } = values;
       try {
         const { data } = await createUser({ username, password });
         history.push('/signin')
         console.log(data)
       } catch (e) {
         console.log(e);
       } 
     };
    return(
        <SignUpFormContainer onSubmit={onSubmit}/>
    )
}


export default SignUp;