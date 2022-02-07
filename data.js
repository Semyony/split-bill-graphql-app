const user = [
  {
    user_id: 3,
    name: "Semyon"
  },
  {
    user_id: 2,
    name: "Liza"
  },
  {
    user_id: 4,
    name: "Dauren"
  },
  {
    user_id: 5,
    name: "Mark"
  },
  {
    user_id: 6,
    name: "Jason"
  },

];
const item = [
  {
    item_id: 4,
    title: "Banana",
    price: 2.30
  },
  {
    item_id: 5,
    title: "Tea",
    price: 1.00
  },
  {
    item_id: 6,
    title: "Coffee",
    price: 3.00
  },
  {
    item_id: 8,
    title: "Orange",
    price: 1.00
  },

];

const itemUser = [
  {
    item_id: 5,
    user_id: 4,
    quantity: 4,
  },
  {
    item_id: 4,
    user_id: 6,
    quantity: 2,
  },

  {
    item_id: 5,
    user_id: 6,
    quantity: 5,
  },

];

module.exports = { itemUser, item, user };
