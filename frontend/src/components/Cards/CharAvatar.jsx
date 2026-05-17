import React from 'react'
import { getInitials } from '../../utils/helper'

const CharAvatar = ({fullName,width,height,style}) => {
  return (
    <div className={`${width || "w-12"} ${height || "h-12"} ${style || ""}  
    flex items-center justify-center rounded-full bg-slate-100 font-medium text-slate-900 dark:bg-slate-800 dark:text-slate-100
    `}>
      {getInitials(fullName ||"")}
    </div>
  )
}

export default CharAvatar
