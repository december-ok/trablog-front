import { User } from "../../types";

export default function UserProfile({ user }: { user: User }) {
  return (
    <div className="UserProfile">
      <img src={user.avatarImg} alt="UserImg" />
      <div className="UserText">
        <p className="Title">{user.nickName}</p>
        <p className="Description">{user.description}</p>
      </div>
    </div>
  );
}
