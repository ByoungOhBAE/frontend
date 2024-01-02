import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { useBookHistory } from '@/components/component/mypage_compo/usebookhistory';
import { useBookList } from '@/components/component/book_compo/usebooklist';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'
import { useSearchParams } from 'next/navigation';
const PER_PAGE = 8;

export default function Book_history({ setSelecteCompoId, setSelectedBookId }) {


  const PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const { bookList } = useBookList();
  const { bookHistory } = useBookHistory();

  const router = useRouter();
  const showBookDetails = (BookId) => {
    const bookDetails = bookList.find(book => book.id === BookId);
    setSelectedBookId(bookDetails.id);
    setSelecteCompoId('bookDetails');
    router.push(`/player/${BookId}`);
  };
  // const currentBooks = bookHistory ? bookHistory.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE) : [];
  const currentBooks = bookHistory 
    ? bookHistory.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE).map(bookId => {
      // bookId를 사용하여 bookList에서 해당 책의 정보를 가져오기
      return bookList.find(book => book.id === bookId);
    })
  : [];
  const totalPages = bookHistory ? Math.ceil(bookHistory.length / PER_PAGE) : 0;
  return (
    <div className="mx-3 my-3 p-3 bg-slate-200/90 rounded-lg">
      <div className=" mx-3 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* 책 목록 렌더링 */}
        {currentBooks.map(book => (
          <button>
          <div key={book.id}

            className="relative group overflow-hidden rounded-lg"
            onClick={() => showBookDetails(book.id)}>
            
            {/* 책 정보 렌더링 */}
            <Card style={{
                backgroundImage: `url(${book.img_path})`,
                backgroundOrigin: 'padding-box',
                backgroundSize: 'cover',
                backgroundPosition: 'center', // 이미지 중앙 정렬
                backgroundRepeat: 'no-repeat',
                minHeight: '220px',
                
              }}>
              <CardHeader>
                <Avatar className="w-screen h-12" src="/placeholder.svg?height=100&width=100" />                
              </CardHeader>
              <CardContent>
                {/* 여기에 추가 정보 표시 */}
              </CardContent>
            </Card>
            
            {/* 밑은 호버 띄우기 */}
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() =>
                showBookDetails(book.id)
              }>
              <h2 className="text-white ml-4 text-lg font-semibold">
                {book.book_name}
              </h2>
              <h1 className="text-white text-lg">
                {book.author}
              </h1>
            </div>
          </div>
          </button>
        ))}
      </div >
      {/* 페이지네이션 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '30px' }}>
        <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>이전 페이지</Button>
        <span> {currentPage} / {totalPages}</span>
        <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>다음 페이지</Button>
      </div>
    </div>
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