import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from "../../Utils/axios"
import {login} from "../../Utils/constants"
import jwtDecode from 'jwt-decode';
import {loginAdmin} from '../../Features/Admin/AdminAuthSlice'

const AdminLogin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

   const  handleAdminLogin = (e)=>{
            e.preventDefault()
            const body = JSON.stringify({
                'email': e.target.adminemail.value,
                'password': e.target.password.value,
            })

            axios.post(login, body, {
                headers: { "Content-Type": "application/json" },
            })
            .then ((response)=> {
                console.log(response)
                if (response.status === 200) {
                    const decodedToken = jwtDecode(response.data.access)
                    if (decodedToken.is_superuser){

                        localStorage.setItem('authTokensAdmin', JSON.stringify(response.data))
                    
                        dispatch(loginAdmin({authTokensAdmin: JSON.stringify(response.data), admin:  jwtDecode(response.data.access) }))
                        
                        navigate("/admin/dashboard");
                        
                    }else{
                       console.log("User is not super")
                    }
 
                }else{
                   console.log("Invalid credintials")
                }
            }).catch((err)=>{
                console.log(err)
               
            })
   }



  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-28 lg:px-8 ">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-5 text-center text-2xl font-bold leading-9 text-[#4b7b3f] hover:text-[#325343]">
        Admin Panel
      </h2>
   
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleAdminLogin}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="adminemail"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#9bd58b] sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#9bd58b] sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-[#9bd58b] px-3 py-1.5 text-sm font-semibold leading-6 text-[#325343] shadow-sm hover:bg-[#4b7b3f] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </button>
        </div>
      </form>

    </div>










  </div>
  )
}

export default AdminLogin