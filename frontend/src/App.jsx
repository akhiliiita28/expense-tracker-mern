import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from "./pages/Dashboard/Home"
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense'
import UserProvider from './context/UserContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <div>
          <Router>
            <Routes>
              <Route path='/' element={<Root />} />
              <Route path='/login' exact element={<Login />} />
              <Route path='/signup' exact element={<SignUp />} />
              <Route path='/dashboard' exact element={<Home />} />
              <Route path='/income' exact element={<Income />} />
              <Route path='/expense' exact element={<Expense />} />

            </Routes>
          </Router>
        </div>

        <ThemedToaster />
      </UserProvider>
    </ThemeProvider>
  )
}

export default App

const Root = () => {
  //check if token exist in localstorage
  const isAuthenticated = !!localStorage.getItem("token");
  //redirect to dashboard if authenticed, otherwise to login
  return isAuthenticated ? (
    <Navigate to={"/dashboard"} />
  ) : (
    <Navigate to={"/login"} />
  )

}

const ThemedToaster = () => {
  const { isDarkMode } = useTheme();

  return (
    <Toaster
      toastOptions={{
        className: "",
        style: {
          fontSize: "13px",
          background: isDarkMode ? "#0f172a" : "#ffffff",
          color: isDarkMode ? "#e2e8f0" : "#0f172a",
          border: `1px solid ${isDarkMode ? "#1e293b" : "#e2e8f0"}`,
        },
      }}
    />
  );
};
