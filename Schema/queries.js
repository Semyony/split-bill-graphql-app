const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Total quantity for Item
async function totalQuantityByItemID(id) {
  let totalQuantity = 0;
  const items = await prisma.useritem.findMany({
    where: {
      item_id: id,
    },
  });
  items.map((i) => {
    totalQuantity += parseInt(i.quantity);
  });
  return totalQuantity;
}
async function allUsers() {
  const allUsers = await prisma.user.findMany();
  for(let i = 0 ; i < allUsers.length; i++) {
    const itemsForUser = await prisma.useritem.findMany({
      where : {
        user_id: allUsers[i].user_id,
      },
      select: {
        item: {
          select: {
            item_id: true,
            title: true,
            price: true,
          },
        },
      },
    });
    for(let j = 0 ; j < itemsForUser.length; j++) {
      itemsForUser[j].title =  itemsForUser[j].item.title;
      itemsForUser[j].price =  itemsForUser[j].item.price;
      itemsForUser[j].quantity = await totalQuantityByItemUserID(itemsForUser[j].item.item_id, allUsers[i].user_id);
      itemsForUser[j].totalPrice = await totalPriceByItemUserID(itemsForUser[j].item.item_id, allUsers[i].user_id);
      delete itemsForUser[j].item;
    }
    allUsers[i].total_items = itemsForUser;
    console.log(allUsers[i].total_items);
  }
  return allUsers;
}

async function totalQuantityByItemUserID(item_id, user_id){
  let totalQuantity = 0;
  const items = await prisma.useritem.findMany({
    where: {
      item_id: item_id,
      user_id: user_id
    },
  });
  items.map((i) => {
    totalQuantity += parseInt(i.quantity);
  });
  return totalQuantity;
}

async function totalPriceByItemUserID(item_id, user_id){
  let totalPrice = 0;
  const items = await prisma.useritem.findMany({
    where: {
      item_id: item_id,
      user_id: user_id
    },
  });

  const itemFound = await prisma.item.findUnique({
    where: { item_id: item_id },
  });

  items.map((i) => {
    totalPrice += i.quantity * itemFound.price;
  });
  return totalPrice;
}

async function allItems() {
  const allItems = await prisma.item.findMany();
  for(let i = 0 ; i < allItems.length; i++) {
    allItems[i].quantity = await totalQuantityByItemID(allItems[i].item_id);
    allItems[i].totalPrice = await totalPriceByItemID(allItems[i].item_id);
  }
  
  return allItems;
}


async function totalPriceByItemID(id) {
  const itemFound = await prisma.item.findUnique({
    where: { item_id: id },
  });
  const totalPrice = itemFound.price * (await totalQuantityByItemID(id));
  return totalPrice;
}

async function totalPriceForAll() {
  let totalPrice = null;

  const useritem = await prisma.useritem.findMany({
    distinct: ["item_id", "user_id"],
    orderBy: {
      quantity: "desc",
    },
    select: {
      quantity: true,
      item: {
        select: {
          price: true,
        },
      },
    },
  });
  
  useritem.map((iu) => {
    totalPrice += iu.item.price * iu.quantity;
  });

  return totalPrice;
}

module.exports = { totalPriceByItemID, totalQuantityByItemID, totalPriceForAll, allUsers, allItems };
