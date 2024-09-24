import{ useState, useEffect } from 'react';
import axios from 'axios';

const LabelModule = ({ customerId }:any) => {
    const [label, setLabel] = useState(null);

    useEffect(() => {
        const fetchLabel = async () => {
            try {
                const response = await axios.get(`/api/get-label/${customerId}`);
                setLabel(response.data.label);
            } catch (error) {
                console.error('Error fetching label:', error);
            }
        };

        fetchLabel();
    }, [customerId]);

    return (
        <div>
            {label ? (
                <div>
                    <h3>Label for Customer {customerId}:</h3>
                    <pre>{JSON.stringify(label, null, 2)}</pre>
                </div>
            ) : (
                <p>Loading label...</p>
            )}
        </div>
    );
};

export default LabelModule;
