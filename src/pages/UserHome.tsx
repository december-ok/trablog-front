import { RouteComponentProps } from "react-router-dom";
import Header from "./../containers/Header";
import UserProfile from "./../components/User/UserProfile";
import { gql, useQuery } from "@apollo/client";
import { Redirect } from "react-router";

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
        postList {
          id
          title
          createdAt
          updatedAt
          title
          tags
          thumb
          body
          text
          likes
        }
      }
    }
  }
`;

export default function UserHome({ match: { params } }: any) {
  const { loading, data, error } = useQuery(GET_USER_INFO, {
    variables: { id: +params.userId },
  });
  if (error || (data as any)?.getUserProfile?.error) {
    return <Redirect to="/error" />;
  }
  const user = (data as any)?.getUserProfile?.user;
  return (
    <div className="UserHome">
      {!loading && (
        <>
          <Header />
          <UserProfile user={user} />
        </>
      )}
    </div>
  );
}
