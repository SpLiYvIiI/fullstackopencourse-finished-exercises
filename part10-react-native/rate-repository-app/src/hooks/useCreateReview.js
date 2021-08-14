import {CREATE_REVIEW} from '../graphql/mutations'
import {useMutation} from '@apollo/react-hooks'


const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);
    const createReview = async ({ repositoryName, ownerName, rating , text }) => {
      rating = parseInt(rating)
      const res = await mutate({variables: {review: {repositoryName, ownerName, rating , text}}})
      return res
    };
    return [createReview, result];
  };

export default useCreateReview