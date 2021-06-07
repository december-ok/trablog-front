import axios from "axios";
import { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import { screenLoading } from "../..";

interface BodyEditorProps {
  data: { body: string };
  onBodyChange: Function;
  onTextChange: Function;
  onThumbSet: Function;
}

export default function BodyEditor({
  data: { body },
  onBodyChange,
  onTextChange,
  onThumbSet,
}: BodyEditorProps) {
  const quill = useRef<ReactQuill | null>();

  useEffect(() => {
    quill.current
      ?.getEditor()
      .getModule("toolbar")
      .addHandler("image", imageUpload);
  }, []);

  useEffect(() => {
    onTextChange(
      quill.current?.getEditor().getText().replace(/\r\n/g, "").trim()
    );
  }, [body]);

  const imageUpload = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (input.files) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append("image", file);

        screenLoading(true);
        const {
          data: {
            data: {
              image: { url },
            },
          },
        } = await axios.post(
          "https://api.imgbb.com/1/upload?key=c7000eb01c5de6dfb420be986c2e6c3e",
          formData
        );
        const range = quill.current?.getEditor().getSelection();
        onThumbSet(url);
        quill.current
          ?.getEditor()
          .insertEmbed(range?.index as number, "image", url);
        screenLoading(false);
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
        ["clean"],
      ],
      // handlers: { image: imageUpload },
    },
  };

  return (
    <>
      <ReactQuill
        value={body}
        onChange={onBodyChange as React.Dispatch<string>}
        modules={modules}
        ref={(e) => {
          quill.current = e;
        }}
      />
    </>
  );
}
