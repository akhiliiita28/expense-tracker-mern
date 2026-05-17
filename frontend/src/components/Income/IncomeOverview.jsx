import React from 'react'
import { useEffect, useState } from 'react'
import { prepareIncomeBarChartData } from '../../utils/helper'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'
const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions)
        setChartData(result)
        return () => { }

    }, [transactions])
    return <div className='card'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <div className=''>
                <h5 className='text-lg text-slate-900 dark:text-slate-100'>Income Overview</h5>
                <p className='mt-0.5 text-xs text-slate-400 dark:text-slate-500'>
                    Track your earnings over time and analyze your income
                </p>
            </div>

            <button className='add-btn' onClick={onAddIncome}>
                <LuPlus className='text-lg' />
                Add Income
            </button>
        </div>
        <div className='mt-10'>
            <CustomBarChart
                data={chartData} type='Income'
            />
        </div>

    </div>

}

export default IncomeOverview
