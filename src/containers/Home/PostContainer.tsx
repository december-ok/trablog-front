import { useEffect, useState } from "react";
import PostBlock from "../../components/Home/PostBlock";
import useGetPosts from "../../hooks/useGetPosts";
import useObserver from "../../hooks/useObserver";
import { Post } from "../../types";
import useTagSearch from "./../../hooks/useTagSearch";
import { useReactiveVar } from "@apollo/client";
import { homeMenu, screenLoading } from "../..";

export default function PostContainer() {
  const [getPosts] = useGetPosts();
  const homeMenuValue = useReactiveVar(homeMenu);
  const [tagSearchPosts] = useTagSearch();
  const [posts, setPosts] = useState<Post[]>([]);
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const [end, setEnd] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [targetElement, setObserver, unsetObserver] = useObserver(() => {
    setLoading(true);
  });

  useEffect(() => {
    const { menu, location } = homeMenuValue;
    setEnd(false);
    screenLoading(false);
    setLoading(false);
    (async () => {
      let data;
      if (menu === 1) {
        data = await tagSearchPosts(location, 0);
        if (data.data?.tagSearchPost) {
          const { postList, searchTerm } = data.data?.tagSearchPost;
          if (menu === 1 && searchTerm === location) {
            setPosts(postList as Post[]);
          }
        }
      } else {
        data = await getPosts(0);
        if (data.data?.getPosts) {
          const { postList } = data.data?.getPosts;
          if (!menu) {
            setPosts(postList as Post[]);
          }
        }
      }

      setInitLoading(false);
      setObserver();
    })();
    return () => {
      unsetObserver();
      setPosts([]);
      setInitLoading(true);
    };
    // eslint-disable-next-line
  }, [homeMenuValue]);

  useEffect(() => {
    if (loading && !end) {
      const { menu, location } = homeMenuValue;
      (async () => {
        let data;
        if (posts.length >= 9) {
          screenLoading(true);
          if (menu !== 0) {
            data = await tagSearchPosts(location, posts.length);
            if (data.data?.tagSearchPost) {
              const { postList, searchTerm } = data.data?.tagSearchPost;
              if (menu !== 0 && searchTerm === location) {
                if ((postList as Post[]).length < 9) {
                  setEnd(true);
                }
                setPosts(posts.concat(postList as Post[]));
              }
            }
          } else {
            data = await getPosts(posts.length);
            if (data.data?.getPosts) {
              const { postList } = data.data?.getPosts;
              if (!menu) {
                if ((postList as Post[]).length < 9) {
                  setEnd(true);
                }
                setPosts(posts.concat(postList as Post[]));
              }
            }
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
      {!initLoading ? (
        <div className="PostContainer">
          {posts.map((post: Post) => (
            <PostBlock post={post} key={post.id} />
          ))}
          {!Boolean(posts.length) && <h1>포스트가 없어요...ㅠㅠ</h1>}
        </div>
      ) : (
        <div className="PostContainer Loading">
          <div className="Loading">
            <i className="fas fa-circle-notch fa-spin" />
          </div>
        </div>
      )}
      <div className="loadObserver" ref={targetElement} />
    </>
  );
}
