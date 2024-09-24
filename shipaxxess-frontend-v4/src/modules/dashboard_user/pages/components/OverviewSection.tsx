import React, { ReactElement } from 'react';

interface OverviewSectionProps {
    title: string;
    value: number;
    icon?: ReactElement; // Change the type of 'icon' to 'ReactElement'
    linkText?: string | string[];
    linkUrl?: string | string[];
}

const OverviewSection: React.FC<OverviewSectionProps> = ({ title, value, icon, linkText, linkUrl }) => {
    // Determine the text color based on value being negative or positive
    const valueColorClass = value < 0 ? "text-red-600" : "text-gray-600";

    return (
        <div className="bg-gray-200 p-4 rounded transition duration-300 hover:shadow-lg">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                {icon}
            </div>
            {/* if the vlaue is negive then the sign will be like -$ 5.6 */}
            <h3 className={`text-xl font-bold ${valueColorClass}`}>{value < 0 ? "-$" : "$"}{Math.abs(value).toFixed(2)}</h3>
            {linkText && (
                <>
                    <div className="flex mt-2">
                        <hr className="flex-1 border-t-2 border-gray-300 mr-2" />
                    </div>
                    <div className='mt-2 flex justify-end'>
                        {Array.isArray(linkText) ? (    // Check if 'linkText' is an array
                            linkText.map((text, index) => (
                                <a
                                    key={index}
                                    href={Array.isArray(linkUrl) ? linkUrl[index] : linkUrl}
                                    className="text-blue-500 hover:text-blue-700 ml-2 mt-3 inline-block"
                                    style={{ cursor: 'pointer' }}
                                >
                                    {text}
                                </a>
                            ))
                        ) : (

                            <a
                                // @ts-ignore
                                href={linkUrl}
                                className="text-blue-500 hover:text-blue-700 ml-2 mt-3 inline-block"
                                style={{ cursor: 'pointer' }}
                            >
                                {linkText}
                            </a>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default OverviewSection;
