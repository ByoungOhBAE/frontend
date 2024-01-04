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

  useEffect(() => {
    fetchGetData(bookid);
    const timer = setTimeout(() => {
      setIsReadyToPlay(true);
      if (audioPlayerRef.current) {
        // audioPlayerRef.current.audio.current.play();
      }
    }, 1000); // 1초 뒤에 재생 시작

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 해제
    }, [currentPage]);
    
    // 줄거리 데이터 가지고 오기
    const fetchGetData = async (bookid) => {
        axios.get(`http://127.0.0.1:8000/api/BookDetail/${bookid}?page=${currentPage}`)
            .then(response => {
                setBook(response.data.results);
                console.log(response.data.results[0].content);
                const content = response.data.results[0].content;
                fetchPostSpeech(content);
                // setPosts(response.data.results);
                // setNextPageUrl(response.data.next);
            })
            .catch(error => {
                router.push(`/quiz/${bookid}`);
            });
    };

    const fetchPostSpeech = async (content) => {
      const token = Cookies.get('token');
      axios.post(`http://127.0.0.1:8000/api/TextToSpeech/`, {
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

  const playerContainerStyle = `fixed bottom-0 w-full px-4 py-2 bg-white shadow-md transition-all duration-500 ease-in-out ${isPlayerVisible ? 'opacity-100 visible' : 'opacity-0 visible'
    }`;

  const NextPage = () => {
    setCurrentPage(currentPage + 1);
  }
  const PrevPage = () => {
    if (currentPage <= 1) return;
    setCurrentPage(currentPage - 1);
    // router.push('/quiz');
  }

  const imageContainerStyle = {
    backgroundImage: 'url("/image/mouse2.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '50%',
    height: '100%',
    borderRadius: '50% / 5%',
    border: '2px solid black',

  };
  const textContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50% / 5%',
    backgroundColor: 'ivory',
    color: 'black',
    width: '50%',
    height: '100%',
    padding: '20px',
    lineHeight: '2',
    border: '2px solid black',
  };

  return (
    <>
      <main className="flex flex-col md:flex-row gap-2 md:gap-2 min-h-screen">
        <aside className="md:w-1/2 h-screen p-10">
          {book.map(detail => (
            <Card className="rounded-md bg-white dark:bg-gray-800 border-2 ">
              <CardContent className="flex flex-col h-full">
                <ScrollArea className="flex-1 mt-6 w-full rounded-md border max-h-full overflow-auto">
                  <div className="p-2 text-sm">
                    <p className="mt-4 text-3xl tracking-wide" style={{ lineHeight: '3em' }}>
                      {detail.content}
                    </p>
                  </div>
                </ScrollArea>


                <div className="flex items-center justify-center">
                  <div
                    className=" w-full md:w-1/2 lg:w-1/2 fixed bottom-0 p-10 bg-white  transition-all duration-500 ease-in-out ${isPlayerVisible ? 'opacity-100 visible' : 'opacity-0 visible"
                    onMouseEnter={() => setIsPlayerVisible(true)}
                    onMouseLeave={() => setIsPlayerVisible(false)}
                  >

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


              </CardContent>
            </Card>
          ))}
        </aside>
        <aside className=" md:w-1/2 h-screen p-10" >
          <div
            className="min-h-full"
            style={{
              backgroundImage: `url('/image/mouse2.png')`,
              backgroundSize: 'cover',

              backgroundPosition: 'center',
              borderRadius: '4px', // rounded-md에 해당하는 반올림 값을 설정
              aspectRatio: '1 / 1' // aspectRatio를 유지하기 위해 설정
            }}
          />
        </aside>
      </main>
    </>
  )
}


export default BookPage;