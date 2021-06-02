import ReactTagInput from "@pathofdev/react-tag-input";
import { Post, User } from "../../types";
import { getFormDate } from "./../../hooks/core";
import { Link } from "react-router-dom";

export default function HeadPost({
  post: { title, user, createdAt, tags },
}: {
  post: Post;
}) {
  return (
    <div className="HeadPost">
      <h1>{title}</h1>
      <div className="UserInfo">
        <Link to={`/${user.id}`}>
          <img src={user.avatarImg} alt={"Userimg"} />
          <p>{user.nickName}</p>
        </Link>
      </div>
      <p className="date">{getFormDate(createdAt)}</p>
      <ReactTagInput tags={tags} readOnly={true} onChange={() => {}} />
    </div>
  );
}
