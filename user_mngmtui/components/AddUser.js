import React, { Fragment, useState } from 'react'
import { Dialog, Transition} from "@headlessui/react";
import UserList from './UserList';
const AddUser = () => {

    const [isOpen,setIsOpen]=useState(false);
    const USER_API_BASE_URL=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`;
    const [user, setUser]=useState({
        id:"",
        firstName:"",
        lastName:"",
        emailId:"",
    });

    const [responseUser, setResponseUser] = useState({
        id:"",
        firstName:"",
        lastName:"",
        emailId:"",
    });

    function closeModel(){
        setIsOpen(false);
    }
    function openModel(){
        setIsOpen(true); 
    }
    const handleChange=(e)=>{
        const value=e.target.value;
        setUser({...user, [e.target.name]: value })
    };

    const saveUser=async (e)=>{
        e.preventDefault();
        const response=await fetch(USER_API_BASE_URL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(user),
        });
        if(!response.ok){
            throw new Error("Went wrong");
        }
        const _user= await response.json();
        setResponseUser(_user);
        reset(e);
    };

    const reset=(e)=>{
        e.preventDefault();
        setUser({
            id:"",
            firstName:"",
            lastName:"",
            emailId:"",
        });
        setIsOpen(false);
    }

  return (
    <>
        <div className="container mx-auto my-8">
            <div className="h-12">
                <button onClick={openModel} className="rounded bg-black text-gray-100 px-6 py-2 font-semibold">
                    Add User
                </button>
            </div>
        </div>
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModel}>
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">
                                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded">
                                    <Dialog.Title as="h3" className="text-lg font-medium text-gray-900 leading-6">
                                        Add New User
                                    </Dialog.Title>
                                    <div className="flex max-w-md max-auto">
                                        <div className="py-2">
                                            <div className="h-14 my-4">
                                                <label className="block to-gray-600 text-sm font-normal">
                                                    First Name</label>
                                                <input
                                                    type="text" 
                                                    name="firstName"
                                                    value={user.firstName}
                                                    onChange={(e) => handleChange(e)}
                                                    className="h-10 w-96 border mt-2 px-2 py-2">
                                                </input>
                                            </div>
                                            <div className="h-14 my-4">
                                                <label className="block to-gray-600 text-sm font-normal">
                                                    Last Name</label>
                                                <input 
                                                    type="text" 
                                                    name="lastName" 
                                                    value={user.lastName} 
                                                    onChange={(e) => handleChange(e)} 
                                                    className="h-10 w-96 border mt-2 px-2 py-2">
                                                </input>
                                            </div>
                                            <div className="h-14 my-4">
                                                <label className="block to-gray-600 text-sm font-normal">
                                                    Email ID</label>
                                                <input 
                                                    type="email" 
                                                    name="emailId" 
                                                    value={user.emailId} 
                                                    onChange={(e) => handleChange(e)} 
                                                    className="h-10 w-96 border mt-2 px-2 py-2">
                                                </input>
                                            </div>
                                            <div className="h-14 my-4 space-x-4 pt-4">
                                                <button 
                                                    onClick={saveUser}
                                                    className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6">
                                                    Save
                                                </button>
                                                <button 
                                                    onClick={reset}
                                                    className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6">
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                        </Transition.Child>
                    </div>
            </Dialog>
        </Transition>
        
        <UserList user={responseUser}/>
    </>
  );
}

export default AddUser