import React from 'react'

const Modal = ({ children, isOpen, onClose, title }) => {
    if (!isOpen) return null
    return <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/45 px-4 py-6'>
        <div className='relative max-h-full w-full max-w-2xl'>
            <div className='relative rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-300/20 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20'>
                <div className='flex items-center justify-between border-b border-slate-200 p-4 rounded-t-2xl md:p-5 dark:border-slate-800'>
                    <h3 className='text-lg font-medium text-slate-900 dark:text-slate-100'>
                        {title}
                    </h3>
                    <button
                        type='button'
                        className='inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                        onClick={onClose}
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </button>
                </div>
                <div className='p-4 md:p-5 space-y-4'>
                    {children}
                </div>
            </div>
        </div>
    </div>

}

export default Modal
