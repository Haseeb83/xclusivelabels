import { z } from "zod";
export declare const COMMONSCHEMA: z.ZodObject<
	{
		sender: z.ZodObject<
			{
				full_name: z.ZodString;
				company_name: z.ZodOptional<z.ZodString>;
				street_one: z.ZodString;
				street_two: z.ZodOptional<z.ZodString>;
				city: z.ZodString;
				zip: z.ZodString;
				state: z.ZodString;
				phone: z.ZodString;
				country: z.ZodDefault<z.ZodString>;
			},
			"strip",
			z.ZodTypeAny,
			{
				full_name?: string;
				company_name?: string;
				street_one?: string;
				street_two?: string;
				city?: string;
				zip?: string;
				state?: string;
				phone?: string;
				country?: string;
			},
			{
				full_name?: string;
				company_name?: string;
				street_one?: string;
				street_two?: string;
				city?: string;
				zip?: string;
				state?: string;
				phone?: string;
				country?: string;
			}
		>;
		sender_select: z.ZodOptional<z.ZodString>;
		package: z.ZodObject<
			{
				length: z.ZodNumber;
				name: z.ZodString;
				weight: z.ZodNumber;
				height: z.ZodNumber;
				width: z.ZodNumber;
				radio: z.ZodOptional<z.ZodString>;
				id: z.ZodOptional<z.ZodNumber>;
			},
			"strip",
			z.ZodTypeAny,
			{
				length?: number;
				name?: string;
				weight?: number;
				height?: number;
				width?: number;
				radio?: string;
				id?: number;
			},
			{
				length?: number;
				name?: string;
				weight?: number;
				height?: number;
				width?: number;
				radio?: string;
				id?: number;
			}
		>;
		package_select: z.ZodOptional<z.ZodString>;
		type: z.ZodObject<
			{
				type: z.ZodEnum<["usps", "ups", "fedex"]>;
				value: z.ZodString;
				label: z.ZodString;
				unit: z.ZodEnum<["oz", "lb"]>;
				id: z.ZodNumber;
			},
			"strip",
			z.ZodTypeAny,
			{
				type?: "usps" | "ups" | "fedex";
				value?: string;
				label?: string;
				unit?: "oz" | "lb";
				id?: number;
			},
			{
				type?: "usps" | "ups" | "fedex";
				value?: string;
				label?: string;
				unit?: "oz" | "lb";
				id?: number;
			}
		>;
		type_select: z.ZodOptional<z.ZodString>;
		shippingdate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
		reference1: z.ZodOptional<z.ZodString>;
		description: z.ZodOptional<z.ZodString>;
		saturday: z.ZodOptional<z.ZodBoolean>;
		signature: z.ZodOptional<z.ZodBoolean>;
		name: z.ZodOptional<z.ZodString>;
		saved_sender: z.ZodDefault<z.ZodBoolean>;
	},
	"strip",
	z.ZodTypeAny,
	{
		sender?: {
			full_name?: string;
			company_name?: string;
			street_one?: string;
			street_two?: string;
			city?: string;
			zip?: string;
			state?: string;
			phone?: string;
			country?: string;
		};
		sender_select?: string;
		package?: {
			length?: number;
			name?: string;
			weight?: number;
			height?: number;
			width?: number;
			radio?: string;
			id?: number;
		};
		package_select?: string;
		type?: {
			type?: "usps" | "ups" | "fedex";
			value?: string;
			label?: string;
			unit?: "oz" | "lb";
			id?: number;
		};
		type_select?: string;
		shippingdate?: string;
		reference1?: string;
		description?: string;
		saturday?: boolean;
		signature?: boolean;
		name?: string;
		saved_sender?: boolean;
	},
	{
		sender?: {
			full_name?: string;
			company_name?: string;
			street_one?: string;
			street_two?: string;
			city?: string;
			zip?: string;
			state?: string;
			phone?: string;
			country?: string;
		};
		sender_select?: string;
		package?: {
			length?: number;
			name?: string;
			weight?: number;
			height?: number;
			width?: number;
			radio?: string;
			id?: number;
		};
		package_select?: string;
		type?: {
			type?: "usps" | "ups" | "fedex";
			value?: string;
			label?: string;
			unit?: "oz" | "lb";
			id?: number;
		};
		type_select?: string;
		shippingdate?: string;
		reference1?: string;
		description?: string;
		saturday?: boolean;
		signature?: boolean;
		name?: string;
		saved_sender?: boolean;
	}
