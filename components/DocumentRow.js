import React from 'react'
import { AnnotationIcon } from '@heroicons/react/solid'
import { DotsVerticalIcon } from '@heroicons/react/solid'
import {  IconButton } from '@mui/material';
import { useRouter } from 'next/router';

const DocumentRow = ({id,filename, date}) => {
    const router = useRouter()
    return (
        <div className='flex items-center p-4 rounded-lg hover:bg-blue-100 text-sm cursor-pointer ' onClick={()=>{router.push(`/doc/${id}`)}}>
            <AnnotationIcon className='w-7 h-7 text-blue-600'/>
            <p className='flex flex-grow pl-5 w-10 truncate'>{filename}</p>
            <p className='pr-5 text-sm'>{date?.toDate().toLocaleDateString()}</p>
            <IconButton >
                <DotsVerticalIcon className='w-7 h-7'/>
            </IconButton>
        </div>
    )
}

export default DocumentRow