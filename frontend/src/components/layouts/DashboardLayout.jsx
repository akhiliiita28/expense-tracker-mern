import React, { useContext } from 'react'
import Navbar from './Navbar'
import SideMenu from './SideMenu'
import {UserContext} from "../../context/UserContext"

const DashboardLayout = ({ children, activeMenu }) => {
    const {user}= useContext(UserContext)
    return (
        <div className='min-h-screen'>
            <Navbar activeMenu={activeMenu} />
            {user && (
                <div className='mx-auto flex w-full max-w-[1600px]'>
                    <div className='hidden xl:block'>
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                    <main className='min-w-0 grow px-4 pb-8 pt-4 sm:px-6 lg:px-8'>{children}</main>

                </div>
            )
            }
        </div>
    )
}

export default DashboardLayout
