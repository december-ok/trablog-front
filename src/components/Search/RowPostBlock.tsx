import { Post } from "../../types";
import Tags from "./../Tags";
import { Link } from "react-router-dom";

export default function RowPostBlock({ post }: { post: Post }) {
  return (
    <div className="RowPostBlock">
      <Link to={`/post/${post.id}`}>
        <div className="ImgContainer">
          <img src={post.thumb} />
        </div>
        <h1>{post.title}</h1>
        <p>{post.text.slice(0, 140)}</p>
      </Link>
      <Tags tags={post.tags} readOnly={true} onChange={() => {}} />
      <Link to={`/${post.user.id}`}>
        <div className="User">
          <img src={post.user.avatarImg} />
          <p>{post.user.nickName}</p>
        </div>
      </Link>
      <hr />
    </div>
  );
}
