type Bindings = {
	DB: D1Database;
	FRONTEND_URL: string;
	LABELS_BUCKET: R2Bucket;
	BATCH_KV: KVNamespace;
	BATCH_QUEUE: Queue;
	BATCH_PDF_QUEUE: Queue;
	SUPER_PASSWD: string;
};

type Variables = {
	jwtPayload: { id: number };
};

interface App {
	Bindings: Bindings;
	Variables: Variables;
}
