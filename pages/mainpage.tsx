
import { Navibar } from '../components/component/navibar';
import React, { useState } from 'react';
import BookDetailComponent from '../components/component/bookdetailcomponent'; // 상세 정보 컴포넌트 임포트
import Forum from '../components/component/forum';
import Booklist from '../components/component/booklist';
import './globals.css'
export default function Mainpage({ }) {
  const [selectedBookId, setSelectedBookId] = useState<number | null>(0);
  const [SelecteCompoId, setSelecteCompoId] = useState<number | null>(0);
  

  const renderContent = () => {
    switch (SelecteCompoId) {
      case 1:
        return <Booklist setSelecteCompoId={setSelecteCompoId} setSelectedBookId={setSelectedBookId}/>;
      case 2:
        return <BookDetailComponent bookId={selectedBookId} setSelecteCompoId={setSelecteCompoId} />;
      case 3:
        return <Forum setSelecteCompoId={setSelecteCompoId} />;
      case 4:
        return <Booklist setSelecteCompoId={setSelecteCompoId} />;
      default:
        return <Booklist setSelecteCompoId={setSelecteCompoId} />;
    }
  };

  return (
   
 
    <div className="min-h-screen min-w-full bg-[#FF4F6]">
      <Navibar setSelecteCompoId={setSelecteCompoId} />
      <main className="p-4">
        <div>
          {renderContent()}
        </div>
      </main>
    </div>
    
  );
}
