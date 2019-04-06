import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App from "./components/App";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    // public access only, nothing leaked here
    authorization: "Bearer d7f5d16a3e126aecfb40f83b0826ae2ef74bd21a"
  }
  // this will get called on every request, can be used to dynamically set api key
  // https://www.apollographql.com/docs/react/recipes/authentication#header
  // request: operation => {
  //   operation.setContext({
  //     headers: {
  //       authorization: "Bearer <KEY>"
  //     }
  //   });
  // }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
