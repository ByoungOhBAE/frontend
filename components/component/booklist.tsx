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

  // import React from 'react';
  // import ComponentOne from './ComponentOne';
  // import ComponentTwo from './ComponentTwo';
  // import ComponentThree from './ComponentThree';
  
  // export default function MyComponent({ selectedBookId }) {
  //   let content;
  
  //   switch(selectedBookId) {
  //     case 1:
  //       content = <ComponentOne />;
  //       break;
  //     case 2:
  //       content = <ComponentTwo />;
  //       break;
  //     case 3:
  //       content = <ComponentThree />;
  //       break;
  //     default:
  //       content = <div>Default content or another component</div>;
  //   }
  
  //   return (
  //     <div>
  //       {content}
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen min-w-full bg-[#F3F4F6]">
      
      <main className="p-4">
        {selectedBookId ? (
          <BookDetailComponent bookId={selectedBookId} setSelectedBookId={setSelectedBookId} />
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
                    {book.book_name}
                  </h2>
                  <p className="text-white text-lg">바로가기</p>
                </div>
              </div>
            ))}
          </div>
        )
        }

        <div className="flex items-center justify-center">
          <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>이전 페이지</Button>
          <span> {currentPage} / {totalPages}</span>
          <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>다음 페이지</Button>
        </div>

      </main >
    </div >
  );
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