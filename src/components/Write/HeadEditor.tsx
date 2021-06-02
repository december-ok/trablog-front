import ReactTagInput from "@pathofdev/react-tag-input";
import { ChangeEventHandler } from "react";

interface HeadEditorProps {
  data: { title: string; tags: string[] };
  onTitleChange: ChangeEventHandler;
  onTagsChange: Function;
}

export default function HeadEditor({
  data: { title, tags },
  onTitleChange,
  onTagsChange,
}: HeadEditorProps) {
  return (
    <div className="HeadEditor">
      <input className="Title" placeholder={"제목"} onChange={onTitleChange} />
      <div className="LocationTag">
        <ReactTagInput
          tags={tags}
          onChange={(newTags) => onTagsChange(newTags)}
          editable={false}
          readOnly={false}
          removeOnBackspace={true}
          placeholder="지역을 입력후 엔터를 눌러주세요 예시: 서울"
        />
      </div>
    </div>
  );
}
