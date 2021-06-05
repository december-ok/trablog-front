import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { DeletePostOutput } from "../types";

const DELETE_QUERY = gql`
  mutation deletePost($id: Int!) {
    deletePost(input: { id: $id }) {
      ok
      error
    }
  }
`;

export default function useDelete(id: number) {
  const [moveNextPage, setMoveNextPage] = useState<boolean>(false);
  const [deletePostMutation] = useMutation<{
    deletePost: DeletePostOutput;
  }>(DELETE_QUERY, { variables: { id } });

  const deletePost = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const { data } = await deletePostMutation();
      if (data?.deletePost) {
        const { ok } = data?.deletePost;
        if (ok) {
          setMoveNextPage(true);
        } else {
          alert("권한이 없습니다.");
        }
      }
    }
  };

  return [deletePost, moveNextPage] as [typeof deletePost, typeof moveNextPage];
}
