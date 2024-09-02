import { Router } from 'express';
import { PricingService } from '@handlers/pricingservice';
import { ReceiptService } from '../handlers/receiptservice';

const router = Router();
const pricingService = new PricingService();
const receiptService = new ReceiptService();

// calculate pricing
router.post('/calculate-price', (req: { body: { packageDetails: any; discount: any; }; }, res: { json: (arg0: { price: void; }) => void; }) => {
    const { packageDetails, discount } = req.body;
    const price = pricingService.calculatePrice(packageDetails, discount);
    res.json({ price });
});

// create receipt
router.post('/create-receipt', async (req: { body: any; }, res: { json: (arg0: { receipt: any; }) => void; }) => {
    const receipt = await receiptService.createReceipt(req.body);
    res.json({ receipt });
});

// get receipt
router.get('/receipt/:id', async (req: { params: { id: string; }; }, res: { json: (arg0: { receipt: any; }) => void; }) => {
    const receipt = await receiptService.getReceipt(req.params.id);
    res.json({ receipt });
});

export default router;
