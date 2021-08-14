import { gql } from 'apollo-boost';

export const AUTH = gql`
mutation Authorize($credentials : AuthorizeInput) {
    authorize(credentials: $credentials) {
      accessToken
    }
}
`

export const CREATE_REVIEW = gql`
mutation create(
  $review : CreateReviewInput
) {
  createReview(
    review: $review
  ) {
    id
    user {
      username
    }
    repository {
      name
      id
    }
    rating
    createdAt
    text
  }
}
`


export const CREATE_USER = gql`
mutation createUSR($user : CreateUserInput){
  createUser(user : $user){
    id
    username
    createdAt
    reviewCount
  }
}
`

export const DELETE_REVIEW = gql`
mutation delReview($id : ID!){
  deleteReview(id : $id)
}
`