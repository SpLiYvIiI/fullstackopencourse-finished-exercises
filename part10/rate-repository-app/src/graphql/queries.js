import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
query repositories($orderWith: AllRepositoriesOrderBy, $orderDir: OrderDirection, $searchText: String, $firstp : Int, $after : String) { 
  repositories (orderBy: $orderWith, orderDirection: $orderDir, searchKeyword: $searchText, first : $firstp , after : $after){
      edges{
          node{
            id
            ownerAvatarUrl
            fullName
            description
            language
            stargazersCount
            forksCount
            reviewCount
            ratingAverage
            language
          }
          cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
  }
}
`;


export const GET_REPOSITORY = gql`
query repo($id: ID!, $first : Int, $after : String){
  repository(id: $id) {
              id
              ownerAvatarUrl
              fullName
              description
              language
              stargazersCount
              forksCount
              reviewCount
              ratingAverage
              language
              url
              reviews (first: $first, after: $after){
                edges {
                  node {
                    id
                    text
                    rating
                    createdAt
                    user {
                      id
                      username
                    }
                  }
                  cursor
                }
                pageInfo {
                  endCursor
                  startCursor
                  hasNextPage
                }
              }
  }
}
`;


export const GETAUTH = gql`
query getAuthorizedUser($includeReviews: Boolean = false) {
  authorizedUser {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
          repository{
            id
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}
`