import './ExploreContainer.css';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton
} from '@ionic/react';
interface ContainerProps {
  name: string;
}

const Chat: React.FC<ContainerProps> = () => {
  return (
  <IonContent>
    Chat

  </IonContent>
  );
};

export default Chat;