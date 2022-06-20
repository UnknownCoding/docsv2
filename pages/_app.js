import '../styles/globals.css'
import { ThemeProvider } from "@material-tailwind/react";
import Head from 'next/head';
import {SessionProvider} from 'next-auth/react'
import { useEffect } from 'react';
import {setDoc,doc, collection,serverTimestamp} from 'firebase/firestore'
import { RecoilRoot } from 'recoil'


function MyApp({ Component, pageProps:{session,...pageProps} }) {
  
  // if (session) {
  //   const usersRef=doc(db,'docusers',session?.user?.uid)
  //   setDoc(usersRef,{
  //     id:user.uid,
  //     email:user.email,
  //     profileImg:user.photoURL,
  //     lastseen: serverTimestamp()
  //     },{merge:true})
  // };


  return(
    <SessionProvider session={session}>
      <ThemeProvider>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
