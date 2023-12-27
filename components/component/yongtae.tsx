// components/BookDetailComponent.js 또는 .tsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";

const Yongtae = ({ bookId, setSelectedCompoId }) => {
    const [book, setBook] = useState(null);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    useEffect(() => {
        if (bookId) {
            axios.get(`http://127.0.0.1:8000/api/BookList/${bookId}`)
                .then(response => {
                    setBook(response.data);
                })
                .catch(error => {
                    console.error('Error fetching book data:', error);
                });
        }
    }, [bookId]);

    const goToNextPage = () => {
        if (currentPageIndex < book.BookDetail.length - 1) {
            setCurrentPageIndex(currentPageIndex + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPageIndex > 0) {
            setCurrentPageIndex(currentPageIndex - 1);
        }
    };

    const handleSubmit = () => {
        console.log(title, content);
        // 여기서 서버로 데이터를 전송하는 로직을 구현합니다.
    };
    const [isContentFocused, setIsContentFocused] = useState(false);
    const [image, setImage] = useState(null);
    const textareaRef = useRef(null);
    

    return (
        <div>
            {book ? (
                <>
                    <button class="bg-green hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" style={{ marginBottom: '1rem'}}>목록</button>
                    <button class="bg-green hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" style={{ marginLeft: '1rem'}}>뒤로가기</button>   
                    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="제목을 입력하세요."
                            style={{
                                width: '100%',
                                borderRadius: '10px',
                                border: '3px solid #ccc',
                                padding: '8px',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                        <textarea
                            ref={textareaRef}
                            value={content}
                            onClick={() => textareaRef.current.focus()}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="본문을 입력하세요."
                            rows="20"
                            style={{
                                width: '100%',
                                borderRadius: '10px',
                                border: '3px solid #ccc',
                                padding: '8px',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <input
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                        setImage(event.target.result);
                                    };
                                    reader.readAsDataURL(file);
                                }}
                            />
                        </div>
                        <div>
                            <button
                                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                등록하기
                            </button>
                        </div>
                    </div>
                    {/* {image && (
                        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                            <img src={image} alt="첨부 이미지" style={{ maxWidth: '100%', height: 'auto' }} />
                        </div>
                    )} */}

                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Yongtae;
