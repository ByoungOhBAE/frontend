'use client';
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import '../globals.css'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import axios from 'axios';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { bookid } = context.query;

  return {
    props: { bookid }, // 이 부분에서 bookid를 props로 전달합니다.
  };
};

const BookPage = ({bookid}) => {
    const router = useRouter();
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);
    const [isReadyToPlay, setIsReadyToPlay] = useState(false);
    const audioPlayerRef = useRef(null);
    const [book, setBook] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

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
                console.log(response.data.results);
                // setPosts(response.data.results);
                // setNextPageUrl(response.data.next);
            })
            .catch(error => {
                console.error('Error fetching post data:', error);
            });
    };

    const playerContainerStyle = `fixed bottom-0 w-full px-4 py-2 bg-white shadow-md transition-all duration-500 ease-in-out ${
        isPlayerVisible ? 'opacity-100 visible' : 'opacity-0 visible'
    }`;

    const AudioEnd = () => {
        setCurrentPage(currentPage + 1);
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
        
        <div className="flex flex-col h-screen bg-sky-100">
            {book.map(detail => (
            <div className="flex flex-1">
                {/* 책 이미지 */}
                <div className="flex-1 bg-cover bg-center" 
                    style={{
                        // backgroundImage: `url(${{detail.img_path}})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '50%',
                        height: '100%',
                        borderRadius: '50% / 5%',
                        border: '2px solid black',
                        }}></div>
                {/* 책 내용 */}
                <div className="flex-1 p-8 overflow-auto" style={textContainerStyle}>
                    {/* <h1 className="text-2xl font-bold mb-4">시골 쥐와 도시 쥐</h1> */}
                    <p className='font-semibold'> 
                    
                        {detail.content}
                    
                    </p>
                </div>
            </div>
            ))}
            {/* 오디오 플레이어 */}
            <div
                className={playerContainerStyle}
                onMouseEnter={() => setIsPlayerVisible(true)}
                onMouseLeave={() => setIsPlayerVisible(false)}
            >
                <AudioPlayer
                    ref={audioPlayerRef}
                    src="/audio/mouse.mp3"
                    autoPlay={isReadyToPlay}
                    showJumpControls={false} 
                    preload="none"
                    onEnded={AudioEnd}
                    // autoPlay={false}
                    // customAdditionalControls={[]} // 추가 컨트롤을 빈 배열로 설정하여 숨김
                    // 필요한 경우 다른 props 추가
                />
            </div>
        </div>
    );
};

export default BookPage;