import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { screenLoading } from "..";

const initBody = `<h1><span style="color: rgb(136, 136, 136);">기록을 작성해보세요!</span></h1>`;

const CREATE_POST = gql`
  mutation createPost($createPostInput: CreatePostInput!) {
    createPost(input: $createPostInput) {
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
        }
      }
    }
  }
`;

export default function useWrite() {
  const [newPost, setNewPost] = useState<number[]>([0, 0]);

  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [body, setBody] = useState<string>(initBody);
  const [text, setText] = useState<string>("");
  const [thumb, setThumb] = useState<string>();
  const [createPost] = useMutation(CREATE_POST);

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value.trim());
  };
  const onTagsChange = (newTags: string[]) => {
    setTags(newTags);
  };
  const onBodyChange = (newBody: string) => {
    setBody(newBody);
  };
  const onTextChange = (newText: string) => {
    setText(newText);
  };
  const onThumbSet = (url: string) => {
    setThumb(url);
  };
  const uploadPost = async () => {
    try {
      screenLoading(true);
      const {
        data: {
          createPost: { post },
        },
      } = await createPost({
        variables: { createPostInput: { title, tags, thumb, body, text } },
      });
      screenLoading(false);
      setNewPost([post.user.id, post.id]);
    } catch (error) {
      alert("제목과 본문을 작성하세요.");
      screenLoading(false);
    }
  };

  const state = { title, tags, body, thumb, text };
  return [
    state,
    newPost,
    onTitleChange,
    onTagsChange,
    onBodyChange,
    onTextChange,
    onThumbSet,
    uploadPost,
  ] as [
    typeof state,
    typeof newPost,
    typeof onTitleChange,
    typeof onTagsChange,
    typeof onBodyChange,
    typeof onTextChange,
    typeof onThumbSet,
    typeof uploadPost
  ];
}
