
// const Navbar = () => {
//   return (
//     <div className="bg-gray-800">
//         <div className="h-16 px-8 flex items-center">
//             <p className="text-white font-bold flex-auto">User Management Board</p>
            
//         </div>
//     </div>
//   )
// }

import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';


const Navbar = () => {

  const {data: session, status}= useSession();

  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-4xl font-bold">
              <span className="inline-block animate-color-transition bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_auto] bg-clip-text text-transparent">
                UMB
              </span>
            </span>
          </div>
          <div className="text-lg text-violet-200">
            User Management Board
          </div>
          {session && (
            <div className="flex items-center sm:space-x-2 justify-end">
              <Image
              onClick={signOut}
              className="rounded-full cursor-pointer"
              src={session.user.image}
              height="30"
              width="30"
              layout="fixed"
              title="Click to Logout"
              ></Image>
              <p className="text-white font-bold">{session?.user.name}</p>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
};


export default Navbar