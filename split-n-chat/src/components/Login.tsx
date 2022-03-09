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
import { useQuery } from "@apollo/client";
import { login } from "../query/login";
import Bill from "./Bill";

type Props = {
  setUser: (user: User) => void;
};

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

export const Login: React.FC<Props> = ({ setUser }: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { data, loading, error } = useQuery(login, {
    variables: { first_name: firstName, last_name: lastName },
  });

  
  const [errorOcc, setErrorOcc] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (firstName && lastName) {
      try {
        console.log(data.login);
        if (data.login) {
          setErrorOcc(false);
          setUser(data.login);
          localStorage.setItem("user", JSON.stringify(data.login));
        } else {
          setErrorOcc(true);
          setErrMessage("Wrong!");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      setErrorOcc(true);
      setErrMessage("Don't leave fields blank!");
    }
  };

  return (
    <div className="">
      {errorOcc && (
        <IonCard>
          <IonCardHeader>{errMessage}</IonCardHeader>
        </IonCard>
      )}
      <form onSubmit={handleSubmit}>
        <IonCard className="input firstInput">
          <IonInput
            type="text"
            value={firstName}
            placeholder="First Name"
            onIonChange={(e) => setFirstName(e.detail.value!)}
          ></IonInput>
        </IonCard>
        <IonCard className="input lastInput">
          <IonInput
            type="text"
            value={lastName}
            placeholder="Last Name"
            onIonChange={(e) => setLastName(e.detail.value!)}
          ></IonInput>
        </IonCard>
        <IonButton type="submit" className="loginButton" color="medium">
          Login
        </IonButton>
        <br />
        <IonButton type="submit" className="createButton" color="dark">
          Create new
        </IonButton>
      </form>
    </div>
  );
};

export default Login;
