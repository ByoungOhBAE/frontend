'use client';
import { Navibar } from '@/components/component/navibar';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { useBookList } from '@/components/component/usebooklist';
import BookDetailComponent from '@/components/component/bookdetailcomponent'; // 상세 정보 컴포넌트 임포트

const PER_PAGE = 8;

export default function Booklist({ setShowBooklist }) {
  const { bookList, isLoading, isError } = useBookList();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const showBookDetails = (bookId) => {
    setSelectedBookId(bookId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const currentBooks = bookList.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const totalPages = Math.ceil(bookList.length / PER_PAGE);

  return (
    <div className="min-h-screen min-w-full bg-[#F3F4F6]">
      <Navibar setShowBooklist={setShowBooklist} />
      <main className="p-4">
        {selectedBookId ? (
          <BookDetailComponent bookId={selectedBookId} />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* 책 목록 렌더링 */}
            {currentBooks.map(book => (

              <div key={book.id}

                className="relative group overflow-hidden rounded-lg"
                onClick={() => showBookDetails(book.id)}>

                {/* 책 정보 렌더링 */}
                <Card style={{
                  backgroundImage: 'url(https://edu.chosun.com/site/data/img_dir/2011/01/24/2011012401165_0.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  minHeight: '250px'
                }}>
                  <CardHeader>
                    <Avatar className="w-12 h-12" src="/placeholder.svg?height=100&width=100" />
                  </CardHeader>
                  <CardContent>
                    {/* 여기에 추가 정보 표시 */}
                  </CardContent>
                </Card>

                {/* 밑은 호버 띄우기 */}
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => showBookDetails(book.id)}>
                  <h2 className="text-white ml-4 text-lg font-semibold">
                    {/* BookListComponent */}
                  </h2>
                  <p className="text-white text-lg">바로가기</p>
                </div>
              </div>
            ))}
          </div>
        )
        }

        <div>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>이전</button>
          <span>페이지 {currentPage} / {totalPages}</span>
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>다음</button>
        </div>

      </main >
    </div >
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




