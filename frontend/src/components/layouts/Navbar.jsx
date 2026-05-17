import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { LuMoonStar, LuSunMedium } from 'react-icons/lu';
import SideMenu from './SideMenu';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <>
    <div className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 px-4 py-4 backdrop-blur md:px-6 dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 xl:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            onClick={() => setOpenSideMenu(!openSideMenu)}
            aria-label={openSideMenu ? "Close menu" : "Open menu"}
          >
            {openSideMenu ? (
              <HiOutlineX className="text-2xl" />
            ) : (
              <HiOutlineMenu className="text-2xl" />
            )}
          </button>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Expense Tracker</h2>
            <p className="hidden text-xs text-slate-500 sm:block dark:text-slate-400">
              Track, review, and export your finances
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          onClick={toggleTheme}
        >
          {isDarkMode ? <LuSunMedium className="text-lg" /> : <LuMoonStar className="text-lg" />}
          <span className="hidden sm:inline">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>
    </div>

      {openSideMenu && (
        <div className="xl:hidden">
          <button
            type="button"
            className="fixed inset-0 z-40 bg-slate-950/45"
            onClick={() => setOpenSideMenu(false)}
            aria-label="Close menu overlay"
          />
          <div className="fixed inset-y-0 left-0 z-50 w-[85vw] max-w-xs pt-[76px]">
            <SideMenu activeMenu={activeMenu} onNavigate={() => setOpenSideMenu(false)} mobile />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
