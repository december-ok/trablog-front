import { useEffect, useMemo, useState } from "react";
import useSearchPosts from "../hooks/useSearchPosts";
import { RouteComponentProps } from "react-router-dom";
import qs from "qs";
import Header from "./../containers/Header";
import SearchInput from "./../components/Search/SearchInput";
import SearchPostContainer from "./../containers/Search/SearchPostContainer";
import { debounce } from "throttle-debounce";
import { Post } from "../types";
import useObserver from "../hooks/useObserver";
import { screenLoading } from "..";

export default function Search({ history, location }: RouteComponentProps) {
  const [query, setQuery] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchPosts] = useSearchPosts();
  const [loading, setLoading] = useState<boolean>(false);
  const [end, setEnd] = useState<boolean>(false);
  const [targetElement, setObserver, unsetObserver] = useObserver(() => {
    setLoading(true);
  });

  const debouncedSearch = useMemo(() => {
    return debounce(300, async (term: string) => {
      history.replace(`/search?query=${term}`);
      const { data } = await searchPosts(term, 0);
      const payload = data?.searchPost;
      if (payload && payload.postList) {
        setPosts(payload.postList);
        if (term !== "") {
          setObserver();
        }
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const queryValue = (qs.parse(location.search)["?query"] as string) || "";
    setQuery(queryValue);
  }, [location.search]);

  useEffect(() => {
    setEnd(false);
    screenLoading(false);
    setLoading(false);
    debouncedSearch(query);
    return () => {
      unsetObserver();
    };
    // eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    if (loading && !end) {
      (async () => {
        if (posts.length >= 9) {
          screenLoading(true);
          const { data } = await searchPosts(query, posts.length);
          const payload = data?.searchPost;
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
      <Header />
      <div className="Search">
        <SearchInput query={query} setQuery={setQuery} />
        <SearchPostContainer posts={posts} query={query} />
      </div>
      <div ref={targetElement} />
    </>
  );
}
