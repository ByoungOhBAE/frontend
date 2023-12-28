// components/BookDetailComponent.js 또는 .tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import WriteForm from "@/components/component/writeform";

const Leedongjun3 = ({ bookId, setSelectedCompoId }) => {
    const [book, setBook] = useState(null);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [showWrite, setShowWrite] = useState(false);
    const [showSearch, setShowSearch] = useState(true);

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

    const handleWriteButtonClick = () => {
        setShowWrite(true);
        setShowSearch(false);
    };

    const handleBackButtonClick = () => {
        setShowWrite(false); // 작성 폼을 닫아주기
        setShowSearch(true); // 검색창 열기
        // 이전 페이지로 돌아가는 로직 추가
        // 예를 들어, 다시 목록 페이지로 이동하거나 이전 상태로 복원하는 등의 동작을 수행
    };

    return (
        <div className="container mx-auto px-4">
            {/* 상단 버튼과 검색 창 */}
            <div className="flex justify-between items-center my-6">
                <button 
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                    onClick={handleBackButtonClick}
                >
                    뒤로가기
                </button>
                <div className="flex items-center">
                    {showSearch && (
                        <>
                            <input
                                type="text"
                                placeholder="검색어를 입력하세요"
                                className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2 transition duration-300 ease-in-out">
                                검색
                            </button>
                        </>
                    )}
                </div>
            </div>
    
            {/* 테이블 or 작성 폼 */}
            {showWrite ? (
                <WriteForm onCancel={() => setShowWrite(false)} />
            ) : (
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border-b-2 border-gray-200 p-4 text-center">번호</th>
                                <th className="border-b-2 border-gray-200 p-4 text-center">제목</th>
                                <th className="border-b-2 border-gray-200 p-4 text-center">작성자</th>
                                <th className="border-b-2 border-gray-200 p-4 text-center">작성 시간</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="cursor-pointer hover:bg-gray-50">
                                <td className="border-b border-gray-200 p-4 text-center">1</td>
                                <td className="border-b border-gray-200 p-4 text-center">
                                    <a href="/post/1" className="text-blue-600 hover:text-blue-800">게시물 제목</a>
                                </td>
                                <td className="border-b border-gray-200 p-4 text-center">홍길동</td>
                                <td className="border-b border-gray-200 p-4 text-center">2023-12-27</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
    
            {/* 작성하기 버튼 */}
            <div className="text-right my-6">
                {showSearch && (
                        <>
                            <Button 
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                                onClick={handleWriteButtonClick}
                            >
                                작성하기
                            </Button>
                        </>
                    )}
            </div>
        </div>
    );
};

export default Leedongjun3;
