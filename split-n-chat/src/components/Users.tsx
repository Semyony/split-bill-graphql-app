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
  IonFab,
  IonFabButton,
  IonLoading,
} from "@ionic/react";

import { chevronDownCircleOutline } from "ionicons/icons";

import { useQuery } from "@apollo/client";
import { getAllUsers } from "../query/users";
import { useEffect, useState } from "react";
import React from "react";
// @ts-ignore 
import App1 from "./App1";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";

interface Item {
  title: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  total_items: Array<Item>;
}


const Users: React.FC = () => {
  const { data, loading, error } = useQuery(getAllUsers);
  console.log(data);
  const [users, setUsers] = useState<User[]>([]);
  const [showLoading, setShowLoading] = useState(true);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (!loading) {
      setShowLoading(false);
      setUsers(data.allUsers);
    }
    if (loading) {
      setShowLoading(true);
    }
  }, [data, loading]);

  const text =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Nihil earum illo ipsa velit facilis provident qui eligendi, quia ut magnam tenetur. Accusantium nisi quos delectus in necessitatibus ad. Ducimus, id!";
    const [collapse, setCollapse] = useState(true);
    const [title, setTitle] = useState("Expand All");
    const [icon, setIcon] = useState("fa fa-chevron-right");
  return (
    <IonContent>
      <IonLoading
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
      />
      {users.map((user) => {
        return (
          <App1 user_id={user.user_id} first_name={user.first_name} last_name={user.last_name} total_items={user.total_items} collapse={collapse}>
          </App1>
      )})}
    </IonContent>
  );
};

export default Users;
