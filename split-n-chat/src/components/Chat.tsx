import "./ExploreContainer.css";
import { IonContent, IonGrid, IonRow, IonCol, IonLoading } from "@ionic/react";

import "./Chat.css";
import e from "express";
import { useState, useEffect } from "react";
import { useMutation, useSubscription, useQuery } from "@apollo/client";
import { sendMessage } from "../mutations/sendMessage";
import { getMessages } from "../query/getMessages";
import { messageAdded } from "../subscriptions/messageAdded";
import { Input } from "reactstrap";
import { User } from "../types/User";

type Props = {
  user: User;
};

const Chat: React.FC<Props> = ({ user }: Props) => {
  const [inputText, setInputText] = useState("");

  const [send, { reset }] = useMutation(sendMessage);

  const { loading, error, data, subscribeToMore } = useQuery(getMessages);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    subscribeToMore({
      document: messageAdded,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newChat = subscriptionData.data.MessageAdded;
        return {
          getMessages: [...prev.getMessages, newChat],
        };
      },
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      setShowLoading(false);
    } else {
      setShowLoading(true);
    }
  }, [data]);

  return (
    <IonContent>
      <IonLoading
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
      />
      <IonGrid className="chat-feed">
        <div>
          {data &&
            data.getMessages.map((chat: any) => (
              <IonRow
                className={user.user_id == chat.user_id ? "myrow" : "otherrow"}
                key={chat.message_id}
              >
                <IonCol
                  col-9
                  class={
                    "message " +
                    (user.user_id == chat.user_id
                      ? "mymessage"
                      : "othermessage")
                  }
                >
                  <span className="user_name">{chat.first_name}</span>
                  <br />
                  <span>{chat.message}</span>
                </IonCol>
              </IonRow>
            ))}
          <IonRow>
            <IonCol col-9 class="input-box ">
              <input
                type="text"
                placeholder="Message"
                className="inputForm"
                value={inputText}
                onChange={(e) => {
                  e.preventDefault();
                  setInputText(e.target.value);
                }}
              />
            </IonCol>
            <button
              className="sendmessageButt"
              type="submit"
              onClick={() => {
                send({
                  variables: {
                    message: inputText,
                    from: parseInt(user.user_id),
                    firstName: user.first_name,
                  },
                });
                setInputText("");
              }}
            ></button>
          </IonRow>
        </div>
      </IonGrid>
    </IonContent>
  );
};

export default Chat;
