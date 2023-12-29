// components/BookDetailComponent.js 또는 .tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Booklist from './booklist';

const Mypage = ({ setSelecteCompoId }) => {
    const [selectedMenu, setSelectedMenu] = useState('bookList'); /*클릭하면 나오도록*/
    const [readBookCount, setReadBookCount] = useState(0);  // 읽은 책 수
    const [quizCount, setQuizCount] = useState(0);          // 푼 퀴즈 수
    const [correctRate, setCorrectRate] = useState(0);      // 맞은 퀴즈 수 => 이거 알면 정답률 계산 가능
    // const [incorrectRate, setIncorrectRate] = useState(0);  // 틀린 퀴즈 수 => 맞은 퀴즈 수만 알면 계산 가능
    // const [lastLearningDate, setLastLearningDate] = useState('');   // 마지막 학습 날짜

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        // 컴포넌트가 마운트될 때 'bookList'로 초기화
        setSelectedMenu('bookList');
        const fetchUserStats = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/${userData.id}/`);  // 사용자 ID에 따라 수정
                const userData = response.data;

                const bookListResponse = await axios.get(`http://127.0.0.1:8000/api/user/${userData.id}/booklist/`);
                const userBookList = bookListResponse.data;
                
                // 상태 업데이트
                setReadBookCount(userData.readBookCount);
                setQuizCount(userData.quizCount);
                setCorrectRate(userData.correctRate);
                setBookList(userBookList);
            } catch (error) {
                console.error('Error fetching user stats:', error);
            }
        };

        fetchUserStats();
    }, []);

    const PER_PAGE = 8;

    return ( //보여주는 부분 return 안에있는거만 마이페이지처럼 꾸며라.
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* 프로필 & 메뉴 섹션 */}
            <div className="bg-white p-10 flex flex-col w-1/5" >
                {/* 프로필 영역 */}
                <div className="text-center mb-10">
                    <div className="w-1/2 h-1/2 rounded-full overflow-hidden mx-auto mb-20">
                        <img src="/kid.png" className="object-cover w-full h-full rounded-full snap-center" />
                    </div>
                    <h2 className="text-xl font-semibold">사용자</h2>
                    <p className="text-gray-500 mb-3">user@example.com</p>
                </div>
                {/* 메뉴 영역 - 책갈피 스타일 */}
                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'center', width: '100%' }}>
                    {['bookList', 'menu1'].map((menu) => (
                        <li
                            key={menu}
                            onClick={() => handleMenuClick(menu)}
                            className={`cursor-pointer p-2 ${
                                selectedMenu === menu
                                    ? 'bg-blue-600 text-white rounded-lg'
                                    : 'text-gray-700 hover:bg-blue-100 rounded-lg'
                            }`}
                        >
                            {menu === 'bookList' ? '내 책 목록' : `학습현황`}
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
                            {/* Booklist 컴포넌트에 북리스트 전달 */}
                            <Booklist bookList={bookList} setSelecteCompoId={setSelecteCompoId} />
                        </div>
                    </div>
                )}

                {/* '학습현황' 선택 시 표시될 내용 - 추가된 로직 */} 
                {selectedMenu === 'menu1' && (
                    <div className="h-full border-2 border-dashed border-gray-300 rounded">
                        <div className="flex h-full items-center justify-center">
                            <p className="text-gray-500">
                                여기에 "학습현황" 컨텐츠가 표시됩니다.<br />
                                읽은 책 수: {readBookCount}<br />
                                푼 퀴즈 수: {quizCount}<br />
                                정답률: {correctRate}%

                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default Mypage;