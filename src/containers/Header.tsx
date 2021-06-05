import { Link } from "react-router-dom";
import { ReactComponent as Title } from "../assets/travelog.svg";
import LoginModal from "./Auth/LoginModal";
import useBoolean from "../hooks/useBoolean";
import { loggedInUser } from "..";
import { useReactiveVar } from "@apollo/client";

export default function Header() {
  const [loginModal, loginModalToggle] = useBoolean(false);
  const loginUser = useReactiveVar(loggedInUser);

  return (
    <nav className="Header">
      <div className="Front">
        <Link to="/">
          <Title />
        </Link>
        <Link to="/info">
          <i className="fab fa-github" />
        </Link>
      </div>
      {!loginUser ? (
        <ul>
          <li>
            <Link to="/search">
              <i className="fas fa-search"></i>
            </Link>
          </li>
          <li>
            <button onClick={loginModalToggle}>로그인/가입하기</button>
            <LoginModal isOpen={loginModal} toggleModal={loginModalToggle} />
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/search">
              <i className="fas fa-search"></i>
            </Link>
          </li>
          <li>
            <Link to="/write">기록하기</Link>
          </li>
          <li>
            <Link to="/logout">로그아웃</Link>
          </li>
          <li>
            <Link to={`/${loginUser.id}`}>
              <img src={loginUser.avatarImg} alt="userimg" />
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
