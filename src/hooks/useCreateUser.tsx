import { gql, useMutation } from "@apollo/client";
import { CreateUserInput, CreateUserOutput } from "../types";

const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ok
      error
    }
  }
`;

export default function useCreateUser() {
  const [createUserMutation] =
    useMutation<{ createUser: CreateUserOutput }>(CREATE_USER);

  const createUser = async (input: CreateUserInput) => {
    return await createUserMutation({ variables: { input } });
  };

  return [createUser] as [typeof createUser];
}
