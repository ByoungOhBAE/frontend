// components/BookDetailComponent.js 또는 .tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import Board_write from "@/components/component/board_write";
import Board_detail from './board_detail';

const Board_list = ({ }) => {
    const [showWrite, setShowWrite] = useState(false);
    const [showSearch, setShowSearch] = useState(true);
    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchGetData();
    }, [currentPage]);

    // 게시물 데이터를 불러오는 함수
    const fetchGetData = async () => {
        axios.get(`http://127.0.0.1:8000/api/posts/?page=${currentPage}&search=${searchQuery}`)
            .then(response => {
                setPosts(response.data.results);
                setNextPageUrl(response.data.next);
            })
            .catch(error => {
                console.error('Error fetching post data:', error);
            });
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

    const selectPost = (postId) => {
        setSelectedPostId(postId);
    };

    const goBack = () => {
        setSelectedPostId(null);
    };

    if (selectedPostId) {
        return <Board_detail 
                    postId={selectedPostId} 
                    goBack={goBack}
                    fetchGetData_board_list={fetchGetData} 
                />;
    }

    const handleSearch = () => {
        setCurrentPage(1); // 검색 시 첫 페이지로 리셋
        fetchGetData();
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
                                onChange={(e) => setSearchQuery(e.target.value)}
                                value={searchQuery}
                                type="text"
                                placeholder="검색어를 입력하세요"
                                className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                            <button 
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2 transition duration-300 ease-in-out"
                                onClick={handleSearch}
                            >
                                검색
                            </button>
                        </>
                    )}
                </div>
            </div>
    
            {/* 테이블 or 작성 폼 */}
            {showWrite ? (
                <Board_write onCancel={() => {setShowWrite(false); setShowSearch(true);}} fetchGetData={fetchGetData} />
            ) : (
            <div className="bg-white p-4 rounded-lg shadow-md">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border-b-2 border-gray-200 p-4 text-center">번호</th>
                            <th className="border-b-2 border-gray-200 p-4 text-center w-1/2">제목</th>
                            <th className="border-b-2 border-gray-200 p-4 text-center">작성자</th>
                            <th className="border-b-2 border-gray-200 p-4 text-center">작성 시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.id} className="cursor-pointer hover:bg-gray-50" onClick={() => selectPost(post.id)}>
                                <td className="border-b border-gray-200 p-4 text-center">{post.id}</td>
                                <td className="border-b border-gray-200 p-4 text-center">{post.title}</td>
                                <td className="border-b border-gray-200 p-4 text-center">{post.user_name}</td>
                                <td className="border-b border-gray-200 p-4 text-center">{post.created_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
            <div className="text-center my-6">
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)}
                    hidden={currentPage === 1}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mr-2"
                >
                    이전
                </button>
                <button 
                    onClick={() => setCurrentPage(currentPage + 1)}
                    hidden={!nextPageUrl}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                    다음
                </button>
            </div>
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

export default Board_list;
