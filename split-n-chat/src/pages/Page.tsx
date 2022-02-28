import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/Chat';
import './Page.css';
import {  Route } from 'react-router-dom';
import Bill from '../components/Bill';
import Users from '../components/Users';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar class="toolbar">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name} </IonTitle>
          
        </IonToolbar>
      </IonHeader>

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
      </IonContent>
    </IonPage>
  );
};

export default Page;
