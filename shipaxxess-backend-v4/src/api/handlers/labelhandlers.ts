import { Request, Response } from 'express';
import { db } from '../database/drizzle-orm/schemas/payments'; // Assuming drizzle-orm is your database connection

// Handler to get individual labels for a customer
export const getCustomerLabel = async (req: Request, res: Response) => {
    try {
        const { customerId } = req.params;

        // Fetch label details from the database
        const label = await db.label.findUnique({
            where: { customerId },
        });

        if (!label) {
            return res.status(404).json({ message: 'Label not found' });
        }

        // Return the label details
        return res.status(200).json({ label });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
