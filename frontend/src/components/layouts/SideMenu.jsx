import { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import {  useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
const SideMenu = ({ activeMenu, onNavigate, mobile = false }) => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();
    

    const handleClick = (route) => {
        if (route === "/logout") {
            handleLogout();
            return;
        }
        navigate(route);
        onNavigate?.();
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
        onNavigate?.();
    };

    return (
        <div className={`h-full border border-slate-200/80 ${mobile ? "w-full rounded-r-3xl" : "sticky top-[81px] w-72 border-r"} bg-white/95 p-5 shadow-xl shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-black/20`}>
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                {user?.profileImageUrl ? (
                    <img
                        src={user?.profileImageUrl || ""}
                        alt="Profile Image"
                        className="h-20 w-20 rounded-full bg-slate-400 object-cover"
                    />
                ) : <CharAvatar
                    fullName={user?.fullName}
                    width="w-20"
                    height="h-20"
                    style="text-xl"
                />



                }
                <h5 className="text-center text-base font-medium leading-6 text-slate-900 dark:text-slate-100">
                    {user?.fullName || ""}
                </h5>
            </div>

            <div className="px-4">
                {SIDE_MENU_DATA.map((item, index) => {
                    
                    return (
                        <button
                            key={`menu_${index}`}
                            className={`mb-3 flex w-full items-center gap-4 rounded-xl px-5 py-3 text-left text-[15px] font-medium transition-colors ${activeMenu==item.label
                                ? "bg-primary text-white shadow-lg shadow-purple-500/20"
                                : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                                }`}
                            onClick={() => handleClick(item.path)}
                        >
                            <item.icon className="text-xl" />
                            {item.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SideMenu;
