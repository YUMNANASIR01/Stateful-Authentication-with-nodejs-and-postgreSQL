import { pgTable, unique, uuid, varchar, text, foreignKey, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const user = pgTable("user", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	username: varchar({ length: 225 }).notNull(),
	email: varchar({ length: 225 }),
	password: text().notNull(),
	salt: text().notNull(),
}, (table) => [
	unique("user_email_unique").on(table.email),
]);

export const userSession = pgTable("user_session", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "user_session_userId_user_id_fk"
		}),
]);
