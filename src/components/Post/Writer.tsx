import { User } from "../../types";

export default function Writer({ user }: { user: User }) {
  return (
    <div className="Writer">
      <img src={user.avatarImg} alt="UserImg" />
      <div className="User">
        <p>{user.nickName}</p>
        <p>{user.description}</p>
      </div>
    </div>
  );
}
