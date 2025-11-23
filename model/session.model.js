// model\session.model.js

const {pgTable, uuid, timestamp,defaultRandom} = require("drizzle-orm/pg-core")
const { userTable } = require("./user.model")

exports.userSession = pgTable("user_session", {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid().references(()=> userTable.id).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    expireAt : timestamp().notNull()
})


