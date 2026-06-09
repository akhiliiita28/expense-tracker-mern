import { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/Inputs/Input'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'
import { UserContext } from '../../context/UserContext'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const {updateUser}= useContext(UserContext);


  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return;
    }
    if (!password) {
      setError("Please enter the password")
      return;
    }
    setError("");

    //Login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token)
        updateUser(user);
        navigate("/dashboard");
      } 
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again.")
      }

    }


  }
  return (
    <AuthLayout>
      <div className='flex h-full w-full flex-col justify-center py-8 lg:w-[70%]'>
        <h3 className='text-2xl font-semibold text-slate-900 dark:text-slate-100'>Welcome Back</h3>
        <p className='mb-6 mt-[5px] text-sm text-slate-600 dark:text-slate-400'>Please enter your details to log in</p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 charactes"
            type="password"
          />

          {error && <p className='pb-2.5 text-xs text-red-500'>{error}</p>}

          <button type='submit' className='btn-primary'>LOGIN</button>

          <p className='mt-3 text-[13px] text-slate-700 dark:text-slate-300'>
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup" >
              SignUp
            </Link>
          </p>
        </form>

      </div>
    </AuthLayout>
  )
}

export default Login