>;
export type COMMONSCHEMA = z.infer<typeof COMMONSCHEMA>;
export declare const ZODSCHEMA: z.ZodObject<
	{
		type: z.ZodObject<
			{
				type: z.ZodEnum<["usps", "ups", "fedex"]>;
				value: z.ZodString;
				label: z.ZodString;
				unit: z.ZodEnum<["oz", "lb"]>;
				id: z.ZodNumber;
			},
			"strip",
			z.ZodTypeAny,
			{
				type?: "usps" | "ups" | "fedex";
				value?: string;
				label?: string;
				unit?: "oz" | "lb";
				id?: number;
			},
			{
				type?: "usps" | "ups" | "fedex";
				value?: string;
				label?: string;
				unit?: "oz" | "lb";
				id?: number;
			}
		>;
		description: z.ZodOptional<z.ZodString>;
		name: z.ZodOptional<z.ZodString>;
		sender: z.ZodObject<
			{
				full_name: z.ZodString;
				company_name: z.ZodOptional<z.ZodString>;
				street_one: z.ZodString;
				street_two: z.ZodOptional<z.ZodString>;
				city: z.ZodString;
				zip: z.ZodString;
				state: z.ZodString;
				phone: z.ZodString;
				country: z.ZodDefault<z.ZodString>;
			},
			"strip",
			z.ZodTypeAny,
			{
				full_name?: string;
				company_name?: string;
				street_one?: string;
				street_two?: string;
				city?: string;
				zip?: string;
				state?: string;
				phone?: string;
				country?: string;
			},
			{
				full_name?: string;
				company_name?: string;
				street_one?: string;
				street_two?: string;
				city?: string;
				zip?: string;
				state?: string;
				phone?: string;
				country?: string;
			}
		>;
		sender_select: z.ZodOptional<z.ZodString>;
		package: z.ZodObject<
			{
				length: z.ZodNumber;
				name: z.ZodString;
				weight: z.ZodNumber;
				height: z.ZodNumber;
				width: z.ZodNumber;
				radio: z.ZodOptional<z.ZodString>;
				id: z.ZodOptional<z.ZodNumber>;
			},
			"strip",
			z.ZodTypeAny,
			{
				length?: number;
				name?: string;
				weight?: number;
				height?: number;
				width?: number;
				radio?: string;
				id?: number;
			},
			{
				length?: number;
				name?: string;
				weight?: number;
				height?: number;
				width?: number;
				radio?: string;
				id?: number;
			}
		>;
		package_select: z.ZodOptional<z.ZodString>;
		type_select: z.ZodOptional<z.ZodString>;
		shippingdate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
		reference1: z.ZodOptional<z.ZodString>;
		saturday: z.ZodOptional<z.ZodBoolean>;
		signature: z.ZodOptional<z.ZodBoolean>;
		saved_sender: z.ZodDefault<z.ZodBoolean>;
		recipient: z.ZodObject<
			{
				full_name: z.ZodString;
				company_name: z.ZodOptional<z.ZodString>;
				street_one: z.ZodString;
				street_two: z.ZodOptional<z.ZodString>;
				city: z.ZodString;
				zip: z.ZodString;
				state: z.ZodString;
				phone: z.ZodString;
				country: z.ZodDefault<z.ZodString>;
			},
			"strip",
			z.ZodTypeAny,
			{
				full_name?: string;
				company_name?: string;
				street_one?: string;
				street_two?: string;
				city?: string;
				zip?: string;
				state?: string;
				phone?: string;
				country?: string;
			},
			{
				full_name?: string;
				company_name?: string;
				street_one?: string;
				street_two?: string;
				city?: string;
				zip?: string;
				state?: string;
				phone?: string;
				country?: string;
			}
		>;
	},
	"strip",
	z.ZodTypeAny,
	{
		type?: {
			type?: "usps" | "ups" | "fedex";
			value?: string;
			label?: string;
			unit?: "oz" | "lb";
			id?: number;
		};
		description?: string;
		name?: string;
		sender?: {
			full_name?: string;
			company_name?: string;
			street_one?: string;
			street_two?: string;
			city?: string;
			zip?: string;
			state?: string;
			phone?: string;
			country?: string;
		};
		sender_select?: string;
		package?: {
			length?: number;
			name?: string;
			weight?: number;
			height?: number;
			width?: number;
			radio?: string;
			id?: number;
		};
		package_select?: string;
		type_select?: string;
		shippingdate?: string;
		reference1?: string;
		saturday?: boolean;
		signature?: boolean;
		saved_sender?: boolean;
		recipient?: {
			full_name?: string;
			company_name?: string;
			street_one?: string;
			street_two?: string;
			city?: string;
			zip?: string;
			state?: string;
			phone?: string;
			country?: string;
		};
	},
	{
		type?: {
			type?: "usps" | "ups" | "fedex";
			value?: string;
			label?: string;
			unit?: "oz" | "lb";
			id?: number;
		};
		description?: string;
		name?: string;
		sender?: {
			full_name?: string;
			company_name?: string;
			street_one?: string;
			street_two?: string;
			city?: string;
			zip?: string;
			state?: string;
			phone?: string;
			country?: string;
		};
		sender_select?: string;
		package?: {
			length?: number;
			name?: string;
			weight?: number;
			height?: number;
			width?: number;
			radio?: string;
			id?: number;
		};
		package_select?: string;
		type_select?: string;
		shippingdate?: string;
		reference1?: string;
		saturday?: boolean;
		signature?: boolean;
		saved_sender?: boolean;
		recipient?: {
			full_name?: string;
			company_name?: string;
			street_one?: string;
			street_two?: string;
			city?: string;
			zip?: string;
			state?: string;
			phone?: string;
			country?: string;
		};
	}
