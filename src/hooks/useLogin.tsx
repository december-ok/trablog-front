import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { authTokenVar, loggedInUser } from "..";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      ok
      error
      token
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

export default function useLogin(setError: Function, toggleModal: Function) {
  const [loginMutation, { loading }] = useMutation(LOGIN);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const login = async (e: SyntheticEvent) => {
    e.preventDefault();
    const {
      data: {
        login: { ok, error, token, user },
      },
    } = await loginMutation({
      variables: { email, password },
    });
    if (error) {
      setError(error);
      return;
    } else {
      localStorage.setItem("token", token);
      authTokenVar(token);
      loggedInUser(user);
      console.log(loggedInUser());
      toggleModal();
    }
  };

  return [login, onEmailChange, onPasswordChange, loading] as [
    typeof login,
    typeof onEmailChange,
    typeof onPasswordChange,
    typeof loading
  ];
}
