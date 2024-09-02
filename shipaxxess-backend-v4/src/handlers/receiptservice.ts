import { Database } from "lucide-react";
import  ReceiptModel  from '@schemas/ReceiptModel';
import { drizzle } from "drizzle-orm/d1";
import schemas from "@schemas/index";

export class ReceiptService {
    public async createReceipt(paymentDetails: any) {
        //create and store receipt
        const receipt = new ReceiptModel(paymentDetails);
        await receipt.save();
        return receipt;
    }

    public async getReceipt(receiptId: string) {
        //retrieve receipt
        return await ReceiptModel.findById(receiptId);
    }
}
