import { gql, useQuery } from "@apollo/client";

const POST_QUERY = gql`
  query getPost($id: Int!) {
    getPost(input: { id: $id }) {
      ok
      error
      post {
        id
        title
        createdAt
        tags
        thumb
        body
        likes
        user {
          id
          nickName
          avatarImg
          description
        }
      }
    }
  }
`;

export default function usePost(id: number) {
  const { data, loading, error } = useQuery(POST_QUERY, { variables: { id } });
  return [data, loading, error];
}
