'use client';

/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/6nBFwQqMafA
 */
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import '../globals.css'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Cookies from "js-cookie";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { bookid } = context.query;

  return {
    props: { bookid }, // 이 부분에서 bookid를 props로 전달합니다.
  };
};

const BookPage = ({ bookid }) => {
  const router = useRouter();
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);
  const audioPlayerRef = useRef(null);
  const [book, setBook] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [audioPath, setAudioPath] = useState('');
  const [nextPageAnimation, setNextPageAnimation] = useState('');
  const [prevPageAnimation, setPrevPageAnimation] = useState('');
  const [showTextLayer, setShowTextLayer] = useState(false);
  const [nextContent, setNextContent] = useState('');
  const [imagePath, setImagePath] = useState('');
  const mouseMoveTimer = useRef(null);

  useEffect(() => {
    fetchGetData(bookid);
    const timer = setTimeout(() => {
      setIsReadyToPlay(true);
      if (audioPlayerRef.current) {
        audioPlayerRef.current.audio.current.play();
      }
    }, 2000); // 1초 뒤에 재생 시작
    fetchGetNextContent(bookid);
        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 해제
    }, [currentPage]);

    useEffect(() => {
      return () => clearTimeout(mouseMoveTimer.current);
    }, []);
    
    // 줄거리 데이터 가지고 오기
    const fetchGetData = async (bookid) => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/BookDetail/${bookid}?page=${currentPage}`)
          .then(response => {
              setBook(response.data.results);
              console.log(response.data.results[0].content);
              const content = response.data.results[0].content;
              fetchImage(content);
              // setPosts(response.data.results);
              // setNextPageUrl(response.data.next);
          })
          .catch(error => {
              router.push(`/quiz/${bookid}`);
          });
    };

    // 마우스를 버튼 위에 올렸을 때
    const handleMouseMove = () => {
      clearTimeout(mouseMoveTimer.current); // 이미 실행 중인 타이머가 있다면 초기화
      setIsPlayerVisible(true);

      mouseMoveTimer.current = setTimeout(() => {
        setIsPlayerVisible(false);
        }, 2500);
    };

    const fetchImage = async (content) => {
      try {
        // FormData 객체 생성
        const formData = new FormData();
        // 'content' 필드에 값을 추가
        formData.append('content', content);
    
        // Fetch 요청을 보냄
        const response = await fetch('http://34.64.172.218/stable/api/generate_image/', {
          method: 'POST',
          body: formData, // FormData를 요청 본문으로 사용
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
          console.log('이미지 세팅');
          setImagePath(data.image_path);
          
          console.log('줄거리 읽어주기');
          fetchPostSpeech(content); // 이미지 생성후 줄거리 읽어주기
          
        } else {
          console.error('Error fetching image:', data.error);
        }
      } catch (error) {
        console.error('Error fetching image:', error.message);
      }
    };

    const fetchGetNextContent = async (bookid) => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/BookDetail/${bookid}?page=${currentPage+1}`)
          .then(response => {
              setNextContent(response.data.results[0].content);
          })
          .catch(error => {
              router.push(`/quiz/${bookid}`);
          });
    };

    const fetchPostSpeech = async (content) => {
      const token = Cookies.get('token');
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/TextToSpeech/`, {
          content: content,
      },{
          headers: {
              'Authorization': `Bearer ${token}` // 토큰을 헤더에 추가
          }
      })
          .then(response => {
              setAudioPath(response.data.file_path);
              console.log(response.data.file_path);
              // console.log(response);
              // setQuiz(response.data.question);
              // setContent(response.data.content);
              // setQuizAnswer(response.data.quiz_answer);
          })
          .catch(error => {
              console.log(error);
          });
  };

  const NextPage = () => {
    setShowTextLayer(true); // 애니메이션 넘어갈 때 숨겨진 컨텐츠 보이기
    setNextPageAnimation('turnPage 1s forwards');
    setTimeout(() => {
      setCurrentPage(currentPage + 1);
      setNextPageAnimation('');
      setShowTextLayer(false); // 애니메이션 끝나고 다시 숨기기
    }, 1000); // 애니메이션 시간과 일치
  };

  const PrevPage = () => {
    if (currentPage <= 1) return;
    setPrevPageAnimation('turnPageReverse 1s backwards');
    setTimeout(() => {
      setCurrentPage(currentPage - 1);
      setPrevPageAnimation('');
    }, 1000);
  };

  const handleMoveMainPage = () => {
    // '/mainpage'로 이동하면서 뒤로 가기로 못돌아가게 함
    router.replace('/mainpage', undefined);
  };

  return (
    <>
      <main className="flex flex-row gap-2 md:gap-2 min-h-screen bg-gray-100" 
            onMouseMove={handleMouseMove}
      >

        <button onClick={handleMoveMainPage}
            className={`bg-transparent fixed top-0 pt-10 pl-10 duration-1000 transition-opacity ease-in-out ${isPlayerVisible ? 'opacity-100' : 'opacity-0'}`} style={{zIndex: 2}}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
          </svg>
        </button>
        <aside className="w-1/2 h-screen p-5 overflow-hidden" 
                style={{ transformStyle: 'preserve-3d', animation: prevPageAnimation, transformOrigin: 'right', zIndex: prevPageAnimation ? 1 : 0 }}>
            {book.map(detail => (
              <Card className="h-full rounded-md bg-white border-2 shadow-lg">
                <CardContent className="flex flex-col h-full p-4">
                  <ScrollArea className="flex-1 mt-6 w-full rounded-md border max-h-full overflow-auto">
                    <div className="p-2 text-sm">
                      <p className="mt-4 text-3xl tracking-wide px-5" style={{ lineHeight: '3em' }}>
                        &nbsp;&nbsp;&nbsp;{detail.content}
                      </p>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            ))}
        </aside>
        <aside className="w-1/2 h-screen p-5 overflow-hidden" 
                style={{ transformStyle: 'preserve-3d', animation: nextPageAnimation, transformOrigin: 'left', zIndex: nextPageAnimation ? 1 : 0 }}>
          <div
            className="h-full w-full rounded-md shadow-lg bg-cover bg-center"
            style={{
              backgroundImage: `url(https://i.pinimg.com/originals/a2/37/6c/a2376c7360c9f3092096180633e763eb.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '4px',
              aspectRatio: '1 / 1',
            }}
          >
          </div>
        </aside>
        <div className={`absolute top-0 left-1/2 w-1/2 h-screen p-5 flex items-center justify-center ${showTextLayer ? 'opacity-1' : 'opacity-0'}`}>
          {book.map(detail => (
            <Card className="h-full rounded-md bg-white border-2 shadow-lg">
              <CardContent className="flex flex-col h-full p-4">
                <ScrollArea className="flex-1 mt-6 w-full rounded-md border max-h-full overflow-auto">
                  <div className="p-2 text-sm">
                    <p className="mt-4 text-3xl tracking-wide px-5" style={{ lineHeight: '3em' }}>
                      &nbsp;&nbsp;&nbsp;{nextContent}
                    </p>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <div className="flex items-center justify-center">
        <div
          className={`w-full md:w-full fixed bottom-0 px-5 bg-white duration-1000 transition-opacity ease-in-out ${isPlayerVisible ? 'opacity-100' : 'opacity-0'}`}>

          <AudioPlayer
            ref={audioPlayerRef}
            src={audioPath}
            autoPlay={isReadyToPlay}
            showJumpControls={false}
            preload="none"
            onEnded={NextPage}
            onClickNext={NextPage}
            onClickPrevious={PrevPage}
            showSkipControls={true}
            autoPlayAfterSrcChange={false}
          // autoPlay={false}
          // customAdditionalControls={[]} // 추가 컨트롤을 빈 배열로 설정하여 숨김
          // 필요한 경우 다른 props 추가
          />
        </div>
      </div>
    </>
  )
}
export default BookPage;