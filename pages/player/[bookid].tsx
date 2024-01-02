import { useRouter, useSearchParams, useParams } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import '../globals.css'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const BookPage = () => {
    const router = useRouter();
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);
    const [isReadyToPlay, setIsReadyToPlay] = useState(false);
    const audioPlayerRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReadyToPlay(true);
            if (audioPlayerRef.current) {
                audioPlayerRef.current.audio.current.play();
            }
        }, 1000); // 1초 뒤에 재생 시작

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 해제
    }, []);
    
    const playerContainerStyle = `fixed bottom-0 w-full px-4 py-2 bg-white shadow-md transition-all duration-500 ease-in-out ${
        isPlayerVisible ? 'opacity-100 visible' : 'opacity-0 visible'
    }`;

    const AudioEnd = () => {
        router.push('/quiz');
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
            <div className="flex flex-1">
                {/* 책 이미지 */}
                <div className="flex-1 bg-cover bg-center" style={imageContainerStyle}></div>

                {/* 책 내용 */}
                <div className="flex-1 p-8 overflow-auto" style={textContainerStyle}>
                    {/* <h1 className="text-2xl font-bold mb-4">시골 쥐와 도시 쥐</h1> */}
                    <p className='font-semibold'> 시골 쥐가 서울 구경을 올라왔습니다. 처음 길이라 허둥허둥하면서,짐차를 두 번 세 번이나 갈아타고, 간신히 서울까지 왔습니다. 직행차를 타면 빨리 온다는 말도 들었지만, 그래도 짐차를 타야 먹을 것이 많고
                    사람의 눈에 들킬 염려도 적으므로, 짐차를 타고 온 것이었습니다. 기차가 한강 철교를 건널 때에는 어떻게 무서운 소리가 크게 나는지, 어지러워서 내려다보지도 못하고 왔지마는, 서울까지 다 왔다는 말을 들을
                    때에는 기쁜 것 같고 시원한 것 같으면서도, 가슴이 울렁울렁하였습니다. 남대문 정거장에 내려서, 자아 인제 어디로 가야 하나 하고 망설이고 섰노라니까,  “여보, 여보!”
                    하고, 뒤에서 부르는 소리가 들렸습니다. 보니까, 이름은 몰라도 역시 자기와 같은 쥐이므로 할아버지나 만난 것처럼 기뻐서, “처음 뵙습니다만, 길을 좀 아르켜 주십시오. 서울은 시골서 처음 올라와서 그럽니다.” 하고, 애걸하듯이 물었습니다. “글쎄, 처음부터 당신이 시골서 처음 온 양반인 줄 짐작했습니다. 서울구경하러 올라오셨구려”
                    </p>
                </div>
            </div>

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