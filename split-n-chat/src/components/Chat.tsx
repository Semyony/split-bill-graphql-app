import "./ExploreContainer.css";
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
  IonButton,
  IonApp,
} from "@ionic/react";

import "./Chat.css";

interface ContainerProps {
  name: string;
}

const Chat: React.FC<ContainerProps> = () => {
  return (
    <div className="chat-feed">
      
    </div>
  )
};

export default Chat;
