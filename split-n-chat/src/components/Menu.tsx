import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonImg,
  
  IonButton
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { chatbubblesOutline, addOutline, receiptOutline, personOutline, personCircleOutline } from 'ionicons/icons';
import './Menu.css';
import logo from '../images/logo.png'

interface AppPage {
  url: string;
  iosIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Users',
    url: '/Users',
    iosIcon: personOutline
  },
  {
    title: 'Bill',
    url: '/Bill',
    iosIcon: receiptOutline
  },
  {
    title: 'Chat',
    url: '/Chat',
    iosIcon: chatbubblesOutline
  },
  {
    title: 'Add Item',
    url: '/Order',
    iosIcon: addOutline
  },
  
];


const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay" class="menu-width" >
      <IonContent>
        
        <IonImg src={logo} class='logo'/>
        <IonButton color="medium"><IonIcon class="iconAccountButton" ios={personCircleOutline}></IonIcon><b>Account</b></IonButton>
        <IonList id="inbox-list">
          
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon}  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
