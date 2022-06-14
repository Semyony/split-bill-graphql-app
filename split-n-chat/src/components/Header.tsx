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
import { User } from '../types/User';

type Props = {
  user: User;
};

const Header: React.FC<Props> = ({ user }: Props) => {
  const { name } = useParams<{ name: string }>();
  const [fullName, setFullName] = useState(
    user.first_name + " " + user.last_name
  );
  return (
    <IonHeader>
      <IonToolbar class="toolbar">
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>
          {name === "Account" || name === "account" ? fullName : name}
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
