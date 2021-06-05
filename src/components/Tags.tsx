import ReactTagInput from "@pathofdev/react-tag-input";
import { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";

interface TagsProps {
  tags: string[];
  readOnly: boolean;
  onChange: () => void;
}

export default function Tags(props: TagsProps) {
  const [search, setSearch] = useState<string | undefined>();
  const tag = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (props.readOnly) {
      const tagList = tag.current?.childNodes[0].childNodes;
      tagList?.forEach((e: any) => {
        e.onclick = function () {
          setSearch(e.innerText);
        };
      });
    }
  }, []);

  return (
    <div ref={tag}>
      {search && <Redirect to={`/search?query=${search}`} />}
      <ReactTagInput {...props} />
    </div>
  );
}
