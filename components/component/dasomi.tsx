// components/BookDetailComponent.js 또는 .tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";

const Dasomi = ({ bookId, setSelectedCompoId }) => {
    const [book, setBook] = useState(null);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [selectedMenu, setSelectedMenu] = useState(''); /*클릭하면 나오도록*/

    useEffect(() => {
        if (bookId) {
            axios.get(`http://127.0.0.1:8000/api/BookList/${bookId}`)
                .then(response => {
                    setBook(response.data);
                })
                .catch(error => {
                    console.error('Error fetching book data:', error);
                });
        }
    }, [bookId]);

    const goToNextPage = () => {
        if (currentPageIndex < book.BookDetail.length - 1) {
            setCurrentPageIndex(currentPageIndex + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPageIndex > 0) {
            setCurrentPageIndex(currentPageIndex - 1);
        }
    };

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    return ( //보여주는 부분 return 안에있는거만 마이페이지처럼 꾸며라.
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* 프로필 & 메뉴 섹션 */}
            <div className="bg-white p-4 flex flex-col w-1/4">
                {/* 프로필 영역 */}
                <div className="text-center mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3">
                        <img src="path_to_profile_image.jpg" alt="Profile" className="object-cover w-full h-full" />
                    </div>
                    <h2 className="text-xl font-semibold">사용자</h2>
                    <p className="text-gray-500 mb-3">user@example.com</p>
                </div>

                 {/* 메뉴 영역 */}
                 <ul className="space-y-2">
                    {/* 메뉴 항목 - 클릭 이벤트 추가 */}
                    <li onClick={() => handleMenuClick('bookList')} className="text-gray-700 hover:text-blue-500 cursor-pointer">내 책 목록</li>
                </ul>
                <ul className="space-y-2">
                    {/* 메뉴 항목 - 클릭 이벤트 추가 */}
                    <li onClick={() => handleMenuClick('bookList')} className="text-gray-700 hover:text-blue-500 cursor-pointer">메뉴1</li>
                </ul>
                <ul className="space-y-2">
                    {/* 메뉴 항목 - 클릭 이벤트 추가 */}
                    <li onClick={() => handleMenuClick('bookList')} className="text-gray-700 hover:text-blue-500 cursor-pointer">메뉴2</li>
                </ul>
                <ul className="space-y-2">
                    {/* 메뉴 항목 - 클릭 이벤트 추가 */}
                    <li onClick={() => handleMenuClick('bookList')} className="text-gray-700 hover:text-blue-500 cursor-pointer">메뉴3</li>
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

export default Dasomi;