import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';
const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            //upload the image state
            setImage(file);
            //generate preview url from the file
            const preview = URL.createObjectURL(file)
            setPreviewUrl(preview)
        }
    };

    const handleRemoveImage = () => {
        setImage(null)
        setPreviewUrl(null)
    };

    const onChooseFile = () => {
        inputRef.current.click();
    }
    return (
        <div className='flex justify-center mb-6 '>
            <input
                type="file"
                accept='image/*'
                ref={inputRef}
                onChange={handleImageChange}
                className='hidden'
            />

            {
                !image ? (
                    <div className='relative flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-500/10'>
                        <LuUser className='text-primary text-4xl ' />
                        <button
                            type='button'
                            className='absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white'
                            onClick={onChooseFile}
                        >
                            <LuUpload />
                        </button>

                    </div>
                ) : (
                    <div className=' relative'>
                        <img
                            src={previewUrl}
                            className='w-20 h-20 rounded-full object-cover'
                            alt="profile photo"
                        />

                        <button
                        type='button'
                        className='absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white'
                        onClick={handleRemoveImage}
                        >
                            <LuTrash />
                        </button>
                    </div>

                )
            }
        </div>
    )
}

export default ProfilePhotoSelector
