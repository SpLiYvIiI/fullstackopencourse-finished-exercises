import {DELETE_REVIEW} from '../graphql/mutations'
import {useMutation} from '@apollo/react-hooks'
import { useApolloClient } from '@apollo/client';


const useDelete = () => {
    const [mutate, result] = useMutation(DELETE_REVIEW);
    const apolloClient = useApolloClient();
    const deleteReview = async (id) => {
      const res = await mutate({variables: {id : id}})
      apolloClient.resetStore();
      return res
    };
  
    return [deleteReview, result];
  };

export default useDelete