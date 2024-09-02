import React, { useState } from 'react';

const PricingSettings = () => {
    const [discount, setDiscount] = useState(20);
    const [specificClassDiscount, setSpecificClassDiscount] = useState(0);
    const [file, setFile] = useState<File | null>(null);

    const handleDiscountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDiscount(parseInt(event.target.value));
    };

    const handleSpecificClassDiscountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpecificClassDiscount(parseInt(event.target.value));
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleUploadClick = async () => {
        if (file) {
            //  FormData object to send the file
            const formData = new FormData();
            formData.append('file', file);
    
            try {
                // Send the file to the server
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const result = await response.json();
                console.log("File uploaded successfully:", result);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        } else {
            alert("Please select a file to upload.");
        }
    };    
    return (
        <div>
            <h2>Dynamic Pricing Settings</h2>
            <label>
                Default Discount (%):
                <input type="number" value={discount} onChange={handleDiscountChange} />
            </label>
            <br />
            <label>
                Specific Shipping Class Discount (%):
                <input type="number" value={specificClassDiscount} onChange={handleSpecificClassDiscountChange} />
            </label>
            <br />
            <label>
                Upload Pricing Spreadsheet:
                <input type="file" onChange={handleFileUpload} />
            </label>
            <button onClick={handleUploadClick}>Upload</button>
            {}
        </div>
    );
};

export default PricingSettings;

console.log("PricingSettings loaded");