import React from 'react'

const InfoCard = ({icon,label,value,color}) => {
  return (
    <div className='flex gap-4 rounded-2xl border border-slate-200/70 bg-white/95 p-5 shadow-md shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/20 sm:gap-6 sm:p-6'>
        <div className={`w-16  h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
            {icon}
        </div>
        <div>
            <h6 className='mb-1 text-sm text-slate-500 dark:text-slate-400'>{label}</h6>

            <span className='text-[22px] text-slate-900 dark:text-slate-100'>${value}</span>
        </div>

        
      
    </div>
  )
}

export default InfoCard
