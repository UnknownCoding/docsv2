import React from 'react'
import { DocumentTextIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc} from 'firebase/firestore'
import { db } from '../../firebase';
import { Button } from '@material-tailwind/react';
import { ShareIcon } from '@heroicons/react/solid'
import TextEditor from '../../components/TextEditor';
import { useSession, getSession } from 'next-auth/react'
import Login from '../../components/Login';

const Doc = () => {
    const {data:session}= useSession();
    const router = useRouter()
    const {id} = router?.query
    const [snapshot,loading] = useDocument(doc(db,'userDocs',session?.user?.email,'docs',id))
    if(!session)return <Login/>
    if(!loading && !snapshot?.data()?.filename){
        router.replace('/')
    }
    return (
        <div>
            <header className='flex justify-between items-center p-3 pb-1'>
                <span onClick={()=> router.push("/")} className="cursor-pointer">
                    <DocumentTextIcon className='w-12 h-12 text-blue-400'/>
                </span>
                <div className='flex-grow px-2'>
                    <h2>{snapshot?.data()?.filename}</h2>
                    <div className='flex items-center text-sm space-x-1 -ml-1 h-8 '>
                        <p className='options'>File</p>
                        <p className='options'>Edit</p>
                        <p className='options'>View</p>
                        <p className='options'>Insert</p>
                        <p className='options'>Format</p>
                        <p className='options'>Tools</p>
                    </div>
                </div>
                <Button className='flex hidden md:inline-flex'>
                    <ShareIcon className='w-7 h-7 text-white'/> 
                    <h1 className='text-sm text-white pl-2 pt-1'>Share</h1>
                </Button>
                <img src={session?.user?.image} className="rounded-full cursor-pointer h-10 w-10 ml-2"/>
            </header>
            <TextEditor/>
        </div>
    )
}

export default Doc

// if on refresh an index of error occurs try server side rendering and if window object is not accessible then always
// dynamic import as node is used in next js server and page is created twice once in the surver and once in the client side
// SEARCH UP ON INDEX OF ERROR 

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return{
        props:{
        session
        }
    }
    }