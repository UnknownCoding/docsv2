import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'
import { Avatar, Button, IconButton } from '@mui/material';
import { DotsVerticalIcon } from '@heroicons/react/solid'
import { FolderIcon } from '@heroicons/react/solid'
import { useSession, getSession } from 'next-auth/react'
import Login from '../components/Login';
import {setDoc,doc, collection,serverTimestamp ,query,orderBy} from 'firebase/firestore'
import { db } from '../firebase'
import { useState } from 'react';
import Modal from '../components/Modal';
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtoms'
import { useCollection, useCollectionOnce } from 'react-firebase-hooks/firestore';
import DocumentRow from '../components/DocumentRow';
import { onSnapshot,getFirestore  } from 'firebase/firestore';


export default function Home() {
  const {data:session}= useSession();
  if(!session){
    return <Login/>
  }
  const[open,setOpen]=useRecoilState(modalState)
  const [snapshot] = useCollectionOnce(query(collection(db,'userDocs',session?.user?.email,'docs'),orderBy("timestamp","desc")));
  

  if (session) {
    const usersRef=doc(db,'docusers',session?.user?.uid)
    setDoc(usersRef,{
      id:session?.user?.uid,
      email:session?.user?.email,
      profileImg:session?.user?.image,
      lastseen: serverTimestamp()
      },{merge:true})
  };
  
  if(!session) return <Login/>
  

  return (
    <div >
      <Head>
        <title>Documents</title>
      </Head>
      <Header/>
      {open && ( <Modal/>)}
      <section className='bg-[#F8F9FA] pb-10 px-10'>
        {/* mx auto to center in right and left sections  */}
        <div className='max-w-3xl mx-auto'>
          <div className='flex items-center justify-between py-6'>
            <h2 className='text-gray-700 text-lg'>Start a new document</h2>
            <IconButton >
              <DotsVerticalIcon className='w-6 h-6'/>
            </IconButton>
          </div>
          <div>

            <div onClick={()=> setOpen(true)} className='relative h-56 w-56  cursor-pointer hover:border-2 hover:rounded-md hover:border-blue-400'>
              <Image src="https://cdn.icon-icons.com/icons2/272/PNG/512/Docs_29999.png" layout='fill' />
            </div>

            <p className='pt-4 font-semibold text-sm'>BLANK</p>

          </div>
        </div>
      </section>
      <section className='bg-white px-10 md:px-0'>
        <div className='max-w-3xl mx-auto py-8 text-sm'>
          <div className='flex items-center justify-between pb-5'>
            <h2 className='font-medium flex-grow'>My Documents</h2>
            <p className='mr-12'>Date Created</p>
            <FolderIcon className='w-6 h-6'/>
          </div>
          {snapshot?.docs?.map((doc)=>(
            <DocumentRow key={doc?.id} id={doc?.id} filename={doc?.data()?.filename} date={doc?.data()?.timestamp}/>
          ))}
        </div>
      </section>
  
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return{
    props:{
      session
    }
  }
}
