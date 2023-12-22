import Image from 'next/image'
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Login } from "@/components/component/login";
import { Signup } from "@/components/component/signup";
import Booklist from '@/components/component/booklist';
// 임포트 중괄호 규칙 다름 북리스트는 중괄호 넣으면 오류남
export default function Home() {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showBooklist, setShowBooklist] = useState(false);

    const backgroundStyle: React.CSSProperties = {
        backgroundImage: 'url("/field.jpg")',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        backgroundAttachment: 'scroll',
    };

    return (
        <div className="min-h-screen p-6 lg:p-10 bg-cover bg-center" style={backgroundStyle}>
            {/* 프로젝트 제목 */}


            <div className="text-center mb-8">
                <h2 className="text-5xl font-bold text-gray-800">
                    BooKids
                </h2>
            </div>

            <div className="lg:flex justify-between items-center p-6 lg:p-10">
                {showBooklist ? (
                    // 로그인 상태가 true일 때 Login 컴포넌트를 렌더링.

                    <Booklist setShowBooklist={setShowBooklist} />

                ) : (
                    // 로그인 상태가 false일 때 기본 화면을 렌더링.
                    <>

                        <div className="lg:w-1/2">

                            <Button className="text-4xl font-bold mb-4"
                                onClick={() => setShowBooklist(true)}>
                                서비스 소개
                            </Button>

                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                                유아시기는 만3세~만5세인데, 유아기의 아이가
                                언어를 배우는 시기의 뇌는 스펀지와 같다고 한다.
                                스펀지가 물을 흡수하는 것처럼 언어를 흡수하게
                                된다는 것이다. 이순영 고려대 국어교육과 교수는
                                미취학 아동의 시기가 독서 관심도의 차이를
                                결정하는 골든타임이라고 말했다. 그래서 아이의
                                흥미를 이끌고 독서 습관을 자연스럽게 체득할 수
                                있게 도움을 주는 서비스를 제공하고자 한다.
                            </p>
                        </div>
                        <div className="lg:w-1/2 lg:flex justify-end">
                            {showLogin ? (
                                // 로그인 상태가 true일 때 Login 컴포넌트를 렌더링.
                                <Login setShowLogin={setShowLogin} setShowBooklist={setShowBooklist} />
                            ) : showSignup ? (
                                <Signup setShowSignup={setShowSignup} />
                            ) : (
                                // 로그인 상태가 false일 때 기본 화면을 렌더링.
                                <>
                                    <div className="space-x-4">
                                        <Button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            variant="outline"
                                            onClick={() => setShowLogin(true)}
                                        >
                                            로그인
                                        </Button>
                                        <Button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            variant="outline"
                                            onClick={() => setShowSignup(true)}
                                        >
                                            회원가입
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}
