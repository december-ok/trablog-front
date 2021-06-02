import parse from "html-react-parser";
import { Post } from "../../types";

export default function BodyPost({ post: { body } }: { post: Post }) {
  return <div className="BodyPost">{parse(body)}</div>;
}
