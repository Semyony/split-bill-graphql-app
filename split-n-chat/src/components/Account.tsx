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
} from "@ionic/react";
import { User } from '../types/User';

type Props = {
  user: User;
};

const Account: React.FC<Props> = ({ user }: Props) => {
  const [firstInput, setFirstInput] = useState("");
  const [lastInput, setLastInput] = useState("");

  return (
    <div>
      {user.first_name} {user.last_name}
    </div>
  );
};

export default Account;
