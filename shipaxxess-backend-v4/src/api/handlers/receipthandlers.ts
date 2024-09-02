import { Request, Response } from 'express';
import { db } from '../database/drizzle-orm';  
import { generateReceipt } from '../helpers/receiptGenerator';

// Handler to generate receipt for a payment
export const createReceipt = async (req: Request, res: Response) => {
    try {
        const { paymentId } = req.body;

        // Fetch payment details from the database
        const payment = await db.payment.findUnique({
            where: { id: paymentId },
        });

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Generate receipt
        const receipt = generateReceipt(payment);

        // Store receipt in database (if necessary) or return as response
        return res.status(200).json({ receipt });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
