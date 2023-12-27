"use client"
import { Navibar } from '@/components/component/navibar';
import React, { useState } from 'react';
import Forum from '@/components/component/forum';
import Booklist from '@/components/component/booklist';
import Mypage from '@/components/component/mypage';
import Inhaforum from '@/components/component/inhaforum';
import Userwritepage from '@/components/component/userwritepage';
import LeeDongjun2 from '@/components/component/leedongjun2';
import LeeDongjun3 from '@/components/component/leedongjun3';
import LeeDongjun from '@/components/component/leedongjun';
import Player from '@/components/component/player';

import './globals.css'
export default function Mainpage({ }) {
  const [SelecteCompoId, setSelecteCompoId] = useState<number | null>(0);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const renderContent = () => {
    switch (SelecteCompoId) {
      case 1:
        return <Booklist setSelecteCompoId={setSelecteCompoId} setSelectedBookId={setSelectedBookId} />;
      case 2:
        return <Forum bookId={selectedBookId} setSelecteCompoId={setSelecteCompoId} />;
      case 3:
        return <Mypage setSelecteCompoId={setSelecteCompoId} />;
      case 4:
        return <Inhaforum />;
      case 5:
        return <Userwritepage bookId={selectedBookId} setSelecteCompoId={setSelecteCompoId} />;
      case 6:
        return <Player />;

      case 10:
        return <LeeDongjun bookId={1} setSelecteCompoId={setSelecteCompoId} />;
      case 11:
        return <LeeDongjun2 bookId={1} setSelecteCompoId={setSelecteCompoId} />;
      case 12:
        return <LeeDongjun3 bookId={1} setSelecteCompoId={setSelecteCompoId} />;
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
