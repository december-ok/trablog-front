import { useEffect, useState } from "react";
import RowPostBlock from "../../components/Search/RowPostBlock";
import useObserver from "../../hooks/useObserver";
import useUserPost from "../../hooks/useUserPost";
import { Post } from "../../types";

export default function UserPostContainer({ userId }: { userId: number }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [targetElement, setObserve, unsetObserver] = useObserver(() => {
    setLoading(true);
  });
  const [getUserPosts] = useUserPost();

  useEffect(() => {
    (async () => {
      if (!isNaN(userId)) {
        const { data } = await getUserPosts(userId, 0);
        const payload = data?.getUserPosts;
        if (payload && payload.postList) {
          setPosts(payload.postList);
        }
        setObserve();
      }
    })();
    return () => {
      unsetObserver();
    };
  }, []);

  useEffect(() => {
    if (loading) {
      (async () => {
        const { data } = await getUserPosts(userId, posts.length);
        const payload = data?.getUserPosts;
        if (payload && payload.postList) {
          setPosts(posts.concat(payload.postList));
        }
        setLoading((loading) => !loading);
      })();
    }
  }, [loading]);

  return (
    <>
      <div className="UserPostContainer">
        {posts.map((e: Post) => (
          <RowPostBlock post={e} />
        ))}
      </div>
      <div ref={targetElement} />
    </>
  );
}
