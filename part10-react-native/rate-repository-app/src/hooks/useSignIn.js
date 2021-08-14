import {AUTH} from '../graphql/mutations'
import {useMutation} from '@apollo/react-hooks'
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/client';


const useSignIn = () => {
    const [mutate, result] = useMutation(AUTH);
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient()
    const signIn = async ({ username, password }) => {
      const res = await mutate({variables: {credentials: { username : username, password : password}}})
      await authStorage.setAccessToken(res.data.authorize.accessToken)
      apolloClient.resetStore();
      return res
    };
  
    return [signIn, result];
  };

export default useSignIn