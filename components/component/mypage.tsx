// components/BookDetailComponent.js 또는 .tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; // jwt-decode import

const Mypage = ({ setSelecteCompoId }) => {
    const [userInfo, setUserInfo] = useState({ userId: '', email: '' });
    const [selectedMenu, setSelectedMenu] = useState(''); // 클릭하면 나오도록

    useEffect(() => {
        const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
        if (token) {
            const decoded = jwt_decode(token); // 토큰 디코드
            setUserInfo({ userId: decoded.userId, email: decoded.email }); // 사용자 정보 설정
        }
    }, []);

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: '#f3f4f6',
        }}>
        {/* 프로필 & 메뉴 섹션 */}
        <div style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            width: '25%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}>
        {/* 프로필 영역 */}
        <div className="text-center mb-10" style={{ marginTop: '50px' }}> {/* 여기서 마진 탑 조정 */}
            <div className="rounded-full overflow-hidden mx-auto mb-20" style={{ width: '200px', height: '200px' }}> {/* 동그라미 크기 고정 */}
                <img src="/field.jpg" className="object-cover w-full h-full rounded-full snap-center" />
            </div>
            <h2 className="text-xl font-semibold">사용자: {userInfo.userId}</h2>
            <p className="text-gray-500 mb-10">이메일: {userInfo.email}</p>
        </div>

        {/* 메뉴 영역 */}
        <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            width: '100%', 
            display: 'flex', // 플렉스박스 설정
            flexDirection: 'column', // 아이템들을 세로로 정렬
            justifyContent: 'center', // 세로축에서 중앙 정렬
            height: '100%' // 전체 높이 설정
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
            }}
        >
            {menu === 'bookList' ? '내 책 목록' : '메뉴'}
        </li>
    ))}
</ul>

    
        {/* {메뉴 영역
        <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
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
                    }}
                >
                    {menu === 'bookList' ? '내 책 목록' : `메뉴`}
                </li>
            ))}
        </ul> */}
    </div>
    
        {/* 콘텐츠 섹션 */}
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
    

    // return ( //보여주는 부분 return 안에있는거만 마이페이지처럼 꾸며라.
    //     <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
    //         {/* 프로필 & 메뉴 섹션 */}
    //         <div className="bg-white p-10 flex flex-col w-1/5" >
    //             {/* 프로필 영역 */}
    //             <div className="text-center mb-10">
    //                 <h2 className="text-xl font-semibold">사용자</h2>
    //                 <p className="text-gray-500 mb-3">user@example.com</p>
    //             </div>
    //             {/* 메뉴 영역 - 책갈피 스타일 */}
    //             <ul style={{ listStyle: 'none', padding: 0, textAlign: 'center', width: '100%' }}>
    //                 {['bookList', 'menu1'].map((menu) => (
    //                     <li
    //                         key={menu}
    //                         onClick={() => handleMenuClick(menu)}
    //                         className={`cursor-pointer p-2 ${
    //                             selectedMenu === menu
    //                                 ? 'bg-blue-500 text-white'
    //                                 : 'text-gray-700 hover:bg-blue-100'
    //                         }`}
    //                     >
    //                         {menu === 'bookList' ? '내 책 목록' : `메뉴 ${menu.charAt(4)}`}
    //                     </li>
    //                 ))}
    //             </ul>

    //         </div>

    //         {/* 콘텐츠 섹션 */}
    //         <div className="flex-1 p-8 bg-gray-200">
    //             {/* '내 책 목록' 선택 시 표시될 내용 - 추가된 로직 */}
    //             {selectedMenu === 'bookList' && (
    //                 <div className="h-full border-2 border-dashed border-gray-300 rounded">
    //                     <div className="flex h-full items-center justify-center">
    //                         <p className="text-gray-500">여기에 "내 책 목록" 컨텐츠가 표시됩니다.</p>
    //                     </div>
    //                 </div>
    //             )}
    //         </div>
    //     </div>
    // );
};

export default Mypage;