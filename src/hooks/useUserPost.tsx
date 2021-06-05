import { gql, useMutation } from "@apollo/client";
import { GetUserPostsOutput } from "../types";

const GET_USER_POSTS = gql`
  mutation getUserPosts($id: Int!, $skipFrom: Int!) {
    getUserPosts(input: { id: $id, skipFrom: $skipFrom }) {
      ok
      error
      postList {
        id
        title
        createdAt
        tags
        thumb
        text
        body
        likes
        user {
          id
          nickName
          avatarImg
        }
      }
    }
  }
`;

export default function useUserPost() {
  const [getUserPostsMutation, { data, loading, error }] =
    useMutation<{ getUserPosts: GetUserPostsOutput }>(GET_USER_POSTS);

  const getUserPosts = async (id: number, skipFrom: number) => {
    return await getUserPostsMutation({ variables: { id, skipFrom } });
  };

  return [getUserPosts, data, loading, error] as [
    typeof getUserPosts,
    typeof data,
    typeof loading,
    typeof error
  ];
}
