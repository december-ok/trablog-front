import { RouteComponentProps } from "react-router-dom";
import Header from "./../containers/Header";
import UserProfile from "./../components/User/UserProfile";
import { gql, useQuery } from "@apollo/client";
import { Redirect } from "react-router";
import useUserPost from "../hooks/useUserPost";
import { useEffect, useState } from "react";
import { Post } from "../types";
import UserPostContainer from "../containers/UserHome/UserPostContainer";

const GET_USER_INFO = gql`
  query getUserProfile($id: Int!) {
    getUserProfile(input: { id: $id }) {
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

export default function UserHome({ match: { params } }: any) {
  const { loading, data, error } = useQuery(GET_USER_INFO, {
    variables: { id: +params.userId },
  });
  const userId = +params.userId;

  if (error || (data as any)?.getUserProfile?.error) {
    return <Redirect to="/error" />;
  }
  const user = (data as any)?.getUserProfile?.user;
  return (
    <>
      <Header />
      <div className="UserHome">
        {!loading && (
          <>
            <UserProfile user={user} />
            <UserPostContainer userId={userId} />
          </>
        )}
      </div>
    </>
  );
}
