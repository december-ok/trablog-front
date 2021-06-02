import PostSelector from "./../../components/Home/PostSelector";
import PostContainer from "./PostContainer";

interface HomeContentProps {
  location: string;
  setLocation: Function;
  menu: number;
  setMenu: Function;
}

export default function HomeContent({
  location,
  setLocation,
  menu,
  setMenu,
}: HomeContentProps) {
  return (
    <div className="HomeContent">
      <PostSelector location={location} menu={menu} setMenu={setMenu} />
      <PostContainer location={location} menu={menu} />
    </div>
  );
}
