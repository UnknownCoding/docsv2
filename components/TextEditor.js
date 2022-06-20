import React, { useEffect } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { EditorState } from 'draft-js';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { convertToRaw, convertFromRaw } from 'draft-js';
import { useSession, getSession } from 'next-auth/react'
import { useDocument } from 'react-firebase-hooks/firestore';

const Editor = dynamic(()=> import('react-draft-wysiwyg').then(module => module.Editor),{
    ssr:false,
})
// to overide always use a bang or '!' which means its very umpotyant an hence it overides the information / previous classes 

const TextEditor = () => {
    const {data:session}= useSession();
    const [editorState,setEditorState] = useState(EditorState.createEmpty())
    const router = useRouter()
    const {id} = router?.query

    const [snapshot] = useDocument(doc(db,'userDocs',session?.user?.email,'docs',id))

    useEffect(()=>{
        if(snapshot?.data()?.editorState){
            setEditorState(
                
                EditorState.createWithContent(convertFromRaw(snapshot?.data()?.editorState))
            
            );
        }
    },[snapshot])

    const onEditorStateChange=(editorState)=>{
        setEditorState(editorState)
        const docRef= doc(db,'userDocs',session?.user?.email,'docs',id)
        setDoc(docRef,{
            editorState:convertToRaw(editorState.getCurrentContent()),
            },{merge:true})
    
    }

    
    return (
        <div className='bg-[#F8F9FA] min-h-screen  pb-16'>
            <Editor toolbarClassName='flex sticky top-0 z-50 !justify-center mx-auto'
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    editorClassName='mt-6 bg-white shadow-lg max-w-6xl mx-auto mb-12 pl-3'/>
        </div>
    )
}

export default TextEditor