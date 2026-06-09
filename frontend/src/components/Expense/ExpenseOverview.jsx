import React, { useEffect,useState } from 'react'
import { prepareExpenseLineChartData } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
    const [chartData, setChartData] = useState([])
    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result)
        return () => { };
    }, [transactions])
    return (
        <div className="card">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h5 className="text-lg text-slate-900 dark:text-slate-100">Expense Overview</h5>
                    <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                        Track your spending trends over time and gain insights where your money goes.
                    </p>
                </div>
                
                <button className="add-btn" onClick={onExpenseIncome}>
                    <LuPlus className="text-lg" />
                    Add Expense
                </button>
            </div>
            <div className="mt-10">
                <CustomLineChart data={chartData} />
            </div>
        </div>
    )

}

export default ExpenseOverview
