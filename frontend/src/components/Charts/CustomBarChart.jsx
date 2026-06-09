import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";
import { addThousandsSeperator } from '../../utils/helper';

const CustomBarChart = ({ data, type }) => {
    const getBarColor = (index) => {
        return index % 2 === 0 ? "#875cf5" : "#cfbefb";
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const chartPoint = payload[0].payload;
            return (
                <div className="rounded-lg border p-2 shadow-md" style={{ backgroundColor: "var(--tooltip-bg)", borderColor: "var(--tooltip-border)" }}>
                    <p className="text-xs font-semibold text-purple-800 mb-1 ">
                        {chartPoint.category}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                        Total {type} :{" "}
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            ${addThousandsSeperator(chartPoint.amount)}
                        </span>
                    </p>
                    {chartPoint.transactionCount > 1 && (
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                             {chartPoint.transactionCount} entries on this day
                        </p>
                    )}
                </div>
            );
        }
        return null;
    };
    return (
        <div className='mt-6'>
            <ResponsiveContainer width="100%" height={300} >
                <BarChart data={data}>
                    <CartesianGrid stroke='none' />
                    <XAxis dataKey="category" tick={{ fontSize: 12, fill: "var(--chart-axis)" }} stroke='none' />
                    <YAxis tick={{ fontSize: 12, fill: "var(--chart-axis)" }} stroke='none' />

                    <Tooltip 
                    content={CustomTooltip}
                    cursor={{ fill: "rgba(99,102,241,0.12)" }}

                    />
                    <Bar
                        dataKey="amount"
                        fill="#FF8042"
                        radius={[10, 10, 0, 0]}
                       
                    >
                        {data?.map((entry, index) => (
                            <Cell key={index} fill={getBarColor(index)} />
                        ))}
                    </Bar>

                </BarChart>
            </ResponsiveContainer>

        </div>
    )
}

export default CustomBarChart
