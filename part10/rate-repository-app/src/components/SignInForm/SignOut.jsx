import { useEffect, useContext } from 'react'
import AuthStorageContext from '../../contexts/AuthStorageContext'
import { useApolloClient } from '@apollo/client';
import {useHistory} from 'react-router-native'


const SignOut = () =>{
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();
    const history = useHistory()
    const logOut = async () =>{
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
      history.push('/')
    }
    useEffect(()=>{
        logOut()
    },[])
    return(null)
}

export default SignOut;