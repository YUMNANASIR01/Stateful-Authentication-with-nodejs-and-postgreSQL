import { relations } from "drizzle-orm/relations";
import { user, userSession } from "./schema";

export const userSessionRelations = relations(userSession, ({one}) => ({
	user: one(user, {
		fields: [userSession.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	userSessions: many(userSession),
}));