import React from 'react'
import { MenuIcon } from '@heroicons/react/outline'
import { DocumentTextIcon } from '@heroicons/react/outline'
import { Avatar, Button, IconButton } from '@mui/material';
import { SearchIcon } from '@heroicons/react/solid'
import { FolderOpenIcon } from '@heroicons/react/outline'
import { signOut, useSession, getSession } from 'next-auth/react'


const Header = () => {
    const {data:session}= useSession();

return (
    <header className='flex items-center px-4 py-2 bg-white shadow-md sticky top-0 z-50 overflow-hidden'>
        <IconButton className='mt-2.5 '>
            <MenuIcon className='w-10 h-10 text-blue-400 '/>

        </IconButton>
        {/* debug icon always expanding */}
        <DocumentTextIcon className='w-16 h-16 text-blue-400 ml-6 ' />
        <h1 className='font-bold font-sans text-3xl	pt-3 ' >Docs</h1>
        <div className='flex flex-grow items-center px-5 py-2 bg-blue-200 rounded-lg mx-5 mt-2 md:mx-20 focus-within:shadow-md'>
            <SearchIcon className=' w-6 h-6 text-blue-700'/>
            <input className='outline-none flex-grow px-5 text-base bg-transparent text-black placeholder-black' placeholder='Search' type="text"/>
        </div>
        <IconButton className='ml-5 md:ml-20 h-20 w-20 border-0 cursor-pointer'>
            <FolderOpenIcon className='w-12 h-12 text-black pt-1'/>
        </IconButton>
        <img className='cursor-pointer h-12 w-12 rounded-full ml-9 mr-4' src={session?.user?.image} alt='Fix Browser A$AP' onClick={signOut}/>
    </header>
    )
}

export default Header