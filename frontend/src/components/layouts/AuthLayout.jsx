import React from 'react'
import CARD_2 from '../../assets/images/card2.png'
import { LuTrendingUpDown } from "react-icons/lu"



const AuthLayout = ({ children }) => {
    return (
        <div className='grid min-h-screen lg:grid-cols-[minmax(0,1fr)_440px]'>
            <div className='flex min-h-screen flex-col px-6 pb-10 pt-8 sm:px-10 lg:px-16'>
                <h2 className='text-lg font-semibold text-slate-900 dark:text-slate-100'>Expense Tracker</h2>
                {children}

            </div>

            <div className='relative hidden overflow-hidden border-l border-slate-200/70 bg-violet-50 bg-auth-bg-img bg-cover bg-center bg-no-repeat p-8 dark:border-slate-800 dark:bg-slate-900 lg:block'>


                <div className='absolute -left-5 -top-7 h-48 w-48 rounded-[40px] bg-purple-600/90'></div>
                <div className='absolute -right-10 top-[30%] h-56 w-48 rounded-[40px] border-[20px] border-fuchsia-600/90'></div>
                <div className='absolute -bottom-7 -left-5 h-48 w-48 rounded-[40px] bg-violet-500/90'></div>
                <div className='relative z-20 grid grid-cols-1'>
                    <StatusInfoCard
                        icon={<LuTrendingUpDown/>}
                        label="Track Your Icome & Expenses"
                        value="430000"
                        color="bg-primary"
                    />

                </div>
                <img src={CARD_2} className='absolute bottom-10 w-64 rounded-2xl shadow-lg shadow-blue-950/10 lg:w-[90%]' alt="" />
            </div>
        </div>
    )
}

export default AuthLayout

const StatusInfoCard = ({ icon, label, value, color }) => {
    return (
        <div className='z-10 flex gap-6 rounded-2xl border border-white/50 bg-white/90 p-5 shadow-md shadow-purple-400/10 backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/85 dark:shadow-black/20'>
            <div className={`z-20 w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-1xl`}>
                {icon}
            </div>
           
            <div>
                <h6 className='mb-1 text-xs text-slate-500 dark:text-slate-400'>{label}</h6>
                <span className='text-[20px] text-slate-900 dark:text-slate-100'>${value}</span>
            </div>

        </div>
    )

}
