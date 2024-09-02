import { Context } from "hono";

const clients = new Map<number, WebSocket>();

export const WebSocketUser = (c: Context<App>) => {
    const upgradeHeader = c.req.header("Upgrade");

    if (!upgradeHeader || upgradeHeader !== "websocket") {
        return new Response("Expected Upgrade: websocket", { status: 426 });
    }

    const webSocketPair = new WebSocketPair();
    const [client, server] = Object.values(webSocketPair);

    server.accept();

	server.addEventListener("open", async () => {
		// Here, you should authenticate the user and get their user ID
		const userId = await authenticateAndGetUserId(c); // Implement this function

		// Store the WebSocket connection with the user ID
		clients.set(userId, server);
		console.log(`User ${userId} connected`);
	});

	server.addEventListener("message", async (event) => {
		console.log("new message", event.data);
	});

	server.addEventListener("error", () => {
		console.log("error");
		clients.forEach((client, userId) => {
			if (client === server) {
				clients.delete(userId);
			}
		});
		server.close();
	});

	server.addEventListener("close", () => {
		console.log("server is closing");
		clients.forEach((client, userId) => {
			if (client === server) {
				clients.delete(userId);
			}
		});
		server.close();
	});

    server.addEventListener("close", async () => {
        console.log("Server is closing");
        connections.delete(server);
        server.close();
    });

    return new Response(null, {
        status: 101,
        webSocket: client,
    });
};

// Example function to authenticate and get user ID
async function authenticateAndGetUserId(c: Context<App>): Promise<number> {
	
	return c.get("jwtPayload").id
}

export { clients };

