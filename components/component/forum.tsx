// components/forum.js 또는 .tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Forum = ({ postId }) => {
    const [post, setPost] = useState(null);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    useEffect(() => {
        if (postId) {
            axios.get(`http://127.0.0.1:8000/api/posts/${postId}/`)
                .then(response => {
                    setPost(response.data);
                })
                .catch(error => {
                    console.error('Error fetching post data:', error);
                });
        }
    }, [postId]);

    //수정
    const [comment, setcomment] =useState("")

    return (
        <div className="container mx-auto px-4">
        {/* 뒤로가기 버튼 */}
        <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mb-4">
            뒤로가기
        </button>

        {/* 상세 게시물 및 댓글 관련 내용 */}
        {/* post가 null이 아닐 때만 내용을 렌더링 */}
        {post && (
            <div>
                {/* 게시물 내용 */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <p className="text-gray-700 mb-2 text-lg font-bold"> {post.user_name}</p>
                    <p className="text-gray-700 mb-4 text-lg font-bold"> {post.created_at}</p>
                    </div>
                    <div><br></br></div>
                    <div className="text-gray-800">
                        {/* 게시물 본문 내용 */}
                        {post.content}
                    </div>
                </div>
            </div>
        )}

        

        {/* 댓글 테이블 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <table className="min-w-full">
                <caption className='text-left mb-4 text-gray-700'>댓글</caption>
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border-b-2 border-gray-200 p-4 text-center">작성자</th>
                        <th className="border-b-2 border-gray-200 p-4 text-center">내용</th>
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
            <br></br>
            <input id='new_comment' type='text' value={comment} onChange={(e) =>  setcomment(e.target.value)} className='w-5/6 mb-2 p-2 border border-gray-300' required placeholder='댓글 내용'/>
        {/* 댓글 작성하기 버튼 */}
            <button className="ml-20 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                작성하기
            </button>
        </div>
        </div>

        
);
};

export default Forum;
