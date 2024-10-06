import { adminWeights } from "@schemas/adminWeights";
import schema from "@schemas/index";
import { types } from "@schemas/types";
import { Weights } from "@shipaxxess/shipaxxess-zod-v4";
import { exception } from "@utils/error";
import { and, eq, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";

const Post = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Weights.FETCHSCHEMA.parse(body);
	console.log(parse);

	// Fetch all records with the matching type_id
	const allRecords = await drizzle(c.env.DB)
		.select()
		.from(adminWeights)
		.where(eq(adminWeights.type_id, parse.type_id))
		.all();

	// Check if allRecords is an array
	if (!Array.isArray(allRecords)) {
		throw exception({ code: 500, message: "Database query did not return an array" });
	}

	// Calculate the difference for each record and find the closest match
	let closestRecord = null;
	let minDifference = Infinity;

	for (const record of allRecords) {
		const widthDiff = Math.abs(record.width - parse.width);
		const heightDiff = Math.abs(record.height - parse.height);
		const lengthDiff = Math.abs(record.length - parse.length);

		const totalDifference = widthDiff + heightDiff + lengthDiff;

		if (totalDifference < minDifference) {
			minDifference = totalDifference;
			closestRecord = record;
		}
	}

	if (!closestRecord) throw exception({ code: 40405, message: "Weight not found" });

	return c.json(closestRecord);
};

const WeightsUser = { Post };

export { WeightsUser };