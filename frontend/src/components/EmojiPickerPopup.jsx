import React, { useState } from 'react'
import { LuImage, LuX } from 'react-icons/lu'
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react'
import { normalizeEmojiIcon } from '../utils/helper'

const isImageIcon = (value) => typeof value === "string" && /^(https?:)?\/\//.test(value);

const EmojiPickerPopup = ({ icon, onSelect }) => {

    const [isOpen, setIsOpen] = useState(false)
    const displayIcon = normalizeEmojiIcon(icon)
    return (
        <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
            <div className='flex items-center gap-4 cursor-pointer'
                onClick={() => setIsOpen(true)}>
                <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 text-2xl text-primary dark:bg-purple-500/10'>
                    {displayIcon ? (
                        isImageIcon(displayIcon) ? (
                            <img src={displayIcon} alt='Icon' className='w-12 h-12' />
                        ) : (
                            <span>{displayIcon}</span>
                        )
                    ) : (
                        <LuImage />
                    )
                    }

                </div>
                <p className='text-slate-700 dark:text-slate-200'>{displayIcon ? "Change Icon" : "Pick Icon"}</p>
            </div>
            {isOpen && (
                <div className='relative'>
                    <button
                        className='absolute -top-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
                        onClick={() => setIsOpen(false)}
                    >
                        <LuX />

                    </button>
                    <EmojiPicker
                        emojiStyle={EmojiStyle.NATIVE}
                        open={isOpen}
                        onEmojiClick={(emojiData) => {
                            onSelect(emojiData?.emoji || "")
                            setIsOpen(false)
                        }}

                    />
                </div>
            )

            }


        </div>
    )
}

export default EmojiPickerPopup
