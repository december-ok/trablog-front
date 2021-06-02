import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { loggedInUser } from "..";
import { MeOutput } from "../types";
const ME_QUERY = gql`
  {
    me {
      ok
      error
      user {
        id
        createdAt
        updatedAt
        email
        nickName
        avatarImg
        description
      }
    }
  }
`;

export default function useMe() {
  const { data } = useQuery(ME_QUERY);
  useEffect(() => {
    if (data) {
      const {
        me: { ok, user },
      }: { me: MeOutput } = data;
      if (ok && user) {
        loggedInUser(user);
      }
    }
  }, [data]);
}
