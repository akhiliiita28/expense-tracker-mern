import React from 'react'

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {

        return (
            <div className='rounded-lg border p-4 shadow-md' style={{ backgroundColor: "var(--tooltip-bg)", borderColor: "var(--tooltip-border)" }}>
                <p className='mb-2 text-sm text-slate-600 dark:text-slate-300'>{payload[0].payload.name}</p>
                <p className='text-sm text-slate-600 dark:text-slate-300'>
                    Amount:{" "}
                    <span className='text-sm font-medium text-slate-900 dark:text-slate-100'>
                        ${payload[0].value}
                    </span>
                </p>
            </div>

        );
    }
    
};

export default CustomTooltip
