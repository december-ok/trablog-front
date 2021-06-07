import { useReactiveVar } from "@apollo/client";
import classNames from "classnames";
import { homeMenu } from "../..";

export default function PostSelector() {
  const { location, menu } = useReactiveVar(homeMenu);

  const setTotal = () => {
    if (menu !== 0) {
      homeMenu({ location, menu: 0 });
    }
  };
  const setLocal = () => {
    if (menu !== 1) {
      homeMenu({ location, menu: 1 });
    }
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
