import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { useBookHistory } from '@/components/component/mypage_compo/usebookhistory';
import { useBookList } from '@/components/component/book_compo/usebooklist';
import { useRouter } from 'next/navigation';

const PER_PAGE = 8;

export default function Book_history({ setSelecteCompoId, setSelectedBookId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { bookList: userBookList } = useBookList();
  const { bookList: bookHistory } = useBookHistory();

  const router = useRouter();

  useEffect(() => {
    // userBookList와 bookHistory가 모두 로드된 후에 작업 수행
    if (userBookList && bookHistory) {
      // bookHistory에 있는 각 bookId에 대한 정보를 가져오기
      const currentBooks = bookHistory.map(bookId => {
        const matchingBook = userBookList.find(book => book.id === bookId);
        return matchingBook || null;
      });

      console.log('User Book History:', currentBooks);
    }
  }, [userBookList, bookHistory]);

  const showBookDetails = (bookId) => {
    const bookDetails = userBookList.find(book => book.id === bookId);
    if (bookDetails) {
      console.log('Selected Book Details:', bookDetails);
      setSelectedBookId(bookDetails.id);
      setSelecteCompoId('bookDetails');
      router.push(`/player/${bookId}`);
    } else {
      console.error(`Book with id ${bookId} not found in userBookList`);
    }
  };

  const totalPages = Math.ceil(bookHistory?.length / PER_PAGE) || 0;

  return (
    <div className="mx-3 my-3 p-3 bg-slate-200/90 rounded-lg">
      <div className="mx-3 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {userBookList &&
          bookHistory.map((book) => (
            <button key={book.id}>
              <div
                className="relative group overflow-hidden rounded-lg"
                onClick={() => showBookDetails(book.id)}>
                <Card
                  style={{
                    backgroundImage: `url(${book.img_path})`,
                    backgroundOrigin: 'padding-box',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '220px',
                  }}>
                  <CardHeader>
                    <Avatar className="w-screen h-12" src="/placeholder.svg?height=100&width=100" />
                  </CardHeader>
                  <CardContent>{/* 여기에 추가 정보 표시 */}</CardContent>
                </Card>
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <h2 className="text-white ml-4 text-lg font-semibold">{book.book_name}</h2>
                  <h1 className="text-white text-lg">{book.author}</h1>
                </div>
              </div>
            </button>
          ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '30px' }}>
        <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          이전 페이지
        </Button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          다음 페이지
        </Button>
      </div>
    </div>
  );
}
