const { itemUser, item, user } = require("../data");

function totalQuantityByItemID(id){
    let totalQuantity = null;

    itemUser.find((i) => {
      if (i.item_id === id) {
        totalQuantity += i.quantity;
      }
    });

    return totalQuantity
}

const resolvers = {
  Query: {
    //Total quantity for Item 
    totalQuantityByItemID: (_, { id }) => {
      return totalQuantity(id);
    },
    //Total price for Item 
    totalPriceByItemID: (_, { id }) => {
      const itemFound = item.find((i) => i.item_id === id);
      const totalPrice =  itemFound.price * totalQuantityByItemID(id);
      return totalPrice;
    },
    //Total price for all Items
    totalPriceForAll: () => {
      let totalPrice = null;
      itemUser.map((iu) => {
        console.log(iu);
        const itemFound = item.find((i) => i.item_id === iu.item_id);
        totalPrice +=  itemFound.price * iu.quantity;
        console.log(totalPrice);
      });  
      return totalPrice;
    },
    //Total price for User
    totalPriceByUserID: (_, { id }) => {
      let totalPrice = null;
      const userFound = itemUser.filter((iu) => iu.user_id === id);  
      console.log(userFound);
      userFound.map((user) => {
        const itemFound = item.find((i) => i.item_id === user.item_id);
        totalPrice +=  itemFound.price * user.quantity;
      });
      return totalPrice;
    },
    //User's split quantity for Item
    totalQuantityByItemIDForUser: (_, { item_id, user_id }) => {
      const userItemFound = itemUser.filter((iu) => iu.item_id === item_id && iu.user_id === user_id); 
      return userItemFound[0].quantity;
    },
    //User's split total price for Item
    totalPriceByItemIDForUser: (_, { item_id, user_id }) => {
      const userItemFound = itemUser.filter((iu) => iu.item_id === item_id && iu.user_id === user_id); 
      const itemFound = item.find((i) => i.item_id === userItemFound[0].item_id);
      let totalPrice = itemFound.price * userItemFound[0].quantity;
      return totalPrice;
    },
    
  },
};

module.exports = { resolvers };
