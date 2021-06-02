import HomeMap from "./../../components/HomeMap";

interface HomeSelectorProps {
  location: string;
  setLocation: Function;
  menu: number;
  setMenu: Function;
}

export default function HomeSelector({
  location,
  setLocation,
  menu,
  setMenu,
}: HomeSelectorProps) {
  return (
    <div className="HomeSelector">
      <HomeMap
        location={location}
        setLocation={setLocation}
        menu={menu}
        setMenu={setMenu}
      />
    </div>
  );
}
