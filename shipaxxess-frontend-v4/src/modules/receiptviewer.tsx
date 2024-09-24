import { useState, useEffect } from 'react';

// type for the receipt
interface Receipt {
    Name: String
    orderId: string;
    Email:string
    Location: String
}

const ReceiptViewer = ({ receiptId }: { receiptId: string }) => {
    const [receipt, setReceipt] = useState<Receipt | null>(null);

    useEffect(() => {
        fetch(`/api/receipt/${receiptId}`)
            .then(response => response.json())
            .then(data => setReceipt(data));
    }, [receiptId]);

    return (
        <div>
            {receipt ? (
                <div>
                    <h2>Receipt for Order {receipt.orderId}</h2>
                    {/* Render other receipt details here */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ReceiptViewer;

