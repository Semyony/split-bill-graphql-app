import React, { useState } from "react";
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonImg,
  IonCard,
  IonButton,
  IonCardHeader,
  IonInput,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonHeader,
} from "@ionic/react";
import { useParams } from "react-router";


type Props = {
  user: User;
};

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

const Header: React.FC<Props> = ({ user }: Props) => {
  const { name } = useParams<{ name: string }>();
  const [fullName, setFullName] = useState(user.first_name + " " + user.last_name);
  return (
    <IonHeader>
      <IonToolbar class="toolbar">
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>{(name === "Account" || name === "account" )? fullName: name}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