>;
export type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;
export declare const RECIPIENTSCHEMAARRAY: z.ZodArray<
	z.ZodObject<
		{
			full_name: z.ZodString;
			company_name: z.ZodOptional<z.ZodString>;
			street_one: z.ZodString;
			street_two: z.ZodOptional<z.ZodString>;
			city: z.ZodString;
			zip: z.ZodString;
			state: z.ZodString;
			country: z.ZodDefault<z.ZodString>;
			uuid: z.ZodString;
			phone: z.ZodOptional<z.ZodString>;
		},
		"strip",
		z.ZodTypeAny,
		{
			full_name?: string;
			company_name?: string;
			street_one?: string;
			street_two?: string;
			city?: string;
			zip?: string;
			state?: string;
			country?: string;
			uuid?: string;
			phone?: string;
		},
		{
			full_name?: string;
			company_name?: string;
			street_one?: string;
			street_two?: string;
			city?: string;
			zip?: string;
			state?: string;
			country?: string;
			uuid?: string;
			phone?: string;
		}
	>,
	"many"
>;
export type RECIPIENTSCHEMAARRAY = z.infer<typeof RECIPIENTSCHEMAARRAY>;
export declare const BATCHZODSCHEMA: z.ZodObject<
	{
		type: z.ZodObject<
			{
				type: z.ZodEnum<["usps", "ups", "fedex"]>;
				value: z.ZodString;
				label: z.ZodString;
				unit: z.ZodEnum<["oz", "lb"]>;
				id: z.ZodNumber;
			},
			"strip",
			z.ZodTypeAny,
			{
				type?: "usps" | "ups" | "fedex";
				value?: string;
				label?: string;
				unit?: "oz" | "lb";
				id?: number;
			},
			{
				type?: "usps" | "ups" | "fedex";
				value?: string;
				label?: string;
				unit?: "oz" | "lb";
				id?: number;
			}
		>;
		description: z.ZodOptional<z.ZodString>;
		name: z.ZodOptional<z.ZodString>;
		sender: z.ZodObject<
			{
				full_name: z.ZodString;
				company_name: z.ZodOptional<z.ZodString>;
				street_one: z.ZodString;
				street_two: z.ZodOptional<z.ZodString>;
				city: z.ZodString;
				zip: z.ZodString;
				state: z.ZodString;
				phone: z.ZodString;
				country: z.ZodDefault<z.ZodString>;
			},
			"strip",
			z.ZodTypeAny,
			{
				full_name?: string;
				company_name?: string;
				street_one?: string;
				street_two?: string;
				city?: string;
				zip?: string;
				state?: string;
				phone?: string;
				country?: string;
			},
			{
				full_name?: string;
				company_name?: string;
				street_one?: string;
				street_two?: string;
				city?: string;
				zip?: string;
				state?: string;
				phone?: string;
				country?: string;
			}
		>;
		sender_select: z.ZodOptional<z.ZodString>;
		package: z.ZodObject<
			{
				length: z.ZodNumber;
				name: z.ZodString;
				weight: z.ZodNumber;
				height: z.ZodNumber;
				width: z.ZodNumber;
				radio: z.ZodOptional<z.ZodString>;
				id: z.ZodOptional<z.ZodNumber>;
			},
			"strip",
			z.ZodTypeAny,
			{
				length?: number;
				name?: string;
				weight?: number;
				height?: number;
				width?: number;
				radio?: string;
				id?: number;
			},
			{
				length?: number;
				name?: string;
				weight?: number;
				height?: number;
				width?: number;
				radio?: string;
				id?: number;
			}
		>;
		package_select: z.ZodOptional<z.ZodString>;
		type_select: z.ZodOptional<z.ZodString>;
		shippingdate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
		reference1: z.ZodOptional<z.ZodString>;
		saturday: z.ZodOptional<z.ZodBoolean>;
		signature: z.ZodOptional<z.ZodBoolean>;
		saved_sender: z.ZodDefault<z.ZodBoolean>;
		batch_uuid: z.ZodString;
		recipient: z.ZodArray<
			z.ZodObject<
				{
					full_name: z.ZodString;
					company_name: z.ZodOptional<z.ZodString>;
					street_one: z.ZodString;
					street_two: z.ZodOptional<z.ZodString>;
					city: z.ZodString;
					zip: z.ZodString;
					state: z.ZodString;
					country: z.ZodDefault<z.ZodString>;
					uuid: z.ZodString;
					phone: z.ZodOptional<z.ZodString>;
				},
				"strip",
				z.ZodTypeAny,
				{
					full_name?: string;
					company_name?: string;
					street_one?: string;
					street_two?: string;
					city?: string;
					zip?: string;
					state?: string;
					country?: string;
					uuid?: string;
					phone?: string;
				},
				{
					full_name?: string;
					company_name?: string;
					street_one?: string;
					street_two?: string;
					city?: string;
					zip?: string;
					state?: string;
					country?: string;
					uuid?: string;
					phone?: string;
				}
			>,
			"many"
		>;
	},
	"strip",
	z.ZodTypeAny,
	{
		type?: {
			type?: "usps" | "ups" | "fedex";
			value?: string;
			label?: string;
			unit?: "oz" | "lb";
			id?: number;
		};
		description?: string;
		name?: string;
		sender?: {
			full_name?: string;
			company_name?: string;
			street_one?: string;
			street_two?: string;
			city?: string;
			zip?: string;
			state?: string;
			phone?: string;
			country?: string;
		};
		sender_select?: string;
		package?: {
			length?: number;
			name?: string;
			weight?: number;
			height?: number;
			width?: number;
			radio?: string;
			id?: number;
		};
		package_select?: string;
		type_select?: string;
		shippingdate?: string;
		reference1?: string;
		saturday?: boolean;
		signature?: boolean;
		saved_sender?: boolean;
		batch_uuid?: string;
		recipient?: {
			full_name?: string;
			company_name?: string;
			street_one?: string;
			street_two?: string;
			city?: string;
			zip?: string;
			state?: string;
			country?: string;
			uuid?: string;
			phone?: string;
		}[];
	},
	{
		type?: {
			type?: "usps" | "ups" | "fedex";
			value?: string;
			label?: string;
			unit?: "oz" | "lb";
			id?: number;
		};
		description?: string;
		name?: string;
		sender?: {
			full_name?: string;
			company_name?: string;
			street_one?: string;
			street_two?: string;
			city?: string;
			zip?: string;
			state?: string;
			phone?: string;
			country?: string;
		};
		sender_select?: string;
		package?: {
			length?: number;
			name?: string;
			weight?: number;
			height?: number;
			width?: number;
			radio?: string;
			id?: number;
		};
		package_select?: string;
		type_select?: string;
		shippingdate?: string;
		reference1?: string;
		saturday?: boolean;
		signature?: boolean;
		saved_sender?: boolean;
		batch_uuid?: string;
		recipient?: {
			full_name?: string;
			company_name?: string;
			street_one?: string;
			street_two?: string;
			city?: string;
			zip?: string;
			state?: string;
			country?: string;
			uuid?: string;
			phone?: string;
		}[];
	}
