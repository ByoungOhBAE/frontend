import AudioPlayer from 'react-audio-player';
import React, { useState, useRef, useEffect } from 'react';
import { Motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const BookContent = () => {

    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
        width: '1200px',
        height: '600px',
        // 검은색 테두리 적용
        overflow: 'hidden', // 둥근 테두리 내부로 내용물이 넘치지 않도록 설정
    };

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
        boxSizing: 'border-box',
        lineHeight: '2',
        border: '2px solid black',
    };

    return (
        <div style={containerStyle}>
            {/* <h1 className="text-2xl font-bold mb-4">시골 쥐 서울 쥐</h1> */}
            <div style={imageContainerStyle}></div>
            <div style={textContainerStyle}>
                <p className='font-semibold'> 시골 쥐가 서울 구경을 올라왔습니다. 처음 길이라 허둥허둥하면서,짐차를 두 번 세 번이나 갈아타고, 간신히 서울까지 왔습니다. 직행차를 타면 빨리 온다는 말도 들었지만, 그래도 짐차를 타야 먹을 것이 많고
                    사람의 눈에 들킬 염려도 적으므로, 짐차를 타고 온 것이었습니다. 기차가 한강 철교를 건널 때에는 어떻게 무서운 소리가 크게 나는지, 어지러워서 내려다보지도 못하고 왔지마는, 서울까지 다 왔다는 말을 들을
                    때에는 기쁜 것 같고 시원한 것 같으면서도, 가슴이 울렁울렁하였습니다. 남대문 정거장에 내려서, 자아 인제 어디로 가야 하나 하고 망설이고 섰노라니까,  “여보, 여보!”
                    하고, 뒤에서 부르는 소리가 들렸습니다. 보니까, 이름은 몰라도 역시 자기와 같은 쥐이므로 할아버지나 만난 것처럼 기뻐서, “처음 뵙습니다만, 길을 좀 아르켜 주십시오. 서울은 시골서 처음 올라와서 그럽니다.” 하고, 애걸하듯이 물었습니다. “글쎄, 처음부터 당신이 시골서 처음 온 양반인 줄 짐작했습니다. 서울구경하러 올라오셨구려”</p>
            </div>
        </div>
    );
};

const Player = () => {
    const router = useRouter();
    const audioRef = useRef();
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.75); // 초기 볼륨을 75%로 설정
    const [isVolumeVisible, setIsVolumeVisible] = useState(false);  // 볼륨 바 표시 여부


    useEffect(() => {
        if (audioRef.current && audioRef.current.audioEl.current) {
            audioRef.current.audioEl.current.volume = volume;
        }
    }, [volume]); // 볼륨이 변경될 때마다 이를 오디오 플레이어에 적용

    // 볼륨 바 표시/숨김을 토글하는 함수
    const toggleVolumeControl = () => {
        setIsVolumeVisible(!isVolumeVisible);
    };

    // 볼륨 변경 핸들러
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.audioEl.current.volume = newVolume;
        }
    };

    useEffect(() => {
        // 오디오 파일이 로드되었을 때 duration을 업데이트합니다.
        const setAudioData = () => {
            setDuration(audioRef.current.audioEl.current.duration);
        };

        // 현재 재생 시간을 업데이트합니다.
        const setAudioTime = () => {
            setCurrentTime(audioRef.current.audioEl.current.currentTime);
        };

        // 오디오 플레이어에 이벤트 리스너를 설정합니다.
        const audio = audioRef.current.audioEl.current;
        audio.addEventListener('loadedmetadata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);

        // 이벤트 리스너를 정리합니다.
        return () => {
            audio.removeEventListener('loadedmetadata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
        };
    }, []);

    // 오디오가 로드되면 전체 재생 시간을 설정합니다.
    const handleLoadedMetadata = () => {
        const audio = audioRef.current.audioEl.current;
        setDuration(audio.duration);
    };

    // 오디오의 현재 재생 시간을 업데이트합니다.
    const handleTimeUpdate = () => {
        const audio = audioRef.current.audioEl.current;
        setCurrentTime(audio.currentTime);
    };

    // 프로그레스 바를 조작할 때 해당 시간으로 이동합니다.
    const handleProgressChange = (e) => {
        const audio = audioRef.current.audioEl.current;
        const newTime = (audio.duration / 100) * e.target.value;
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    // 현재 시간과 전체 시간을 'mm:ss' 형식으로 포맷합니다.
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    // 프로그레스 바의 현재 값
    const progressValue = duration ? (currentTime / duration) * 100 : 0;

    // 오디오를 일시정지하는 함수
    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.audioEl.current.pause();
        } else {
            audioRef.current.audioEl.current.play();
        }
        setIsPlaying(!isPlaying); // 재생 상태를 반전시킵니다.
    };
    const onAudioEnd = () => {
        console.log("퀴즈페이지로 이동합니다");
        router.push('/leedongjun');
        // Add any additional logic you want to execute here
    };
    return (

        <div className="container mx-auto">
            {/* BookContent 컴포넌트 */}
            <BookContent />

            {/* AudioPlayer */}
            <AudioPlayer
                ref={audioRef}
                preload="none"
                volume={volume}
                src="/audio/mouse.mp3"
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onEnded={onAudioEnd}
                style={{
                    background: 'transparent',
                    width: '100%',
                }}
            />
            <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-white">{formatTime(currentTime)}</span>
                <input
                    type="range"
                    className="progress-bar appearance-none h-2 rounded bg-gray-300 outline-none opacity-70 transition-opacity duration-200 ease-in w-full"
                    value={(currentTime / duration) * 100 || 0}
                    step="1"
                    min="0"
                    max="100"
                    onChange={(e) => {
                        const newTime = (duration / 100) * e.target.value;
                        audioRef.current.audioEl.current.currentTime = newTime;
                        setCurrentTime(newTime);
                    }}
                />
                <span className="text-lg font-semibold text-white">{formatTime(duration)}</span>
            </div>

            <div
                className="bg-slate-50 text-slate-500 dark:bg-slate-600 dark:text-slate-200 rounded-b-xl flex items-center opacity-0 hover:opacity-100 transition-opacity duration-500">

                <div className="flex-auto flex items-center justify-evenly">

                </div>
                {/* 일시정지 버튼 */}
                <button
                    type="button"
                    onClick={togglePlayPause} // 이 버튼을 클릭하면 재생/일시정지 기능이 작동합니다.
                    className="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
                    aria-label="Play/Pause"
                >{isPlaying ? '⏸️' : '⏯️'}
                </button>
                <div className="flex-auto flex items-center justify-evenly">

                    {/* 볼륨 컨트롤 버튼 */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={toggleVolumeControl}
                            className="volume-button"
                            aria-label="volume"
                        >
                            🔊
                        </button>

                        {/* 볼륨 바 - 표시 여부가 isVolumeVisible 상태에 따라 결정됩니다. */}
                        {/* 볼륨 바는 "visibility" 속성을 사용하여 숨기거나 표시합니다. */}
                        <input
                            type="range"
                            className={`volume-bar absolute ${isVolumeVisible ? 'visible' : 'invisible'}`}
                            value={volume}
                            min="0"
                            max="1"
                            step="0.01"
                            onChange={handleVolumeChange}
                        />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Player;