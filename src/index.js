import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

const apolloClient = new ApolloClient({
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
  <App apolloClient={apolloClient} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
