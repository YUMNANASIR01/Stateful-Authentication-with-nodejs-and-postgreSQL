// model\user.model.js
const {pgTable,uuid ,varchar ,text} = require("drizzle-orm/pg-core")

exports.userTable = pgTable("user", {
    id: uuid().primaryKey().defaultRandom(),
    username : varchar({length: 225}).notNull(),
    email : varchar({length : 225}).unique(),
    password : text().notNull()
})


