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
import "./login.css";
import { useQuery } from "@apollo/client";
import { login } from "../query/login";
import Bill from "./Bill";
import { User } from "../types/User";

type Props = {
  setUser: (user: User) => void;
};

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
    if (firstName !== "" && lastName !== "") {
      try {
        if (error) {
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
    <div>
      <form className="validation-form" onSubmit={handleSubmit}>
        <div className="headerLogin">LOGIN</div>
        {errorOcc && (
          <IonCard color="warning">
            <IonCardHeader>{errMessage}</IonCardHeader>
          </IonCard>
        )}
        <IonCard className="firstInput">
          <IonInput
            type="text"
            value={firstName}
            placeholder="First Name"
            onIonChange={(e) => setFirstName(e.detail.value!)}
          ></IonInput>
        </IonCard>
        <IonCard className="lastInput">
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
