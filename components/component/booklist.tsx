'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { useBookList } from '@/components/component/usebooklist';

const PER_PAGE = 8;

export default function Booklist({ setShowBooklist }) {
  const { bookList, isLoading, isError } = useBookList();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (selectedBookId !== null) {
      router.push(`/book/${selectedBookId}`);
    }
  }, [selectedBookId, router]);

  const showBookDetails = (bookId) => {
    setSelectedBookId(bookId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const currentBooks = bookList.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const totalPages = Math.ceil(bookList.length / PER_PAGE);

  return (
    <div className="min-h-screen min-w-full bg-[#F3F4F6]">
      <header className="flex justify-between items-center bg-white p-4 shadow-md">
        <Link href="#" className="group block rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-100 hover:ring-sky-100">
          <span className="ml-2 font-semibold text-lg">북리스트</span>
        </Link>
        <Link href="#" className="group block rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-green-100 hover:ring-green-100">
          <span className="ml-2 font-semibold text-lg">5세 추천</span>
        </Link>
        <Link href="#" className="group block rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-yellow-100 hover:ring-yellow-100">
          <span className="ml-2 font-semibold text-lg">6세 추천</span>
        </Link>
        <Link href="#" className="group block rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-pink-100 hover:ring-pink-100">
          <span className="ml-2 font-semibold text-lg">7세 추천</span>
        </Link>
        <Link href="#" className="group block rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-purple-100 hover:ring-purple-100">
          <span className="ml-2 font-semibold text-lg">게시판</span>
        </Link>
        <Link href="#" className="group block rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-gray-100 hover:ring-gray-100">
          <span className="ml-2 font-semibold text-lg">마이페이지</span>
        </Link>

        <Button variant="outline" onClick={() => setShowBooklist(false)}>로그아웃</Button>
      </header>
      <main className="p-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {currentBooks.map(book => (
            <div key={book.id} className="relative group overflow-hidden rounded-lg">
              <Card>
                <CardHeader>
                  <Avatar className="w-12 h-12" src="/placeholder.svg?height=100&width=100" />
                </CardHeader>
                <CardContent>
                  {/* 여기에 추가 정보 표시 */}
                </CardContent>
              </Card>
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => showBookDetails(book.id)}>
                <h2 className="text-white ml-4 text-lg font-semibold">
                  {/* BookListComponent */}
                </h2>
                <p className="text-white text-lg">바로가기</p>
              </div>
            </div>
          ))}
          <div>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>이전</button>
            <span>페이지 {currentPage} / {totalPages}</span>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>다음</button>
          </div>
        </div>
      </main>
    </div>
  );
}

function PlaneIcon(props) {
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
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  )
}



// 북리스트 가져오기 위한 인터페이스

interface BookListComponentProps {
  bookId: number;
  infoType: 'book_name' | 'author'; // 여기에 필요한 다른 정보 타입을 추가할 수 있습니다.
}

function BookListComponent({ bookId, infoType }: BookListComponentProps) {
  const { bookList, isLoading, isError } = useBookList();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  // 특정 ID의 책 찾기
  const book = bookList.find(book => book.id === bookId);

  // 원하는 정보 반환
  return (
    <div>
      {book ? (
        <p>{book[infoType]}</p> // infoType에 따라 다른 정보 표시
      ) : (
        <p>책을 찾을 수 없습니다.</p>
      )}
    </div>
  );
}




