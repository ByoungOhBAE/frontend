// components/BookDetailComponent.js 또는 .tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Mypage = ({ setSelecteCompoId }) => {
    const [selectedMenu, setSelectedMenu] = useState(''); /*클릭하면 나오도록*/

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    return ( //보여주는 부분 return 안에있는거만 마이페이지처럼 꾸며라.
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* 프로필 & 메뉴 섹션 */}
            <div className="bg-white p-10 flex flex-col w-1/3">
                {/* 프로필 영역 */}
                <div className="text-center mb-10">
                    <div className="w-80 h-80 rounded-full overflow-hidden mx-auto mb-20">
                        <img src="/images/kid.png" alt="Profile" className="object-cover w-full h-full rounded-full" />
                    </div>
                    <h2 className="text-xl font-semibold">사용자</h2>
                    <p className="text-gray-500 mb-3">user@example.com</p>
                </div>
                {/* 메뉴 영역 - 책갈피 스타일 */}
                <ul className="space-y-2">
                    {['bookList', 'menu1', 'menu2', 'menu3'].map((menu) => (
                        <li
                            key={menu}
                            onClick={() => handleMenuClick(menu)}
                            className={`cursor-pointer p-2 ${
                                selectedMenu === menu
                                    ? 'bg-blue-500 text-white'
                                    : 'text-gray-700 hover:bg-blue-100'
                            }`}
                        >
                            {menu === 'bookList' ? '내 책 목록' : `메뉴 ${menu.charAt(4)}`}
                        </li>
                    ))}
                </ul>

            </div>

            {/* 콘텐츠 섹션 */}
            <div className="flex-1 p-8 bg-gray-200">
                {/* '내 책 목록' 선택 시 표시될 내용 - 추가된 로직 */}
                {selectedMenu === 'bookList' && (
                    <div className="h-full border-2 border-dashed border-gray-300 rounded">
                        <div className="flex h-full items-center justify-center">
                            <p className="text-gray-500">여기에 "내 책 목록" 컨텐츠가 표시됩니다.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Mypage;