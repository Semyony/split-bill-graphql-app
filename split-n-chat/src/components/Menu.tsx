import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonImg,
  IonButton,
} from "@ionic/react";

import { useLocation, Redirect } from "react-router-dom";
import {
  chatbubblesOutline,
  addOutline,
  receiptOutline,
  personOutline,
  personCircleOutline,
  logOutOutline,
} from "ionicons/icons";
import "./Menu.css";
import logo from "../images/logo.png";
import Login from "./Login";

interface AppPage {
  url: string;
  iosIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Users",
    url: "/Users",
    iosIcon: personOutline,
  },
  {
    title: "Bill",
    url: "/Bill",
    iosIcon: receiptOutline,
  },
  {
    title: "Chat",
    url: "/Chat",
    iosIcon: chatbubblesOutline,
  },
  {
    title: "Add Item",
    url: "/Order",
    iosIcon: addOutline,
  },
];

type Props = {
  setUser: (user: User | null) => void;
  user: User;
};

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

export const Menu: React.FC<Props> = ({ user, setUser }: Props) => {
  const location = useLocation();

  function handleLogOut() {
    setUser(null);
    localStorage.clear();
  }

  return (
    <IonMenu contentId="main" type="overlay" class="menu-width">
      <IonContent>
        <IonImg src={logo} class="logo" />
        <IonButton
          routerLink="/Account"
          routerDirection="none"
          color="medium"
        >
          <IonIcon
            class="iconAccountButton"
            ios={personCircleOutline}
          ></IonIcon>
          <b>{user.first_name} {user.last_name}</b>
        </IonButton>
        <IonList id="inbox-list">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon slot="start" ios={appPage.iosIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          <IonMenuToggle key={appPages.length + 1} autoHide={false}>
            <IonItem
              routerDirection="none"
              routerLink="/"
              onClick={handleLogOut}
              lines="none"
              detail={false}
            >
              <IonIcon slot="start" ios={logOutOutline} />
              <IonLabel>Log Out</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
