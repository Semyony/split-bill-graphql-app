import {
  IonApp,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Page from "./pages/Page";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

// Apollo Client
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router";
import Header from "../src/components/Header";
import Login from "./components/Login";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

setupIonicReact();

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

interface UserState {
  info?: User;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>();
  const [authenticated, setAuthenticated] = useState();

  console.log(user);

  React.useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    console.log(JSON.parse(loggedInUser|| "{}"))
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser || "{}");
      console.log(foundUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <IonApp>
        {user ? (
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <Menu user={user} setUser={setUser} />
              <IonRouterOutlet id="main">
                <Route path="/" exact={true}>
                  <Redirect to="/Bill" />
                </Route>
                <Route path="/:name" exact={true}>
                  <Redirect to="/Bill" />
                  <Header user={user} />
                  <Page user={user} />
                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        ) : (
          <IonReactRouter>
            <Route path="/login" exact={true}>
              <Login setUser={setUser} />
            </Route>
            <Redirect to="/login" />
          </IonReactRouter>
        )}
      </IonApp>
    </ApolloProvider>
  );
};

export default App;
