import { relations } from "drizzle-orm";
import { adminWeights } from "./adminWeights";
import { types } from "./types";
import { weights } from "./weights";

export const typesRelations = relations(types, ({ many }) => ({
	weights: many(weights),
}));

export const weightsRelations = relations(weights, ({ one }) => ({
	type: one(types, {
		fields: [weights.type_id],
		references: [types.id],
	}),
}));

export const adminWeightsRelations = relations(adminWeights, ({ one }) => ({
	type: one(types, {
		fields: [adminWeights.type_id],
		references: [types.id],
	}),
}));
