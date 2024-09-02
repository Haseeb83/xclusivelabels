import { DatePicker } from '@client/components/common/picker';
import React, { useState } from 'react';

interface DateRangePickerProps {
    onDateChange: (start: Date | null, end: Date | null) => void;
    _startDate?: Date | null;
    _endDate?: Date | null;
    placeholder?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateChange, _startDate, _endDate }) => {

    // get start and end date from the parent component
    const [startDate, setStartDate] = useState<Date | null>(_startDate ?? null);
    const [endDate, setEndDate] = useState<Date | null>(_endDate ?? null);
    // handle the date change
    const handleStartDateChange = (start: Date | null) => {
        setStartDate(start);
        onDateChange(start, endDate);
    };
    const handleEndDateChange = (end: Date | null) => {
        setEndDate(end);
        onDateChange(startDate, end);
    };


    return (
        <div className="p-3 bg-white shadow-md rounded-lg my-2 flex">
            <div className="flex flex-col mr-2">
                {/* <label htmlFor="start-date" className="text-gray-600 mb-2">Start Date</label> */}
                <DatePicker
                    field={{
                        onChange: handleStartDateChange,
                        onBlur: () => { },
                        value: startDate,
                        disabled: false,
                        name: 'start-date',
                        ref: () => { }


                    }}
                    placeholder='Start Date'

                />
            </div>
            <div className="flex flex-col">
                {/* <label htmlFor="end-date" className="text-gray-600 mb-2">End Date</label> */}
                <DatePicker
                    field={{
                        onChange: handleEndDateChange,
                        onBlur: () => { },
                        value: endDate,
                        disabled: false,
                        name: 'end-date',
                        ref: () => { }
                    }}
                    placeholder='End Date'
                />
            </div>
        </div>
    );
};

export default DateRangePicker;
