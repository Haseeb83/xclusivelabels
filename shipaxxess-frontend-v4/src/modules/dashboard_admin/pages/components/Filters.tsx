import React from 'react';

interface FiltersProps {
    onDateChange: (start: Date | null, end: Date | null) => void;
}

const Filters: React.FC<FiltersProps> = () => {
    return (
        <div className="flex items-center gap-x-2">

            <span>Date Range Picker Placeholder</span>
        </div>
    );
};

export default Filters;
