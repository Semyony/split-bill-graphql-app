import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { useParams } from "react-router";
import ExploreContainer from "../components/Chat";
import "./Page.css";
import { Route } from "react-router-dom";
import Bill from "../components/Bill";
import Users from "../components/Users";
import Login from "../components/Login";
import Account from "../components/Account";
import Chat from "../components/Chat";
import Header from "../components/Header";
import React, { useState, useEffect } from "react";

import { User } from '../types/User';

type Props = {
  user: User;
};

const Page: React.FC<Props> = ({ user }: Props) => {
  const { name } = useParams<{ name: string }>();

  return (
    <IonPage>
      <Header user={user} />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Route path="/Bill" exact={true}>
          <Bill />
        </Route>
        <Route path="/Users" exact={true}>
          <Users />
        </Route>
        <Route path="/account" exact={true}>
          <Account user={user} />
        </Route>
        <Route path="/chat" exact={true}>
          <Chat user={user} />
        </Route>
      </IonContent>
    </IonPage>
  );
};

export default Page;
