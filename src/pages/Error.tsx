import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="Error">
      <h1>이런!</h1>
      <h2>찾는 페이지가 없습니다.</h2>
      <Link to="/">
        <button>Go To Main</button>
      </Link>
    </div>
  );
}
