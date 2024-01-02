"use client"
import { Navibar } from '@/components/component/index_compo/navibar';
import React, { useState } from 'react';
import Board_write from '@/components/component/board/board_detail';
import Book_list from '@/components/component/book_compo/book_list';
import Mypage from '@/components/component/mypage_compo/mypage';
import Board_update from '@/components/component/board/board_update';
import Userwritepage from '@/components/component/board/userwritepage';
import Quiz_image from '@/components/component/book_compo/quiz_image';
import Board_list from '@/components/component/board/board_list';
import Quiz from '@/components/component/book_compo/quiz';
import Player from '@/pages/player/[bookid]';
import { useRouter } from 'next/navigation';
import './globals.css'
export default function Mainpage({ }) {
  const [SelecteCompoId, setSelecteCompoId] = useState<number | null>(0);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const router = useRouter();






  const renderContent = () => {
    switch (SelecteCompoId) {
      case 1:
        return <Book_list setSelecteCompoId={setSelecteCompoId} setSelectedBookId={setSelectedBookId} />;
      case 2:
        return <Board_detail bookId={selectedBookId} setSelecteCompoId={setSelecteCompoId} />;
      case 3:
        return <Mypage setSelecteCompoId={setSelecteCompoId} />;
      case 4:
        return <Board_write />;
      case 5:
        return <Userwritepage bookId={selectedBookId} setSelecteCompoId={setSelecteCompoId} />;
      case 6:
        return router.push('/player/?history=${selectedBookId}');

      case 10:
        return <Quiz bookId={1} setSelecteCompoId={setSelecteCompoId} />;
      case 11:
        return <Quiz_image bookId={1} setSelecteCompoId={setSelecteCompoId} />;
      case 12:
        return <Board_list bookId={1} setSelecteCompoId={setSelecteCompoId} />;
      default:
        return <Book_list setSelecteCompoId={setSelecteCompoId} setSelectedBookId={setSelectedBookId} />;
    }
  };
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: 'url("/field.jpg")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    backgroundAttachment: 'scroll',
  };

  return (

    <div className="min-h-svh  bg-cover bg-center" style={backgroundStyle}>
      {/* 프로젝트 제목 */}
      <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-900">
        <Navibar setSelecteCompoId={setSelecteCompoId} />
      </div>

      <div className="px-12 py-8 min-w-full bg-[#FF4F6]">

        <main className="">
          <div>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token; // 토큰을 쿠키에서 추출

  // 토큰이 없는 경우 메인 페이지로 리디렉션
  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // 로그인이 되어 있으면 페이지 데이터 반환
  return {
    props: {}, // 필요한 props
  };
}
