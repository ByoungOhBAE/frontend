// components/BookDetailComponent.js 또는 .tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Mypage = ({ setSelecteCompoId }: { setSelecteCompoId: (id: string) => void }) => {
    const [userInfo, setUserInfo] = useState({ name: '', email: '' }); // 초기값을 빈 문자열로 설정
    const [selectedMenu, setSelectedMenu] = useState('');

    useEffect(() => {
        // 쿠키에서 user_id 읽기
        const userId = Cookies.get('user_id');
        if (userId) {
            axios.get(`http://127.0.0.1:8000/api/user/${userId}`)
                .then(response => {
                    setUserInfo(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, []);

    const handleMenuClick = (menu: string) => {
        setSelectedMenu(menu);
    };


    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: '#f3f4f6',
        }}>
        {/* 프로필 & 메뉴 섹션 */ }
            <div style={{
                backgroundColor: '#ffffff',
                padding: '20px',
                width: '25%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',}}>
            {/* 프로필 영역 */}
            <div className="text-center mb-10" style={{ marginTop: '50px' }}> {/* 여기서 마진 탑 조정 */}
                <div className="rounded-full overflow-hidden mx-auto mb-20" style={{ width: '200px', height: '200px', marginBottom: '30px' }}> {/* 동그라미 크기 고정. marginBottom: '30px'은 이름과 사진 사이의 거리 */}
                    <img src="/field.jpg" className="object-cover w-full h-full rounded-full snap-center" />
                </div>
                <h2 className="text-xl font-semibold">{userInfo.name}</h2>
                <p className="text-gray-500 mb-10">{userInfo.email}</p>
            </div>

            {/* 메뉴 영역 */}
            <ul style={{
                listStyle: 'none',
                padding: 0,
                width: '100%',
                display: 'flex', // 플렉스박스 설정
                flexDirection: 'column', // 아이템들을 세로로 정렬
                justifyContent: 'center', // 세로축에서 중앙 정렬
                height: '100%', // 전체 높이 설정
                marginTop: '20px', // 여백을 줄이기 위해 추가 또는 수정
            }}>
                {['bookList', 'menu1'].map((menu) => (
                    <li
                        key={menu}
                        onClick={() => handleMenuClick(menu)}
                        style={{
                            cursor: 'pointer',
                            padding: '10px',
                            textAlign: 'center',
                            backgroundColor: selectedMenu === menu ? '#3b82f6' : '#ffffff',
                            color: selectedMenu === menu ? '#ffffff' : '#1f2937',
                            marginBottom: '5px',
                            borderRadius: '5px',
                            transition: 'background-color 0.2s ease-in-out',
                        }}>
                        {menu === 'bookList' ? '내 책 목록' : '메뉴'}
                    </li>
                ))}
            </ul>
        </div>    
        {/* 콘텐츠 섹션 */ }
        <div style={{
            flex: 1,
            padding: '20px',
            backgroundColor: '#e5e7eb',
        }}>
            {selectedMenu === 'bookList' && (
                <div style={{
                    border: '2px dashed #d1d5db',
                    borderRadius: '8px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <p style={{ color: '#6b7280' }}>여기에 "내 책 목록" 컨텐츠가 표시됩니다.</p>
                </div>
            )}
            {/* 추가적인 메뉴 컨텐츠를 여기에 구현할 수 있습니다 */}
        </div>
        </div>
        );
    };

export default Mypage;