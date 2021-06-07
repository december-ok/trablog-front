import { Post } from "../../types";
import { getFormDate } from "./../../hooks/core";
import { Link } from "react-router-dom";
import Tags from "../Tags";

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
      <Tags tags={tags} readOnly={true} onChange={() => {}} />
    </div>
  );
}
