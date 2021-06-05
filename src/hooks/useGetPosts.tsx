import { gql, useMutation } from "@apollo/client";
import { GetPostsOutput } from "../types";

const GET_POSTS = gql`
  mutation getPosts($skipFrom: Int!) {
    getPosts(input: { skipFrom: $skipFrom }) {
      ok
      error
      postList {
        id
        title
        createdAt
        tags
        thumb
        body
        likes
        text
        user {
          id
          nickName
          avatarImg
        }
      }
    }
  }
`;

export default function useGetPosts() {
  const [getPostsMutation, { data, loading, error }] =
    useMutation<{ getPosts: GetPostsOutput }>(GET_POSTS);

  const getPosts = async (skipFrom: number) => {
    return await getPostsMutation({ variables: { skipFrom } });
  };

  return [getPosts, data, loading, error] as [
    typeof getPosts,
    typeof data,
    typeof loading,
    typeof error
  ];
}
