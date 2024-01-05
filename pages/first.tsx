"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Login from "@/components/component/index_compo/login";
import { Signup } from "@/components/component/index_compo/signup";
// import Booklist from '@/pages/booklist';
import './globals.css'
// 임포트 중괄호 규칙 다름 북리스트는 중괄호 넣으면 오류남

const screens = [
    {
      id: 1,
      content: (
        <div>
          <h1 className="text-4xl font-bold mt-20 mb-12 mx-4">
            서비스 소개
          </h1>
          <p className="text-xl leading-loose mb-20 mx-2">
            유아시기는 만3세~만5세인데, 유아기의 아이가
            언어를 배우는 시기의 뇌는 스펀지와 같다고 한다.<br />
            스펀지가 물을 흡수하는 것처럼 언어를 흡수하게
            된다는 것이다. 이순영 고려대 국어교육과 교수는
            미취학 아동의 시기가 독서 관심도의 차이를
            결정하는 골든타임이라고 말했다.<br /> 
            그래서 아이의 흥미를 이끌고 독서 습관을 자연스럽게 체득할 수
            있게 도움을 주는 서비스를 제공하고자 한다.
          </p>
        </div>
      ),
    },
    // 다른 화면들을 추가할 수 있음
    {
        id: 2,
        content: (
          <div>
            <h1 className="text-4xl font-bold my-12 mx-4">
              서비스 소개
            </h1>
            <p className="text-xl leading-loose my-20 mx-2">
              유아시기는 만3세~만5세인데, 유아기의 아이가
              언어를 배우는 시기의 뇌는 
            </p>
          </div>
        ),
      },
      {
        id: 3,
        content: (
          <div>
            서비스
          </div>
        ),
      },
];

export default function Index() {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showBooklist, setShowBooklist] = useState(false);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  const backgroundStyle: React.CSSProperties = {
    backgroundImage: 'url("/field.jpg")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    backgroundAttachment: 'scroll',
  };

  const screenStyle: React.CSSProperties = {
    height: '500px',
  }

  // 다음 화면으로 이동하는 함수
  const moveToNextScreen = () => {
    setCurrentScreenIndex((prevIndex) => (prevIndex + 1) % screens.length);
  };

  // 이전 화면으로 이동하는 함수
  const moveToPrevScreen = () => {
    setCurrentScreenIndex((prevIndex) =>
      prevIndex === 0 ? screens.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen p-6 lg:p-10 bg-cover bg-center relative" style={backgroundStyle}>
      <div className="text-center mb-8">
        <h2 className="animated-gradient text-5xl">
          북키즈
        </h2>
      </div>

        <div className="lg:flex justify-between p-6 lg:p-10" style={screenStyle}>
            {showBooklist ? (
                // 로그인 상태가 true일 때 Login 컴포넌트를 렌더링
            <div></div>
            ) : (
                // 로그인 상태가 false일 때 기본 화면을 렌더링
            <>
                <div className="lg:w-3/4 justify-start bg-blue-100/50 rounded-lg flex items-center relative">
                    <button className="text-6xl absolute left-4 top-1/2 transform -translate-y-1/2" onClick={moveToPrevScreen}>
                        {'<'}
                    </button>
                    <div className="flex items-center justify-center mx-16">
                        {screens[currentScreenIndex].content}
                    </div>
                    <button className="text-6xl absolute right-4 top-1/2 transform -translate-y-1/2" onClick={moveToNextScreen}>
                        {'>'}
                    </button>
                </div>
                <div className="lg:w-1/5 lg:flex justify-center">
                {showSignup ? (
                    <Signup setShowSignup={setShowSignup} />
                    // 로그인 상태가 true일 때 Login 컴포넌트를 렌더링
                ) : (
                    // 로그인 상태가 false일 때 기본 화면을 렌더링
                    <>
                    <Login setShowLogin={setShowLogin} setShowSignup={setShowSignup}/>
                    </>
                )}
                </div>
            </>
            )}
        </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;  // 쿠키에서 토큰 추출

  // 토큰이 유효한 경우, /mainpage로 리디렉션
  if (token) {
    return {
      redirect: {
        destination: '/mainpage',
        permanent: false,
      },
    };
  }

  // 토큰이 없는 경우, 페이지를 정상적으로 렌더링
  return {
    props: {},
  };
}
