"use client";
import Link from "next/link";
import { LuLogOut } from "react-icons/lu";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FiUserCheck } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { BsCart3 } from 'react-icons/bs';

export default function Header() {

  const { data: session, status } = useSession();
  const [login, setLogin] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {

    // Router.events.on('routeChangeStart', () => setProgress(50));
    // console.log("hello: ", events);

    if (status === "authenticated") {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [status]);

  return (<>
    <header className="text-gray-600 body-font fixed top-0 z-50 w-full bg-white drop-shadow-sm">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <Link href={"/"} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <BsCart3 size={25} className="text-orange-500" />
          <span className="ml-3 text-xl">Z Cart</span>
        </Link>
        <nav className="flex flex-wrap items-center text-base justify-center">
          <Link href={"/about"} className="mr-5 hover:text-gray-900">About</Link>
          <Link href={"/product"} className="mr-5 hover:text-gray-900">Products</Link>
        </nav>
        <div className="flex items-center">
          <Link href={"/user/cart"} className="mr-5 hover:text-gray-900"><BsCart3 size={25} /></Link>
          {login ? (
            <div className="relative" onMouseEnter={() => setDropdown(true)} >
              <FiUserCheck size={25} className="text-orange-500 cursor-pointer" />
              {
                dropdown && <ul onMouseLeave={() => setDropdown(false)} className="absolute right-0 bg-white top-[47px] drop-shadow-md flex flex-col items-start gap-2 rounded-md">
                  <li className="py-2 px-8 font-medium">{session?.user?.name.split(" ")[0]}</li>
                  <li onClick={() => signOut()} className="flex items-center gap-3 hover:bg-orange-300 hover:text-white rounded-md py-2 px-8 cursor-pointer">Logout <LuLogOut /></li>
                </ul>
              }

            </div>
          ) : (
            <Link href={"/auth/signup"}>
              <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Login
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </Link>
          )}
        </div>
        {/* {login ? (
          <button onClick={() => signOut()}>
            <div>
              <BiUserCircle /> {session?.user?.name.split(" ")[0]}
            </div>
          </button>) : (
          <Link href={"/auth/signup"}>
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Login
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </Link>
        )} */}

      </div>
    </header>
  </>)
}
