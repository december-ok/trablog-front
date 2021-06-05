import Header from "../containers/Header";
import JoinContainer from "./../containers/Auth/JoinContainer";

export default function Auth() {
  return (
    <>
      <Header />
      <div className="Auth">
        회원가입
        <JoinContainer />
      </div>
    </>
  );
}
