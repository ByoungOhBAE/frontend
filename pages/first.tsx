"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Login from "@/components/component/index_compo/login";
import { Signup } from "@/components/component/index_compo/signup";
// import Booklist from '@/pages/booklist';
import './globals.css'
// 임포트 중괄호 규칙 다름 북리스트는 중괄호 넣으면 오류남
export default function Index() {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showBooklist, setShowBooklist] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(1);

  const backgroundStyle: React.CSSProperties = {
    backgroundImage: 'url("/field.jpg")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    backgroundAttachment: 'scroll',
  };

  const Screen1 = ({ onNext }) => (
    <div>
        <h1 className="text-4xl font-bold mb-4 mt-4 ml-4">
            서비스 소개
        </h1>
        <div className="flex">
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-loose mt-8 mb-6 ml-4 mr-4">
                유아시기는 만3세~만5세인데, 유아기의 아이가
                언어를 배우는 시기의 뇌는 스펀지와 같다고 한다.<br />
                스펀지가 물을 흡수하는 것처럼 언어를 흡수하게
                된다는 것이다. 이순영 고려대 국어교육과 교수는
                미취학 아동의 시기가 독서 관심도의 차이를
                결정하는 골든타임이라고 말했다. 그래서 아이의
                흥미를 이끌고 독서 습관을 자연스럽게 체득할 수
                있게 도움을 주는 서비스를 제공하고자 한다.
            </p>
            <button className="ml-2 mr-2"
                onClick={onNext}>
                <div className="arrow-button">→</div>
            </button>
        </div>
    </div>
  );

  const Screen2 = ({ onPrev }) => (
    <div>
      <h1>두 번째 화면</h1>
      <button onClick={onPrev}>이전 화면으로 이동</button>
    </div>
  );

  // 다음 화면으로 이동하는 함수
  const moveToNextScreen = () => {
    setCurrentScreen(2);
  };

  // 이전 화면으로 이동하는 함수
  const moveToPrevScreen = () => {
    setCurrentScreen(1);
  };

  return (
    <div className="min-h-screen p-6 lg:p-10 bg-cover bg-center relative" style={backgroundStyle}>
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold text-gray-800">
          BooKids
        </h2>
      </div>

      <div className="lg:flex justify-between p-6 lg:p-10">
        {showBooklist ? (
            // 로그인 상태가 true일 때 Login 컴포넌트를 렌더링
          <div></div>
        ) : (
            // 로그인 상태가 false일 때 기본 화면을 렌더링
          <>
            <div className="lg:w-2/3 justify-start">
              <div>
                {currentScreen === 1 ? (
                  <Screen1 onNext={moveToNextScreen} />
                ) : (
                  <Screen2 onPrev={moveToPrevScreen} />
                )}
              </div>
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
