import classNames from "classnames";
interface PostSelectorProps {
  location: string;
  menu: number;
  setMenu: Function;
}

export default function PostSelector({
  location,
  menu,
  setMenu,
}: PostSelectorProps) {
  const setTotal = () => {
    setMenu(0);
  };
  const setLocal = () => {
    setMenu(1);
  };
  return (
    <div className="PostSelector">
      <div
        className={classNames("Button", { active: menu === 0 })}
        onClick={setTotal}
      >
        <i className="fas fa-list"></i>
        <p>전체</p>
      </div>
      <div
        className={classNames("Button", { active: menu === 1 })}
        onClick={setLocal}
      >
        <i className="fas fa-map-marked-alt" />
        <p>지역</p>
      </div>
      {menu === 1 && location !== "" && (
        <div className="LocalInfo">{location}</div>
      )}{" "}
    </div>
  );
}
