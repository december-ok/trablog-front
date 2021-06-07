import { gql, useMutation } from "@apollo/client";
import { SearchPostOutput } from "../types";

const SEARCH_POSTS = gql`
  mutation searchPost($search: String!, $skipFrom: Int!) {
    searchPost(input: { search: $search, skipFrom: $skipFrom }) {
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

export default function useSearchPosts() {
  const [searchPostsMutation, { data, loading, error }] =
    useMutation<{ searchPost: SearchPostOutput }>(SEARCH_POSTS);

  const searchPosts = async (search: string, skipFrom: number) => {
    return await searchPostsMutation({ variables: { search, skipFrom } });
  };

  return [searchPosts, data, loading, error] as [
    typeof searchPosts,
    typeof data,
    typeof loading,
    typeof error
  ];
}
