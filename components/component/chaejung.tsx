// components/BookDetailComponent.js 또는 .tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";

const Chaejung = ({ bookId, setSelectedCompoId }) => {
    const [book, setBook] = useState(null);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

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

    return (
        <div>
            {book ? (
                <div>
                    <h1>{book.book_name}</h1>
                    <p>저자: {book.author}</p>
                    <p>장르: {book.genre}</p>
                    <p>난이도: {book.level}</p>
                    {book.BookDetail && book.BookDetail.length > 0 && (
                        <p>내용: {book.BookDetail[currentPageIndex].content}</p>
                    )}
                    <Button onClick={goToPreviousPage}>이전 페이지</Button>
                    <Button onClick={goToNextPage}>다음 페이지</Button>
                    <Button onClick={() => {
                        setSelectedCompoId(null);
                        
                    }}>뒤로가기</Button>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Chaejung;
