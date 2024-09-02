import { ExecutionContext, Request as WorkerRequest } from '@cloudflare/workers-types'; 
import appHandler from '@handlers/app'; 
import { queue as queueHandler } from '@handlers/queue'; 
import express, { Request, Response } from 'express';
import { createNotification, deleteNotification, getUserNotifications } from '@handlers/notifications';
import { Router } from 'express';
const newrouter = express.Router();

newrouter.post('/notifications', async (req: Request, res: Response) => {
  try {
    const { message, type, userId } = req.body;
    if (!message || !type || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const notification = await createNotification(message, type, userId);
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create notification' });
  }
});

// Route to get notifications for a specific user
newrouter.get('/notifications/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const notifications = await getUserNotifications(Number(userId));
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get notifications' });
  }
});

// Route to delete a notification
newrouter.delete('/notifications/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteNotification(Number(id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete notification' });
  }
});

const routertwo = Router();
const handleFetch = (req: WorkerRequest, env: Bindings, ctx: ExecutionContext) => {
  return appHandler.fetch(req, env, ctx);
};

const handleQueue = (batch: MessageBatch<any>, env: Bindings) => {
  return queueHandler(batch, env); 
};

// Express application setup
const expressApp = express();
const port = 3000;

expressApp.use('/api', routertwo);

// Start server
expressApp.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Export functions for serverless environment (if needed)
export const serverlessHandlers = {
  fetch: handleFetch,
  queue: handleQueue
};
import { PricingService } from '@handlers/pricingservice';
import { ReceiptService } from '@handlers/receiptservice';

const router = Router();
const pricingService = new PricingService();
const receiptService = new ReceiptService();

// Route to calculate pricing
router.post('/calculate-price', (req: Request, res: Response) => {
  const { packageDetails, discount } = req.body;
  const price = pricingService.calculatePrice(packageDetails, discount);
  res.json({ price });
});

// Route to create receipt
router.post('/create-receipt', async (req: Request, res: Response) => {
  const receipt = await receiptService.createReceipt(req.body);
  res.json({ receipt });
});

// Route to get receipt
router.get('/receipt/:id', async (req: Request, res: Response) => {
  const receipt = await receiptService.getReceipt(req.params.id);
  res.json({ receipt });
});

export default router;

