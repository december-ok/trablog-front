import { Post } from "../../types";
import RowPostBlock from "../../components/Search/RowPostBlock";

export default function SearchPostContainer({
  posts,
  query,
}: {
  posts: Post[];
  query: string;
}) {
  return (
    <div className="SearchPostContainer">
      {query !== "" && (
        <>
          <strong>{query}</strong>에 대한 검색 결과
        </>
      )}
      {posts.map((e: Post) => (
        <RowPostBlock post={e} key={e.id} />
      ))}
      {/* {JSON.stringify(posts)} */}
    </div>
  );
}
