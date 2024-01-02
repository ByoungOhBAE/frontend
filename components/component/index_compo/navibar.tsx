
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import Link from "next/link"
import React, { useState } from 'react';

import { NavigationMenuLink, NavigationMenuList, NavigationMenu } from "@/components/ui/navigation-menu"
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
interface User {
  id: number;
  username: string;
  email: string;
}

export function Navibar({ setSelecteCompoId }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);




  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user_id");
    router.push("/");
  };




  return (
    <div className="flex flex-col w-full">
      <header className="flex justify-between items-center bg-white dark:bg-gray-900">
        <Sheet>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-300">
            <SheetTrigger asChild>
              <Button  size="icon" variant="outline">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          </div>

          {/* 이부분은 화면이 작아졌을때 */}
          <SheetContent side="left" className="fixed top-0 left-0 z-50 bg-white shadow-lg">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">

              북키즈
            </h2>
            <div className="grid gap-2 py-6">
              <div className="flex w-full items-center py-2 text-lg font-semibold" onClick={() => setSelecteCompoId(1)}>
                북리스트
              </div>
              <div className="flex w-full items-center py-2 text-lg font-semibold" onClick={() => setSelecteCompoId(3)}>
                마이페이지
              </div>
              <div className="flex w-full items-center py-2 text-lg font-semibold" onClick={() => setSelecteCompoId(12)}>
                게시판 목록
              </div>

              <Button variant="outline" onClick={handleLogout}>로그아웃</Button>
            </div>
          </SheetContent>
        </Sheet>



        {/* 밑부분은 화면이 클때 */}

        
        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          <h2>
            Bookids
          </h2>
        </div>


        <div className="text-red-600 border-red-600 dark:text-red-300 dark:border-red-300">
          <div className="group block rounded-lg p-1 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-100 hover:ring-sky-100" onClick={handleLogout}>
            <button className="ml-2 font-semibold text-lg">로그아웃</button>
          </div>
        </div>



      </header>




    </div>
  );
}


function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
