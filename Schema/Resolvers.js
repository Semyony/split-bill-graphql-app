const { itemUser, item, user } = require("../data");
const { PrismaClient } = require("@prisma/client");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();
const prisma = new PrismaClient();

const {
  totalQuantityByItemID,
  totalPriceByItemID,
  totalPriceForAll,
  totalPriceByUserID,
  allUsers,
  allItems,
} = require("./queries");
const { addItemUser, addItem, addUser, login } = require("./mutations");

let chat = [];

const resolvers = {
  Query: {
    //Total quantity for Item
    totalQuantityByItemID: (_, { id }) => {
      return totalQuantityByItemID(id);
    },
    //Total price for Item
    totalPriceByItemID: (_, { id }) => {
      return totalPriceByItemID(id);
    },
    //Total price for all Items
    totalPriceForAll: () => {
      return totalPriceForAll();
    },

    //Total price for User
    totalPriceByUserID: async (_, { id }) => {
      let totalPrice = null;
      let user_id = parseInt(id.id);
      const userFound = await prisma.useritem.findMany({
        where: { user_id: user_id },
        select: {
          quantity: true,
          item: {
            select: {
              price: true,
            },
          },
        },
      });
      console.log(userFound);
      userFound.map((user) => {
        totalPrice += user.item.price * user.quantity;
      });
      return totalPrice;
    },
    //User's split quantity for Item
    totalQuantityByItemIDForUser: (_, { item_id, user_id }) => {
      const userItemFound = itemUser.filter(
        (iu) => iu.item_id === item_id && iu.user_id === user_id
      );

      return userItemFound[0].quantity;
    },
    //User's split total price for Item
    totalPriceByItemIDForUser: (_, { item_id, user_id }) => {
      const userItemFound = itemUser.filter(
        (iu) => iu.item_id === item_id && iu.user_id === user_id
      );
      const itemFound = item.find(
        (i) => i.item_id === userItemFound[0].item_id
      );
      let totalPrice = itemFound.price * userItemFound[0].quantity;
      return totalPrice;
    },
    allUsers: () => {
      return allUsers();
    },
    allItems: () => {
      return allItems();
    },
    login: (parent, args) => {
      return login(args);
    },
    getMessages: () => {
      return chat;
    },
    getUser: async (_, {user_id}) => {
      return await prisma.user.findUnique({
        where: {
          user_id: user_id
        }
      });
    }
  },

  Mutation: {
    addUser: (parent, args) => {
      return addUser(args);
    },
    addItemUser: (parent, args) => {
      return addItemUser(args);
    },
    addItem: (parent, args) => {
      return addItem(args);
    },
    sendMessage: async (root, { user_id, message, first_name }) =>  {

      const messages = {
        message_id: chat.length + 1,
        user_id: user_id,
        first_name: first_name,
        message: message,
      };
      chat.push(messages);

      console.log(chat);
      pubsub.publish("CHAT_CHANNEL", { MessageAdded: messages });

      return true;
    },
  },

  Subscription: {
    MessageAdded: {
      subscribe: () => pubsub.asyncIterator(["CHAT_CHANNEL"]),
    },
  },
};

module.exports = { resolvers };
