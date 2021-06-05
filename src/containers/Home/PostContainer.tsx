import { useEffect, useRef, useState } from "react";
import PostBlock from "../../components/Home/PostBlock";
import useGetPosts from "../../hooks/useGetPosts";
import useObserver from "../../hooks/useObserver";
import { Post } from "../../types";
import useTagSearch from "./../../hooks/useTagSearch";
interface PostContainerProps {
  location: string;
  menu: number;
}

export default function PostContainer({ location, menu }: PostContainerProps) {
  const [getPosts] = useGetPosts();
  const [tagSearchPosts] = useTagSearch();
  const [posts, setPosts] = useState<Post[]>([]);
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [targetElement, setObserver, unsetObserver] = useObserver(() => {
    setLoading(true);
  });

  useEffect(() => {
    let data;
    (async () => {
      if (menu !== 0 && location !== "") {
        data = await tagSearchPosts(location, 0);
        if (data.data?.tagSearchPost) {
          const { postList } = data.data?.tagSearchPost;
          setPosts(postList as Post[]);
        }
      } else {
        data = await getPosts(0);
        if (data.data?.getPosts) {
          const { postList } = data.data?.getPosts;
          setPosts(postList as Post[]);
        }
      }

      setInitLoading(false);
      setObserver();
    })();
    return () => {
      setInitLoading(true);
      unsetObserver();
    };
    // eslint-disable-next-line
  }, [location, menu]);

  useEffect(() => {
    if (loading) {
      (async () => {
        let data;
        if (menu !== 0 && location !== "") {
          data = await tagSearchPosts(location, posts.length);
          if (data.data?.tagSearchPost) {
            const { postList } = data.data?.tagSearchPost;
            setPosts(posts.concat(postList as Post[]));
          }
        } else {
          data = await getPosts(posts.length);
          if (data.data?.getPosts) {
            const { postList } = data.data?.getPosts;
            setPosts(posts.concat(postList as Post[]));
          }
        }
        setLoading((loading) => !loading);
      })();
    }
  }, [loading]);

  return (
    <>
      {!initLoading ? (
        <>
          <div className="PostContainer">
            {posts.map((post: Post) => (
              <PostBlock post={post} key={post.id} />
            ))}
            {!Boolean(posts.length) && <h1>포스트가 없어요...ㅠㅠ</h1>}
          </div>
        </>
      ) : (
        <div className="PostContainer Loading">
          <div className="Loading">
            <i className="fas fa-circle-notch fa-spin" />
          </div>
        </div>
      )}
      <div ref={targetElement} />
    </>
  );
}
