import { gql, useMutation } from "@apollo/client";
import { TagSearchPostOutput } from "../types";

const TAG_SEARCH_POSTS = gql`
  mutation tagSearchPost($tag: String!, $skipFrom: Int!) {
    tagSearchPost(input: { tag: $tag, skipFrom: $skipFrom }) {
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

export default function useTagSearch() {
  const [tagSearchMutation, { data, loading, error }] =
    useMutation<{ tagSearchPost: TagSearchPostOutput }>(TAG_SEARCH_POSTS);
  const tagSearchPosts = async (tag: string, skipFrom: number) => {
    return await tagSearchMutation({ variables: { tag, skipFrom } });
  };

  return [tagSearchPosts, data, loading, error] as [
    typeof tagSearchPosts,
    typeof data,
    typeof loading,
    typeof error
  ];
}
