import React from 'react';
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import Link from "next/link"
import { NavigationMenuLink, NavigationMenuList, NavigationMenu } from "@/components/ui/navigation-menu"

export function Navibar({ setShowBooklist }) {
  return (
    <div className="flex flex-col ">
      <header className="flex items-center h-0 px-0 border-b shrink-0 lg:h-20 lg:px-4 md:px-6">
        <Sheet>
          <div className="fixed top-2 left-2 z-50 lg:hidden">
            <SheetTrigger asChild>
              <Button className="lg:hidden " size="icon" variant="outline">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          </div>

          {/* 이부분은 화면이 작아졌을때 */}
          <SheetContent side="left" className="fixed top-0 left-0 z-50 bg-white shadow-lg">
            <h2>

              북키즈
            </h2>
            <div className="grid gap-2 py-6">
              <div className="flex w-full items-center py-2 text-lg font-semibold" href="#">
                북리스트
              </div>
              <div className="flex w-full items-center py-2 text-lg font-semibold" href="#">
                게시판
              </div>
              <div className="flex w-full items-center py-2 text-lg font-semibold" href="#">
                마이페이지
              </div>
              <div className="flex w-full items-center py-2 text-lg font-semibold" href="#">
                북리스트
              </div>
              <Button variant="outline" onClick={() => setShowBooklist(false)}>로그아웃</Button>
            </div>
          </SheetContent>
        </Sheet>



        {/* 밑부분은 화면이 클때 */}

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <div className="flex space-x-4">
                <div className="group block rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-100 hover:ring-sky-100">
                  <span className="ml-2 font-semibold text-lg">북리스트</span>
                </div>
              </div>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <div className="flex space-x-4">
                <div className="group block rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-100 hover:ring-sky-100">
                  <span className="ml-2 font-semibold text-lg">게시판</span>
                </div>
              </div>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <div className="flex space-x-4">
                <div className="group block rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-100 hover:ring-sky-100">
                  <span className="ml-2 font-semibold text-lg">마이페이지</span>
                </div>
              </div>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <div className="flex space-x-4">
                <div className="group block rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-100 hover:ring-sky-100">
                  <span className="ml-2 font-semibold text-lg">북리스트</span>
                </div>
              </div>
            </NavigationMenuLink>
            <Button variant="outline" onClick={() => setShowBooklist(false)}>로그아웃</Button>
          </NavigationMenuList>
        </NavigationMenu>
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
