import React from 'react'
import { LuTrash2, LuTrendingDown, LuTrendingUp, LuUtensils } from 'react-icons/lu'
import { normalizeEmojiIcon } from '../../utils/helper'

const isImageIcon = (value) => typeof value === "string" && /^(https?:)?\/\//.test(value);

const TransactionInfoCard = ({
    keyId, title, icon, date, amount, type, hideDeleteBtn, onDelete }) => {

    const getAmountStyles = () => type === "income"
        ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-300"
        : "bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-300";
    const displayIcon = normalizeEmojiIcon(icon);

    return <div className='group relative mt-2 flex items-center gap-4 rounded-xl p-3 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'>

        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-500 dark:bg-slate-800 dark:text-slate-300'>
            {displayIcon ? (
                isImageIcon(displayIcon) ? (
                    <img src={displayIcon} alt={title} className='w-6 h-6' />
                ) : (
                    <span className='text-2xl leading-none'>{displayIcon}</span>
                )
            ) : (
                <LuUtensils />
            )}
        </div>

        <div className='flex-1 flex items-center justify-between '>
            <div>
                <p className='text-sm font-medium text-slate-700 dark:text-slate-100'>{title}</p>
                <p className='mt-1 text-xs text-slate-400 dark:text-slate-500'>{date}</p>
            </div>
            <div className='flex items-center gap-2'>
                {!hideDeleteBtn && (
                    <button className='cursor-pointer text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500'
                        onClick={() => onDelete?.(keyId)}>
                        <LuTrash2 size={18} />
                    </button>
                )}
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                    <h6 className='text-xs font-medium'>
                        {type === "income" ? "+" : "-"} ${amount}
                    </h6>
                    {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}

                </div>
            </div>
        </div>

    </div>

}

export default TransactionInfoCard
