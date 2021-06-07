import { Redirect } from "react-router-dom";
import BodyPost from "../components/Post/BodyPost";
import HeadPost from "../components/Post/HeadPost";
import Header from "./../containers/Header";
import usePost from "./../hooks/usePost";
import { useReactiveVar } from "@apollo/client";
import { loggedInUser } from "..";
import useDelete from "../hooks/useDelete";
import Modify from "../components/Post/Modify";
import Writer from "./../components/Post/Writer";

export default function Post({ match: { params } }: any) {
  const [data, loading, bigError] = usePost(+params.postId);
  const [deletePost, moveNextPage] = useDelete(+params.postId);
  const loggedUser = useReactiveVar(loggedInUser);
  if (loading) {
    return <Header />;
  }
  if (bigError) {
    return <Redirect to="/error" />;
  }
  const {
    getPost: { error, post },
  }: any = data;
  if (error) {
    return <Redirect to="/error" />;
  }
  if (moveNextPage) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Header />
      <div className="Post">
        <HeadPost post={post} />
        <hr />
        <BodyPost post={post} />
        <hr />
        <Writer user={post.user} />
        <hr />
        {loggedUser && post.user.id === loggedUser.id && (
          <Modify {...{ deletePost }} />
        )}
      </div>
    </>
  );
}
