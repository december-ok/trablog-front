import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { User } from "./types";
import { Maybe } from "graphql/jsutils/Maybe";
import { setContext } from "@apollo/client/link/context";

const token = localStorage.getItem("token");
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);
export const loggedInUser = makeVar<Maybe<User>>(undefined);

const httpLink = createHttpLink({
  uri: "https://trablog-messi.herokuapp.com/graphql",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      "x-jwt": token ? `${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {},
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