>;
export type BATCHZODSCHEMA = z.infer<typeof BATCHZODSCHEMA>;
export declare const SEARCHZODSCHEMA: z.ZodObject<
	{
		uuid: z.ZodOptional<z.ZodString>;
		name: z.ZodOptional<z.ZodString>;
		weight: z.ZodOptional<z.ZodString>;
		delivery_id: z.ZodOptional<z.ZodString>;
		weight_unit_query: z.ZodOptional<z.ZodString>;
		status: z.ZodOptional<z.ZodString>;
		from_date: z.ZodOptional<z.ZodDate>;
		end_date: z.ZodOptional<z.ZodDate>;
		search_type: z.ZodEnum<["label", "batch"]>;
	},
	"strip",
	z.ZodTypeAny,
	{
		uuid?: string;
		name?: string;
		weight?: string;
		delivery_id?: string;
		weight_unit_query?: string;
		status?: string;
		from_date?: Date;
		end_date?: Date;
		search_type?: "label" | "batch";
	},
	{
		uuid?: string;
		name?: string;
		weight?: string;
		delivery_id?: string;
		weight_unit_query?: string;
		status?: string;
		from_date?: Date;
		end_date?: Date;
		search_type?: "label" | "batch";
	}
>;
export type SEARCHZODSCHEMA = z.infer<typeof SEARCHZODSCHEMA>;
//# sourceMappingURL=labels.d.ts.map