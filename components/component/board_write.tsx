// writeform.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import Cookies from "js-cookie";


const Board_detail = ({ onCancel }) => {
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");

    const handlePostSubmit = async (event) => {
        // 글 작성 로직 추가
        // 예: 서버에 데이터 전송
        event.preventDefault(); // 폼의 기본 제출 동작을 방지

        try {
            // JWT 토큰 가져오기 (예: localStorage에서)
            const token = Cookies.get('token');
            const user_id = Cookies.get('user_id');
            const response = await axios.post('http://127.0.0.1:8000/api/posts/', {
                title: postTitle,
                content: postContent,
                User: user_id,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}` // 토큰을 헤더에 추가
                }
            });

            console.log('Post submitted:', response.data);
            // 작성이 완료된 후 폼 닫기
            onCancel();
        }catch(error){
            console.error('Error submitting post:', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">글 작성하기</h2>
            <form onSubmit={handlePostSubmit}>
                {/* 제목 입력 */}
                <div className="mb-4">
                    <label htmlFor="postTitle" className="block text-sm font-bold mb-2">제목</label>
                    <input
                        id="postTitle"
                        type="text"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                {/* 내용 입력 */}
                <div className="mb-4">
                    <label htmlFor="postContent" className="block text-sm font-bold mb-2">내용</label>
                    <textarea
                        id="postContent"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        rows="4"
                        required
                    ></textarea>
                </div>
                {/* 작성 완료 버튼 */}
                <div className='text-right my-6'>
                    <Button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                    >
                        등록하기
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Board_detail;
function decodeJWT(token: any): jwt_decode.JwtPayload {
    throw new Error('Function not implemented.');
}

