import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
    return (
        <div className='card'>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <h5 className='text-lg text-slate-900 dark:text-slate-100'>Expenses</h5>
                <button className='card-btn' onClick={onSeeMore}>
                    See All <LuArrowRight className='text-base' />
                </button>

            </div>
            <div className='mt-6'>
                {!transactions?.length && (
                    <p className='text-sm text-slate-500 dark:text-slate-400'>No expense transactions found yet.</p>
                )}

                {transactions?.slice(0, 4)?.map((expense) => (
                    <TransactionInfoCard
                        key={expense._id}
                       
                        title={expense.category}
                        icon={expense.icon}
                        date={moment(expense.date).format("Do MMM YYYY")}
                        amount={expense.amount}
                        type="expense"
                        hideDeleteBtn
                    />

                )
                )

                }

            </div>



        </div>
    )
}

export default ExpenseTransactions
