import {CREATE_USER} from '../graphql/mutations'
import  {useMutation} from '@apollo/react-hooks'



const useCreateUser = () =>{
    const [mutate, result] = useMutation(CREATE_USER);
    const createUser = async ({username, password}) => {
      const res = await mutate({variables: {user : {username, password}}})
      return res
    };
    return [createUser, result];
}


export default useCreateUser;