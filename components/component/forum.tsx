// components/BookDetailComponent.js 또는 .tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Forum = ({ postId, goBack }) => {
    const [book, setBook] = useState(null);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);


    return (
        <div className="container mx-auto px-4">
        {/* 뒤로가기 버튼 */}
        <button className="bg-white-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mb-4" onClick={goBack}>
            <img src='https://kr.seaicons.com/wp-content/uploads/2015/11/Arrows-Undo-icon.png' className='w-8 h-8'/>
            
        </button>

        {/* 게시물 내용 */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-bold mb-4">게시물 제목</h1>
            <p className="text-gray-700 mb-2">작성자: 홍길동</p>
            <p className="text-gray-700 mb-4">작성 시간: 2023-12-27</p>
            <div className="text-gray-800">
                {/* 게시물 본문 내용 */}
                본문 즉 질문이 들어갈 자리입니다...
            </div>
        </div>

        {/* 댓글 테이블 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
            <table className="min-w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border-b-2 border-gray-200 p-4 text-center">댓글 작성자</th>
                        <th className="border-b-2 border-gray-200 p-4 text-center">댓글 내용</th>
                        <th className="border-b-2 border-gray-200 p-4 text-center">작성일자</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="cursor-pointer hover:bg-gray-50">
                        <td className="border-b border-gray-200 p-4 text-center">댓글작성자1</td>
                        <td className="border-b border-gray-200 p-4 text-center">댓글 내용 1번---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</td>
                        <td className="border-b border-gray-200 p-4 text-center">작성일자YYYY.MM.DD</td>
                    </tr>
                    {/* 추가적인 댓글 행들을 필요에 따라 반복해서 추가 */}
                </tbody>
            </table>
        </div>

        {/* 댓글 작성하기 버튼 */}
        <div className="text-right my-6">
            <button className="bg-Stone-50 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                <img src='https://cdn.icon-icons.com/icons2/2066/PNG/512/comments_icon_125320.png' className='w-8 h-8' />
                
            </button>
        </div>
    </div>
);
};

export default Forum;
