import { useQuery ,} from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sortBy,text) => {
  let variables = {}
  switch(sortBy){
    case 'lowest':
      variables = {orderWith:"RATING_AVERAGE", orderDir: "ASC",searchText : text, first : 8};
      break;
    case 'highest':
      variables = {orderWith:"RATING_AVERAGE", orderDir: "DESC",searchText : text , first : 8};
       break;
    default:
      variables = {orderWith:"CREATED_AT", orderDir: "DESC",searchText : text, first : 8};
  }
  const { data, error, fetchMore, loading , ...result} = useQuery(GET_REPOSITORIES, { 
    variables : {...variables},
    fetchPolicy: 'cache-and-network',
  });
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
      fetchPolicy: 'cache-and-network',
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore : handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;