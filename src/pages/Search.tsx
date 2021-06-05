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

export default function Search({ history, location }: RouteComponentProps) {
  const [query, setQuery] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchPosts] = useSearchPosts();
  const [loading, setLoading] = useState<boolean>(false);
  const [targetElement, setObserver, unsetObserver] = useObserver(() => {
    setLoading(true);
  });

  const debouncedSearch = useMemo(() => {
    return debounce(300, async (term: string) => {
      const { data } = await searchPosts(term, 0);
      const payload = data?.searchPost;
      if (payload && payload.postList) {
        setPosts(payload.postList);
        if (term !== "") {
          setObserver();
        }
      }
    });
  }, []);

  useEffect(() => {
    const queryValue = qs.parse(location.search)["?query"] as string;
    setQuery(queryValue || "");
  }, []);

  useEffect(() => {
    history.replace(`/search?query=${query}`);
    debouncedSearch(query);
    return () => {
      unsetObserver();
    };
  }, [query]);

  useEffect(() => {
    if (loading) {
      (async () => {
        const { data } = await searchPosts(query, posts.length);
        const payload = data?.searchPost;
        if (payload && payload.postList) {
          setPosts(posts.concat(payload.postList));
        }
        setLoading((loading) => !loading);
      })();
      console.log("loaded");
    }
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
