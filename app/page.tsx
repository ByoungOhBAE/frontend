import Image from 'next/image'
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Login } from "@/components/component/login";
import { Signup } from "@/components/component/signup";

export default function Home() {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

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
                    <h2 className="text-3xl font-bold text-gray-800">
                        프로젝트 제목
                    </h2>
                </div>
                <div className="lg:flex justify-between items-center p-6 lg:p-10">

                    <div className="lg:w-1/2">
                        <h1 className="text-4xl font-bold mb-4">
                            서비스 소개
                        </h1>
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
                            <Login setShowLogin={setShowLogin} />
                        ) : showSignup ? (
                            <Signup setShowSignup={setShowSignup} />
                        ) : (
                            // 로그인 상태가 false일 때 기본 화면을 렌더링.
                            <>
                                <div className="space-x-4">
                                    <Button
                                        className="w-full lg:w-auto"
                                        variant="outline"
                                        onClick={() => setShowLogin(true)}
                                    >
                                        로그인
                                    </Button>
                                    <Button
                                        className="w-full lg:w-auto"
                                        variant="outline"
                                        onClick={() => setShowSignup(true)}
                                    >
                                        회원가입
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>

                </div>
            </div>       
    );
}
