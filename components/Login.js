import React from 'react'
import Image from 'next/image'
import {getProviders,signIn as SignIntoProvider} from 'next-auth/react';
import Button from '@material-tailwind/react/components/Button'
const Login = () => {
    return (
        <div className='flex flex-col items-center justify-center relative '>
            {/* fix the centerin of this image */}
            <Image 
                    className='mr-36'
                    src="https://cdn.icon-icons.com/icons2/2072/PNG/512/arrow_entrance_in_internet_log_login_security_icon_127060.png"
                    height="230"
                    width='450'
                    objectFit='contain'
            />
            <Button 
            className=' w-44 mt-10 text-black text-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2'
            onClick={SignIntoProvider} 
            >
                Login
            </Button>
        </div>
    )
}

export default Login