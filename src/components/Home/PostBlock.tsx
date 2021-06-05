import { Post } from "../../types";
import { getFormDate } from "./../../hooks/core";
import { Link } from "react-router-dom";
import Tags from "../Tags";

export default function PostBlock({
  post: {
    thumb,
    title,
    body,
    createdAt,
    id,
    text,
    tags,
    likes,
    user: { nickName, avatarImg, id: userId },
  },
}: {
  post: Post;
}) {
  return (
    <div className="PostBlock">
      <Link to={`/post/${id}`}>
        <div className="ImgContainer">
          <img className="Img" src={thumb} alt="thumbnail" />
        </div>
        <p className="Title">{title}</p>
      </Link>
      {Boolean(tags.length) && (
        <Tags tags={tags} readOnly={true} onChange={() => {}} />
      )}
      <Link to={`/post/${id}`}>
        <p className={tags.length ? "Body" : "highBody"}>{text.slice(0, 37)}</p>
        <p className="Date">{getFormDate(createdAt)}</p>
      </Link>
      <Link to={`/${userId}`}>
        <div className="Footer">
          <div className="UserInfo">
            <img src={avatarImg} alt="hi"></img>
            <p className="UserName">{nickName}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
