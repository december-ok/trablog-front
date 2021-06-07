import { Redirect } from "react-router-dom";
import BodyEditor from "../../components/Write/BodyEditor";
import useWrite from "../../hooks/useWrite";
import HeadEditor from "./../../components/Write/HeadEditor";

export default function Editor() {
  const [
    data,
    [newPostUser, newPost],
    onTitleChange,
    onTagsChange,
    onBodyChange,
    onTextChange,
    onThumbSet,
    uploadPost,
  ] = useWrite();

  return (
    <div className="Editor">
      {newPostUser ? <Redirect to={`/post/${newPost}`} /> : ""}
      <HeadEditor
        data={data}
        onTitleChange={onTitleChange}
        onTagsChange={onTagsChange}
      />
      <BodyEditor
        data={data}
        onBodyChange={onBodyChange}
        onTextChange={onTextChange}
        onThumbSet={onThumbSet}
      />
      <button className="Button" onClick={uploadPost}>
        기록하기
      </button>
    </div>
  );
}
