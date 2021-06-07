import Header from "./../containers/Header";
import HomeSelector from "./../containers/Home/HomeSelector";
import HomeContent from "./../containers/Home/HomeContent";

export default function Home() {
  return (
    <>
      <Header />
      <div className="Home">
        <HomeSelector />
        <HomeContent />
      </div>
    </>
  );
}
