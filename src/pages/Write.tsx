import { useReactiveVar } from "@apollo/client";
import { Redirect } from "react-router-dom";
import { loggedInUser } from "..";
import Header from "./../containers/Header";
import Editor from "./../containers/Write/Editor";

export default function Write() {
  if (!useReactiveVar(loggedInUser)) {
    alert("로그인이 필요합니다.");
    return <Redirect to="/" />;
  }

  return (
    <>
      <Header />
      <div className="Write">
        <Editor />
      </div>
    </>
  );
}
