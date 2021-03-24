import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const { data, fetchMore,error, loading,  ...result} = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables : {'id' : id,first : 4},
  });
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        variables : {'id' : id,first : 4},
      },
      fetchPolicy: 'cache-and-network',
    });
  };
  return { 
    repository : data? data.repository : undefined ,
    fetchMore : handleFetchMore,
    loading,
    ...result};
};

export default useRepository;