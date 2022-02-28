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
  IonLoading,
} from "@ionic/react";

import { getAllItems } from "../query/items";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import React from "react";

interface Item {
  title: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

const Bill: React.FC = () => {
  const { data, loading, error } = useQuery(getAllItems);
  console.log(data);
  const [items, setItems] = useState<Item[]>([]);
  const [price, setPrice] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      setShowLoading(false);
      setItems(data.allItems);
      setPrice(data.totalPriceForAll);
    }
    if (loading) {
      setShowLoading(true);
    }
  }, [data]);

  return (
    <IonContent>
      <IonLoading
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
      />
      <IonGrid>
        <IonRow>
          {items.map((item) => {
            if (item.quantity) {
              return (
                <IonCard class="itemsOrdered">
                  <IonCardHeader>
                    <IonCardTitle>{item.title}</IonCardTitle>
                    <IonCardContent>
                      $<b>{item.price.toFixed(2)}</b>/item
                    </IonCardContent>
                    <IonCardContent class="quantity">
                      Quantity: {item.quantity}
                    </IonCardContent>
                    <IonCardContent class="totalPrice">
                      <div>${item.totalPrice.toFixed(2)}</div>
                    </IonCardContent>
                  </IonCardHeader>
                </IonCard>
              );
            }
            return null;
          })}
        </IonRow>

        {!loading && (
          <IonCard class="Total">
          <IonCardHeader>
            <span>Total</span>
            <IonCardContent class="totalPrice">
              <div>${price}</div>
            </IonCardContent>
          </IonCardHeader>
        </IonCard>
        )}
      </IonGrid>
    </IonContent>
  );
};

export default Bill;
