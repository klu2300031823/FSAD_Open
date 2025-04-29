// 10.13

import { gql } from '@apollo/client';

export const SIGN_IN = gql`
    mutation authenticate($credentials: AuthenticateInput!) {
        authenticate(credentials: $credentials) {
            accessToken
    }
}
   
`;

// 10.21
export const CREATE_REVIEW = gql`
    mutation createReview($review: CreateReviewInput!) {
        createReview(review: $review) {
            repositoryId
            repository {
                id
                fullName
                reviews {
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
                    }
                }
            }
        }
}
`;




// 10.22
export const CREATE_USER = gql`
  mutation createUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
      username
    }
  }
`;
