"use client";

import React, { useState, useRef, useEffect } from "react";
import Login from "@/components/component/index_compo/login";
import { Signup } from "@/components/component/index_compo/signup";
import './globals.css';
import './swiper-bundle.min.css';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';


export default function Index() {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showContent, setShowContent] = useState(false);
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
    margin: '0',
  }

  return (
    <div className="min-h-screen p-6 lg:p-10 bg-cover bg-center relative" style={backgroundStyle}>
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold text-gray-800">
          BooKids
        </h2>
      </div>

      <div className="lg:flex justify-between p-6 lg:p-10" style={screenStyle}>
        {showSignup ? (
          <Signup setShowSignup={setShowSignup} />
        ) : (
          <>
            <div className="lg:w-3/4 justify-start bg-blue-100/50 rounded-lg flex items-center place-content-center relative overflow-hidden m-8">
              <>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={100}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                    style={{ minHeight: "90%", alignItems: "center" }}
                >
                    <SwiperSlide>유아시기는 만3세~만5세인데, 유아기의 아이가
                        언어를 배우는 시기의 뇌는 스펀지와 같다고 한다.<br />
                        스펀지가 물을 흡수하는 것처럼 언어를 흡수하게
                        된다는 것이다. 이순영 고려대 국어교육과 교수는
                        미취학 아동의 시기가 독서 관심도의 차이를
                        결정하는 골든타임이라고 말했다.<br /> 
                        그래서 아이의 흥미를 이끌고 독서 습관을 자연스럽게 체득할 수
                        있게 도움을 주는 서비스를 제공하고자 한다.</SwiperSlide>
                    <SwiperSlide>Slide 2</SwiperSlide>
                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
                    <SwiperSlide>Slide 5</SwiperSlide>
                    <SwiperSlide>Slide 6</SwiperSlide>
                    <SwiperSlide>Slide 7</SwiperSlide>
                    <SwiperSlide>Slide 8</SwiperSlide>
                    <SwiperSlide>Slide 9</SwiperSlide>
                </Swiper>
              </>
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
