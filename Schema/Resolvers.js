const { itemUser, item, user } = require("../data");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const { totalQuantityByItemID, totalPriceByItemID, totalPriceForAll, totalPriceByUserID, allUsers, allItems } = require("./queries")
const{ addItemUser, addItem, addUser } = require("./mutations")

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
    totalPriceByUserID: async(_, { id }) => {
      let totalPrice = null;
      let user_id = parseInt(id.id);
      const userFound = await prisma.useritem.findMany({
        where: { user_id: user_id},
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
  },
};

module.exports = { resolvers };
