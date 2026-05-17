import { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/Inputs/Input'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import { UserContext } from '../../context/UserContext'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'
import uploadImage from '../../utils/uploadImage'

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const [error, setError] = useState(null)

  const { updateUser } = useContext(UserContext);

  //Handle SignUp Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();


    let profileImageUrl = ""
    if (!fullName) {
      setError("Please enter your name")
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return;
    }
    if (!password) {
      setError("Please enter the password")
      return;
    }
    setError("");

    //SignUp API call
    try {
      // Upload the selected image first so we can store its URL with the user.
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
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
      <div className='mt-8 flex h-auto flex-col justify-center md:mt-0 md:h-full lg:w-full'>
        <h3 className='text-2xl font-semibold text-slate-900 dark:text-slate-100'>Create an account</h3>
        <p className='mb-6 mt-[5px] text-sm text-slate-600 dark:text-slate-400'>
          Join us today by entering your details below
        </p>


        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />




          <div className='grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2'>


            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="john"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />
            <div className='col-span-1 justify-center md:col-span-2'>


              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 charactes"
                type="password"
              />

              <button type='submit' className='btn-primary'>SignUp</button>
            </div>

            {error && <p className='pb-2.5 text-xs text-red-500'>{error}</p>}
            <p className='mt-3 text-[13px] text-slate-700 dark:text-slate-300'>
              Already have an account?{" "}
              <Link className="font-medium text-primary underline" to="/login" >
                Login
              </Link>
            </p>


          </div>
        </form>
      </div>

    </AuthLayout>
  )
}

export default SignUp
