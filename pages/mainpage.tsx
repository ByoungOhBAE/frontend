"use client"
import { Navibar } from '@/components/component/navibar';
import React, { useState } from 'react';
import Board_write from '@/components/component/board_detail';
import Book_list from '@/components/component/book_list';
import Mypage from '@/components/component/mypage';
import Board_update from '@/components/component/board_update';
import Userwritepage from '@/components/component/userwritepage';
import Quiz_image from '@/components/component/quiz_image';
import Board_list from '@/components/component/board_list';
import Quiz from '@/components/component/quiz';
import Player from '@/components/component/player';

import './globals.css'
export default function Mainpage({ }) {
  const [SelecteCompoId, setSelecteCompoId] = useState<number | null>(0);
  const [selectedBookId, setSelectedBookId] = useState(null);

 


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
        return <Player />;

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

    <div className="min-h-screen p-6 lg:p-10 bg-cover bg-center" style={backgroundStyle}>
      {/* 프로젝트 제목 */}


      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold text-gray-800">
          BooKids
        </h2>
      </div>


      <div className="min-h-screen min-w-full bg-[#FF4F6]">
        <Navibar setSelecteCompoId={setSelecteCompoId} />
        <main className="p-4">
          <div>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
