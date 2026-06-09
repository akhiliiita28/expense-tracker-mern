import React, { useRef, useEffect } from 'react'
import { LuDownload,LuSearch } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'
const IncomeList = ({
    transactions,
    onDelete,
    onDownload, showSearch,
    searchQuery, onSearchChange, onSearch,
}) => {
    const searchExpenseRef = useRef(null);
    const searchBoxRef = useRef(null);
    useEffect(() => {
        if (showSearch) searchExpenseRef.current?.focus();
    }, [showSearch])
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBoxRef.current &&
                !searchBoxRef.current.contains(event.target)
            ) {
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
        <div className='card'>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <h5 className='text-lg text-slate-900 dark:text-slate-100'>Income Sources</h5>

                <div ref={searchBoxRef} className='flex items-center gap-3'>
                    {
                        showSearch &&
                        <input className="card-btn"
                            ref={searchExpenseRef}
                            type='text'
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder='Search Expenses...'


                        />
                    }

                    <button className="card-btn" onClick={onSearch}>
                        <LuSearch className='text-base' /> Search
                    </button>

                    <button className='card-btn ' onClick={onDownload}>
                        <LuDownload className='text-base' />Downlaod
                    </button>
                </div>

            </div>

            <div className='mt-4 grid grid-cols-1 gap-2 md:grid-cols-2' >
                {transactions?.map(income => (
                    <TransactionInfoCard
                        key={income._id}
                        title={income.source}

                        icon={income.icon}
                        date={moment(income.date).format("Do MMM YYYY")}

                        amount={income.amount}
                        type="income"
                        onDelete={() => onDelete(income._id)}
                    // hideDeleteBtn
                    />
                ))}
            </div>

        </div>
    )
}

export default IncomeList
