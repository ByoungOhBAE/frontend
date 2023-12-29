// components/WriteForm.js 또는 .tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
 
const Board_update = ({ onCancel }) => {
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
 
    const handlePostSubmit = () => {
        // 글 작성 로직 추가
        // 예: 서버에 데이터 전송
 
        // 작성이 완료된 후 폼 닫기
        onCancel();
    };
    
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    }
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">글 수정하기</h2>
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
                <div className='mb-4'>
                    <label htmlFor='fileInput' className='block text-sm font-bold text-gray-700 mb-2'>
                        첨부파일
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        name="fileInput"
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full"
                        onChange={handleFileChange}
                    />
                </div>
                {/* 작성 완료 버튼 */}
                <div className='flex justify-end'>
                <Button
                    type="submit"
                    className="bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                    수정하기
                </Button>
                </div>
            </form>
        </div>
    );
};
 
export default Board_update;
 