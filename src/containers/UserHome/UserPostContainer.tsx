import { useEffect, useState } from "react";
import { screenLoading } from "../..";
import RowPostBlock from "../../components/Search/RowPostBlock";
import useObserver from "../../hooks/useObserver";
import useUserPost from "../../hooks/useUserPost";
import { Post } from "../../types";

export default function UserPostContainer({ userId }: { userId: number }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [end, setEnd] = useState<boolean>(false);
  const [targetElement, setObserve, unsetObserver] = useObserver(() => {
    setLoading(true);
  });
  const [getUserPosts] = useUserPost();

  useEffect(() => {
    setPosts([]);
    setLoading(false);
    setEnd(false);
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
    // eslint-disable-next-line
  }, [userId]);

  useEffect(() => {
    if (loading && !end) {
      (async () => {
        if (posts.length >= 9) {
          screenLoading(true);
          const { data } = await getUserPosts(userId, posts.length);
          const payload = data?.getUserPosts;
          if (payload && payload.postList) {
            if (payload.postList.length < 9) {
              setEnd(true);
            }
            setPosts(posts.concat(payload.postList));
          }
          screenLoading(false);
        }
        setLoading((loading) => !loading);
      })();
    }
    // eslint-disable-next-line
  }, [loading]);

  return (
    <>
      <div className="UserPostContainer">
        {posts.map((e: Post) => (
          <RowPostBlock post={e} key={e.id} />
        ))}
      </div>
      <div ref={targetElement} />
    </>
  );
}
