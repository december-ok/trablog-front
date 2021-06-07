import PostSelector from "./../../components/Home/PostSelector";
import PostContainer from "./PostContainer";

export default function HomeContent() {
  return (
    <div className="HomeContent">
      <PostSelector />
      <PostContainer />
    </div>
  );
}
