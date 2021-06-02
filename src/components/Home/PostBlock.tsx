import { Maybe, Post } from "../../types";
import { getFormDate } from "./../../hooks/core";
import { Link } from "react-router-dom";
import ReactTagInput from "@pathofdev/react-tag-input";

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
    user: { nickName, avatarImg },
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
        <ReactTagInput tags={tags} readOnly={true} onChange={() => {}} />
        <p className="Body">{text.slice(0, 40)}</p>
        <p className="Date">{getFormDate(createdAt)}</p>
        <div className="Footer">
          <div className="UserInfo">
            <img src={avatarImg} alt="hi"></img>
            <p className="UserName">{nickName}</p>
          </div>
          {/* <div className="Likes">
            <i className="fas fa-thumbs-up"></i>
            <p className="LikesNumber">{likes}</p>
          </div> */}
        </div>
      </Link>
    </div>
  );
}
