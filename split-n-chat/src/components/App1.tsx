import "./ExploreContainer.css";
import React, { useState, useEffect } from "react";
import { Collapse } from "reactstrap";
import {
  IonCard,
  IonCardHeader,
  IonIcon,
  IonFab,
  IonFabButton,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

import { chevronDownCircleOutline } from "ionicons/icons";
import { useQuery } from "@apollo/client";
import { totalPriceByUserID } from "../query/priceUser";

interface Item {
  title: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface CardProps {
  user_id: number;
  first_name: string;
  last_name: string;
  total_items: Array<Item>;
  collapse: boolean;
}


const App1: React.FC<CardProps> = ({
    user_id,
    first_name,
    last_name,
    total_items,
    collapse,
    children,
  }) => {

  const { data, loading, error } = useQuery(totalPriceByUserID, {
    variables: {user_id: { id: user_id }}
  });
  const [price, setPrice] = useState<Number>();
  const [isCollapse, setIsCollapse] = useState(!collapse);
  const [isActivated, setIsActivated] = useState(false);
  const toggle = () => {
    setIsCollapse(!isCollapse);
  };

  const animate = (collapse: any) => {
    setIsCollapse(collapse);
  };

  
  useEffect(() => {
    animate(!collapse);
    
    if (!loading) {
      console.log(data)
      console.log(1)
      setPrice(data.totalPriceByUserID);
    }
  }, [collapse, loading, data]);

  return (
    <IonCard class="user">
      <IonCardHeader>
        <b>
          {first_name} {last_name}
        </b>
        <IonFab horizontal="end">
          <IonFabButton
            class="fabbut"
            onClick={() => {
              toggle();
              if (isActivated) setIsActivated(false);
              else setIsActivated(true);
            }}
            activated={isActivated}
          >
            <IonIcon icon={chevronDownCircleOutline} />
          </IonFabButton>
        </IonFab>
        <Collapse
          className="containerForItemsUser text-left p-2"
          isOpen={isCollapse}
        >
          {total_items &&
            total_items.map((item) => {
              return (
                <IonCard class="itemsOrderedUser">
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
            })}
          { !total_items.length && (
            <IonCard class="itemsOrderedUser">
              <IonCardHeader>
                <IonCardTitle>No Orders </IonCardTitle>
              </IonCardHeader>
            </IonCard>
          )}
          { price && (
          <IonCard class="itemsOrderedUser totalUser">
          <IonCardHeader>
            <span>Total</span>
            <IonCardContent class="totalPrice">
              <div>${Number(price).toFixed(2)}</div>
            </IonCardContent>
          </IonCardHeader>
          </IonCard>
          )}
        </Collapse>
      </IonCardHeader>
    </IonCard>
  );
};

App1.defaultProps = {
  collapse: true,
};
export default App1;
