import { useQuery } from '@apollo/react-hooks';
import { GETAUTH } from '../graphql/queries';

const useUser = () => {
  const { data, fetchMore,error, loading,  ...result} = useQuery(GETAUTH, {
    fetchPolicy: 'cache-and-network',
    variables : {"includeReviews": true ,first : 2},
  });
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    
    fetchMore({
      variables: {
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        variables : {"includeReviews": true ,first : 2},
      },
      fetchPolicy: 'cache-and-network',
    });
  };
  return { 
    user : data? data.authorizedUser : undefined,
    fetchMore : handleFetchMore,
    loading,
    ...result};
};

export default useUser;