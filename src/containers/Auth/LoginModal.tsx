import { MouseEventHandler, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#ffe1d6",
    padding: "20px 30px",
    borderRadius: "8px",
    width: "450px",
  },
};

interface LoginModalProps {
  isOpen: boolean;
  toggleModal: MouseEventHandler;
}

export default function LoginModal({ isOpen, toggleModal }: LoginModalProps) {
  const [error, setError] = useState<string>();
  const [login, onEmailChange, onPasswordChange, loading] = useLogin(
    setError,
    toggleModal
  );

  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <div className="LoginModal">
        <div className="LoginHeader">
          <h2>로그인</h2>
          <i className="fas fa-times" onClick={toggleModal} />
        </div>
        <form onSubmit={login}>
          <label>이메일</label>
          <input type="email" className="email" onChange={onEmailChange} />
          <label>비밀번호</label>
          <input
            type="password"
            className="password"
            onChange={onPasswordChange}
          />
          {error}
          <button type="submit" disabled={loading}>
            {loading ? "로그인중..." : "로그인"}
          </button>
        </form>
        <div className="goJoin">
          <Link to="/auth">아이디가 없으신가요? 가입하기</Link>
        </div>
      </div>
    </Modal>
  );
}
