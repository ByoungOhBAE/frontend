// components/forum.js 또는 .tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


const Board_detail = ({ postId, goBack }) => {
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
        <div className="container mx-auto px-4 py-6">
        {/* 뒤로가기 버튼 */}
        <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mb-4" onClick={goBack}>
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
        {post && (
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
                        {post.comment.map((comment) => (
                            <tr key={comment.id} className="cursor-pointer hover:bg-gray-50">
                                <td className="border-b border-gray-200 p-4 text-center">{comment.user_name}</td>
                                <td className="border-b border-gray-200 p-4 text-center">{comment.content}</td>
                                <td className="border-b border-gray-200 p-4 text-center">{new Date(comment.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            <br></br>
            <input id='new_comment' type='text' value={comment} onChange={(e) =>  setcomment(e.target.value)} className='w-5/6 mb-2 p-2 border border-gray-300' required placeholder='댓글 내용'/>
        {/* 댓글 작성하기 버튼 */}
            <button className="ml-20 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                작성하기
            </button>
        </div>
        )}
        </div>

        
);
};

export default Board_detail;
