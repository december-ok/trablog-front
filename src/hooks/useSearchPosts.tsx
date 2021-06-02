import { gql, useMutation } from "@apollo/client";
import { Post } from "../types";

const SEARCH_POSTS = gql`
  mutation searchPost($search: String!) {
    searchPost(input: { search: $search }) {
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
    useMutation(SEARCH_POSTS);

  const searchPosts = async (search: string) => {
    await searchPostsMutation({ variables: { search } });
  };

  return [searchPosts, data, loading, error] as [
    typeof searchPosts,
    typeof data,
    typeof loading,
    typeof error
  ];
}
