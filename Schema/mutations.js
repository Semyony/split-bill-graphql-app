const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// for adding user
async function addUser(args) {
  try {
    await prisma.user.create({
      data: {
        first_name: args.first_name,
        last_name: args.last_name,
      },
    });
    return true;
  } catch (e) {
    // The .code property can be accessed in a type-safe manner
    console.log(
      "There is a unique constraint violation, a new user cannot be created with this name"
    );
    return false;
  }
}
// for adding Item and its quantity for user
async function addItemUser(args) {
  try {
    await prisma.useritem.create({
      data: {
        item_id: args.item_id,
        user_id: args.user_id,
        quantity: args.quantity,
      },
    });
    return true;
  } catch (e) {
    // The .code property can be accessed in a type-safe manner
    console.log(
      "There is a unique constraint violation, a new user cannot be created with this user_id and item_id"
    );
    return false;
  }
}

async function addItem(args) {
  try {
    await prisma.item.create({
      data: {
        item_id: args.item_id,
        title: args.title,
        price: args.price,
      },
    });
    return true;
  } catch (e) {
    // The .code property can be accessed in a type-safe manner
    console.log(
      "There is a unique constraint violation, a new user cannot be created with this email"
    );
    return false;
  }
}

async function login(args) {
  const user = await prisma.user.findFirst({
    where: {
      first_name: args.first_name,
      last_name: args.last_name,
    },
  });

  if (!user) {
    return null;
  }

  // context.req.session.userId = user.user_id;
  // console.log(context.req.session.userId);
  return user;
}

module.exports = { addUser, addItemUser, addItem, login };
