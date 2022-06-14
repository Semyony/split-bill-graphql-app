-- CreateTable
CREATE TABLE "item" (
    "item_id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "accounts_pkey1" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "useritem" (
    "item_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "quantity" DECIMAL NOT NULL,

    CONSTRAINT "useritem_pkey" PRIMARY KEY ("item_id","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_title_key" ON "item"("title");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_first_name_last_name_key" ON "user"("first_name", "last_name");

-- AddForeignKey
ALTER TABLE "useritem" ADD CONSTRAINT "useritem_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "useritem" ADD CONSTRAINT "useritem_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
