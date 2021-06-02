import Header from "./../containers/Header";
import HomeSelector from "./../containers/Home/HomeSelector";
import HomeContent from "./../containers/Home/HomeContent";
import { useState } from "react";

export default function Home() {
  const [location, setLocation] = useState<string>("서울");
  const [menu, setMenu] = useState<number>(0);

  return (
    <>
      <Header />
      <div className="Home">
        <HomeSelector
          location={location}
          setLocation={setLocation}
          menu={menu}
          setMenu={setMenu}
        />
        <HomeContent
          location={location}
          setLocation={setLocation}
          menu={menu}
          setMenu={setMenu}
        />
      </div>
    </>
  );
}
