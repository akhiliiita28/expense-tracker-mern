import React, { useRef, useEffect } from 'react'
import { LuDownload, LuSearch } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseList = ({ transactions, onDelete, onDownload, showSearch, searchQuery, onSearchChange, onSearch }) => {
    const searchInputRef = useRef(null);
    const searchBoxRef = useRef(null);
    useEffect(() => {
        if (showSearch) searchInputRef.current?.focus();
    }, [showSearch])
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBoxRef.current &&
                !searchBoxRef.current.contains(event.target)
            ){
                onSearch(false);//close search
                onSearchChange("")//clear input
            }

        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="card">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h5 className="text-lg text-slate-900 dark:text-slate-100">All Expenses</h5>
                <div ref={searchBoxRef} className='flex items-center gap-3' >
                    {
                        showSearch &&
                        <input className="card-btn"
                            ref={searchInputRef}
                            type='text'
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder='Search Expenses...'
                        />
                    }

                    <button className="card-btn" onClick={onSearch}>
                        <LuSearch className='text-base' /> Search
                    </button>
                    <button className="card-btn" onClick={onDownload}>
                        <LuDownload className="text-base" /> Download
                    </button>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
                {transactions?.map((expense) => (
                    <TransactionInfoCard
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={moment(expense.date).format("Do MMM YYYY")}
                        amount={expense.amount}
                        type="expense"
                        onDelete={() => onDelete(expense._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ExpenseList
