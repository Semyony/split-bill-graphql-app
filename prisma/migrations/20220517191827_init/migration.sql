-- CreateTable
CREATE TABLE "message" (
    "message_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "message" VARCHAR(1000) NOT NULL,

    CONSTRAINT "accounts_pkey2" PRIMARY KEY ("message_id")
);

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
