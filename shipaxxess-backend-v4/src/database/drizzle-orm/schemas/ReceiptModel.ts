import { Schema, model, Document } from 'mongoose';

// interface of Receipt model
interface IReceipt extends Document {
  orderId: string;
  amount: number;
  userId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
// schema
const ReceiptSchema = new Schema<IReceipt>({
  orderId: { type: String, required: true },
  amount: { type: Number, required: true },
  userId: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
// model
const ReceiptModel = model<IReceipt>('Receipt', ReceiptSchema);

export default ReceiptModel;
