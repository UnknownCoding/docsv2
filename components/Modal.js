import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtoms'
import { useSession } from 'next-auth/react'
import { db } from '../firebase'
import { addDoc, collection,  serverTimestamp, updateDoc ,  } from 'firebase/firestore'



const Modal = () => {
    const[open,setOpen]=useRecoilState(modalState)
    const cancelButtonRef = useRef(null)
    const [input,setInput] = useState("")
    const {data:session}= useSession();

    const createDocument = (e)=>{
        e.preventDefault()
        if(!input) return;
        const ref=collection(db,'userDocs',session?.user?.email,'docs')
        addDoc(ref,{
            filename:input,
            timestamp: serverTimestamp()
        })
        setInput("")
        setOpen(false)

    }

    return (
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start mx-auto ">
                        <div className=" mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            Enter Your File Name
                        </Dialog.Title>
                        </div>
                    </div>
                    </div>

                    <form>
                        <input  className="flex flex-1 pl-4 ml-10 outline-none " onChange={(e)=>setInput(e.target.value)} placeholder='yes lad!'/>
                        
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="mt-3 h-9 outline-none w-full inline-flex justify-center rounded-md  shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                        >
                        Cancel
                        </button>
                        <button type='submit' onClick={createDocument} class="relative inline-flex items-center justify-center p-0.5  mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Create Document
                        </span>
                        </button>

                        </div>
                    
                    </form>
                </Dialog.Panel>
                </Transition.Child>
            </div>
            </div>
            </Dialog>
        </Transition.Root>
    )

}

export default Modal