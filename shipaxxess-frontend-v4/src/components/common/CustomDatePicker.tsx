import React, { useState } from 'react';

import { startOfMonth, endOfMonth, subDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file


interface CustomDateRangePickerProps {
    onDateChange: (start: Date | null, end: Date | null) => void;
}

const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ({ onDateChange }) => {
    const [_state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'

        }
    ]);
    const [_isOpen, setIsOpen] = useState(false);

    const predefinedRanges = [
        {
            label: 'Today',
            range: () => ({
                startDate: new Date(),
                endDate: new Date(),
            }),
        },
        {
            label: 'Yesterday',
            range: () => ({
                startDate: subDays(new Date(), 1),
                endDate: subDays(new Date(), 1),
            }),
        },
        {
            label: 'Last 7 Days',
            range: () => ({
                startDate: subDays(new Date(), 6),
                endDate: new Date(),
            }),
        },
        {
            label: 'Last 30 Days',
            range: () => ({
                startDate: subDays(new Date(), 29),
                endDate: new Date(),
            }),
        },
        {
            label: 'This Month',
            range: () => ({
                startDate: startOfMonth(new Date()),
                endDate: endOfMonth(new Date()),
            }),
        },
        {
            label: 'Last Month',
            range: () => ({
                startDate: startOfMonth(subDays(new Date(), 30)),
                endDate: endOfMonth(subDays(new Date(), 30)),
            }),
        },
        {
            label: 'Last 3 Months',
            range: () => ({
                startDate: subDays(new Date(), 90),
                endDate: new Date(),
            }),
        },
        {
            label: 'Last 6 Months',
            range: () => ({
                startDate: subDays(new Date(), 180),
                endDate: new Date(),
            }),
        },
        {
            label: 'Last 1 Year',
            range: () => ({
                startDate: subDays(new Date(), 365),
                endDate: new Date(),
            }),
        },


    ];



    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const range = predefinedRanges.find(range => range.label === event.target.value);

        if (range) {
            const { startDate, endDate } = range.range();
            setState([{ startDate, endDate, key: 'selection' }]);
            onDateChange(startDate, endDate);
        }
        if (range?.label === 'Custom Range') setIsOpen(true);
    };

    return (
        <div>
            <label htmlFor="date-range" className='px-1 mx-1'>Choose Date:</label>
            <select onChange={handleSelectChange}>
                {predefinedRanges.map(({ label }) => (
                    <option key={label} value={label}>
                        {label}
                    </option>
                ))}
            </select>


        </div>
    );
};

export default CustomDateRangePicker;
