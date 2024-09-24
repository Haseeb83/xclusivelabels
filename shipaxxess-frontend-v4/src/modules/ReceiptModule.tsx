import { useState } from 'react';
import axios from 'axios';

const ReceiptModule = () => {
    const [receipt, setReceipt] = useState(null);

    const fetchReceipt = async (paymentId: string) => {
        try {
            const response = await axios.post('/api/generate-receipt', { paymentId });
            setReceipt(response.data.receipt);
        } catch (error) {
            console.error('Error fetching receipt:', error);
        }
    };

    return (
        <div>
            <button onClick={() => fetchReceipt('paymentId')}>Get Receipt</button>
            {receipt && (
                <div>
                    <h3>Receipt:</h3>
                    <pre>{JSON.stringify(receipt, null, 2)}</pre>
                    {/* Optionally add a download button */}
                </div>
            )}
        </div>
    );
};

export default ReceiptModule;
