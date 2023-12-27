// components/BookDetailComponent.js 또는 .tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";

const Leedongjun = ({ bookId, setSelectedCompoId }) => {
    const [book, setBook] = useState(null);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

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

    return (
        <div className="flex flex-row items-start justify-center h-screen p-5 mx-10">
            
            {/* 이미지 섹션 */}
            <div className="w-full lg:w-1/2 xl:w-1/2 mb-6 lg:mb-0">
                <img className="max-w-screen-sm object-cover rounded-lg shadow-lg" src='https://www.hdec.kr/FileContents/EditorImg/20220303/%ED%80%B4%EC%A6%88%20%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8%20-%20%EA%B2%8C%ED%8B%B0%EC%9D%B4%EB%AF%B8%EC%A7%80.jpg' alt='Quiz Image'/>
            </div>

            {/* 텍스트 및 버튼 섹션 */}
            <div className="w-full lg:w-2/5 max-w-xl">
                {/* 퀴즈 섹션 */}
                <div className="mb-5">
                    <h2 className="text-white text-center mb-2.5 py-3 px-5 rounded-lg bg-blue-600 shadow-md font-bold text-lg">
                        <span className="mr-2 text-xl">&#x1F4DA;</span> 퀴즈
                    </h2>
                    <div className="p-6 text-center rounded-lg bg-white shadow-md">
                        <p>추운 겨울날, 소녀는 어떤 신발을 신고 있었나요?</p>
                    </div>
                </div>
                {/* 피드백 섹션 */}
                <div className="mb-5">
                    <h2 className="text-white text-center mb-2.5 py-3 px-5 rounded-lg bg-yellow-600 shadow-md font-bold text-lg">
                        <span className="mr-2 text-xl">&#x1F4A1;</span> 선생님의 조언
                    </h2>
                    <div className="p-6 text-center rounded-lg bg-white shadow-md">
                        <p>아주 잘 했어요! 하지만 이야기에 따르면 신발은 소녀의 엄마 것이었어요, 할머니 것이 아니에요. 이야기를 다시 한 번 잘 읽어보면 도움이 될 거예요. 계속 노력하는 모습이 멋져요!</p>
                    </div>
                </div>

                {/* 대답 섹션 */}
                <div className="mb-5">
                    <h2 className="text-white text-center mb-2.5 py-3 px-5 rounded-lg bg-green-600 shadow-md font-bold text-lg">
                        <span className="mr-2 text-xl">&#x1F4AC;</span> 대답
                    </h2>
                    <div className="p-6 text-center rounded-lg bg-white shadow-md">
                        <p>할머니 신발</p>
                    </div>
                </div>
    
                {/* 버튼 컨테이너 */}
                <div className="flex justify-between mt-6">
                    <div className="buttons-container flex justify-center mt-3">
                        <button className="flex items-center justify-center px-7 py-3 text-lg font-semibold cursor-pointer border-0 rounded-lg bg-blue-500 text-white shadow-md transition duration-300 hover:bg-blue-600 mr-1">
                            <svg className="w-7 h-7 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            이전
                        </button>
                        <button className="flex items-center justify-center px-7 py-3 text-lg font-semibold cursor-pointer border-0 rounded-lg bg-green-500 text-white shadow-md transition duration-300 hover:bg-green-600 mr-1">
                            <svg className="w-7 h-7 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                            </svg>
                            재생
                        </button>
                        <button className="flex items-center justify-center px-7 py-3 text-lg font-semibold cursor-pointer border-0 rounded-lg bg-red-500 text-white shadow-md transition duration-300 hover:bg-red-600 mr-1">
                            <svg className="w-7 h-7 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                            </svg>
                            말하기
                        </button>
                        <button className="flex items-center justify-center px-7 py-3 text-lg font-semibold cursor-pointer border-0 rounded-lg bg-blue-500 text-white shadow-md transition duration-300 hover:bg-blue-600">
                            <span className="mr-2">다음</span>
                            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leedongjun;
