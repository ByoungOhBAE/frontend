"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Login from "@/components/component/index_compo/login";
import { Signup } from "@/components/component/index_compo/signup";
import './globals.css'

const screens = [
  {
    id: 1,
    content: (
      <div>
        <h1 className="text-4xl font-bold mt-8 mb-12 mx-4">
          서비스 소개
        </h1>
        <p className="text-xl leading-loose mb-8 mx-2">
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
  {
    id: 2,
    content: (
      <div>
        <h1 className="text-4xl font-bold my-8 mx-4">
          서비스 소개
        </h1>
        <p className="text-xl leading-loose my-8 mx-2">
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
            유아시기는 만3세~만5세인데, 유아기의 아이가
          언어를 배우는 시기의 뇌는 스펀지와 같다고 한다.
          스펀지가 물을 흡수하는 것처럼 언어를 흡수하게
          된다는 것이다. 이순영 고려대 국어교육과 교수는
          미취학 아동의 시기가 독서 관심도의 차이를
          결정하는 골든타임이라고 말했다. 
          그래서 아이의 흥미를 이끌고 독서 습관을 자연스럽게 체득할 수
          있게 도움을 주는 서비스를 제공하고자 한다.
      </div>
    ),
  },
];

export default function Index() {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
//   const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [showNextScreen, setShowNextScreen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isNext, setIsNext] = useState(true);

  // 스크린 전환을 위한 상태 값
    const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
    const [nextScreenIndex, setNextScreenIndex] = useState(1);

  useEffect(() => {
    setShowContent(true);
  }, []);

  const backgroundStyle: React.CSSProperties = {
    backgroundImage: 'url("/field.jpg")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100%',
  };

  const screenStyle: React.CSSProperties = {
    height: '500px',
    // overflow: 'hidden',
  }

  const screenContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const screenRef = useRef(null);

  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.addEventListener("transitionend", () => {
        setShowNextScreen(false);
      });
    }
  }, []);

  // 다음 스크린 나타나는 함수
  const moveToNextScreen = () => {
    setIsNext(true);
    setShowNextScreen(true);
    setCurrentScreenIndex((prevIndex) => (prevIndex + 1) % screens.length);
    setNextScreenIndex((prevIndex) => (prevIndex + 2) % screens.length);
  };

  // 이전 스크린 나타나는 함수
  const moveToPrevScreen = () => {
    setIsNext(false);
    setShowNextScreen(true);
    setCurrentScreenIndex((prevIndex) =>
        prevIndex === 0 ? screens.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen p-6 lg:p-10 bg-cover bg-center relative" style={backgroundStyle}>
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold text-gray-800">
          북키즈
        </h2>
      </div>

      <div className="lg:flex justify-between p-6 lg:p-10" style={screenStyle}>
        {showSignup ? (
          <Signup setShowSignup={setShowSignup} />
        ) : (
          <>
            <div className="lg:w-3/4 justify-start bg-blue-100/50 rounded-lg flex items-center relative overflow-hidden">
              <button className="hover:text-8xl text-6xl absolute left-4 top-1/2 transform -translate-y-1/2" onClick={moveToPrevScreen}>
                {'<'}
              </button>
              <div
                ref={screenRef}
                className="flex items-center justify-center mx-16"
                style={{
                    transition: 'transform 0.5s ease-in-out',
                    transform: `translateX(${showNextScreen ? (isNext ? '100%' : '-100%') : '0%'})`,
                    opacity: showNextScreen ? 0 : showContent ? 1 : 0,
                    position: showNextScreen ? 'absolute' : 'static',
                    right: showNextScreen ? '0%' : '',
                }}
              >
                {screens[currentScreenIndex].content}
              </div>
              <button className="hover:text-8xl text-6xl absolute right-4 top-1/2 transform -translate-y-1/2" onClick={moveToNextScreen}>
                {'>'}
              </button>
            </div>
            <div className="lg:w-1/5 lg:flex justify-center">
              {showSignup ? (
                <Signup setShowSignup={setShowSignup} />
              ) : (
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
  const token = context.req.cookies.token;

  if (token) {
    return {
      redirect: {
        destination: '/mainpage',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
