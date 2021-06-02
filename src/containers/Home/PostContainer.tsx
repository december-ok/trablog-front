import { useEffect } from "react";
import PostBlock from "../../components/Home/PostBlock";
import { Post } from "../../types";
import useSearchPosts from "./../../hooks/useSearchPosts";
interface PostContainerProps {
  location: string;
  menu: number;
}

export default function PostContainer({ location, menu }: PostContainerProps) {
  const [searchPosts, data] = useSearchPosts();

  useEffect(() => {
    (async () => {
      if (menu !== 0 && location !== "") {
        await searchPosts(location);
      } else {
        await searchPosts("");
      }
    })();
    // eslint-disable-next-line
  }, [location, menu]);

  return (
    <div className="PostContainer">
      {data &&
        data.searchPost.postList.map((post: Post) => <PostBlock post={post} />)}
    </div>
  );
}
