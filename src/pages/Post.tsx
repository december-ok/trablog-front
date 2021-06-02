import { Redirect } from "react-router-dom";
import BodyPost from "../components/Post/BodyPost";
import HeadPost from "../components/Post/HeadPost";
import { Post as PostType } from "../types";
import Header from "./../containers/Header";
import usePost from "./../hooks/usePost";

export default function Post({ match: { params } }: any) {
  const [data, loading] = usePost(+params.postId);

  if (loading) {
    return <Header />;
  }
  const {
    getPost: { ok, error, post },
  }: any = data;
  if (error) {
    return <Redirect to="/error" />;
  }
  return (
    <>
      <Header />
      <div className="Post">
        <HeadPost post={post} />
        <hr />
        <BodyPost post={post} />
        <hr />
      </div>
    </>
  );
}
