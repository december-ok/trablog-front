import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { loggedInUser } from "..";

export default function Logout() {
  useEffect(() => {
    localStorage.setItem("token", "");
    loggedInUser(undefined);
  }, []);
  return <Redirect to="/" />;
}
