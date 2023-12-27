"use client"
import { Navibar } from '../components/component/navibar';
import React, { useState } from 'react';
import BookDetailComponent from '../components/component/bookdetailcomponent'; // 상세 정보 컴포넌트 임포트
import Forum from '../components/component/forum';
import Booklist from '../components/component/booklist';
import Mypage from '../components/component/mypage';




import './globals.css'
export default function Mainpage({ }) {
  const [SelecteCompoId, setSelecteCompoId] = useState<number | null>(0);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const renderContent = () => {
    switch (SelecteCompoId) {
      case 1:
        return <Booklist setSelecteCompoId={setSelecteCompoId} setSelectedBookId={setSelectedBookId} />;
      case 2:
        return <BookDetailComponent bookId={selectedBookId} setSelecteCompoId={setSelecteCompoId} />;
      case 3:
        return <Mypage setSelecteCompoId={setSelecteCompoId} />;
      case 4:
        return <Booklist setSelecteCompoId={setSelecteCompoId} setSelectedBookId={setSelectedBookId} />;
      default:
        return <Booklist setSelecteCompoId={setSelecteCompoId} setSelectedBookId={setSelectedBookId} />;
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
