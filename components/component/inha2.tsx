// components/BookDetailComponent.js 또는 .tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";

const Inha = ({ bookId, setSelectedCompoId }) => {
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
        
                <div class="search" align="left">
                    <input type="text" placeholder="검색어 입력" style={{marginLeft: 650}}></input>
                    <input type="button" value="검색" style={{marginLeft:30, borderColor:'black',borderStyle:'solid',borderWidth:'1px'}}></input>
                    <input type="button" value="작성하기" style={{marginLeft: 950, borderColor:'black',borderStyle:'solid',borderWidth:'1px',}}></input>
                <div><br></br><br></br></div>
            <div align="center">    
            <table border="1">
                <col width="200"></col><col width="600"></col><col width="300"></col><col width="300"></col>
                <tr>
                    <th>번호</th><th>제목</th><th>작성자</th><th>작성일자</th>
                </tr>
                <tr>
                    <th>3</th><td align="center">동화에 대해 질문이 있습니다</td><td align='center'>1번작성자</td><td align='center'>YYYY.MM.DD</td>
                </tr>
                <tr>
                    <th>2</th><td align="center">동화 퀴즈를 못 풀겠어요</td><td align='center'>2번작성자</td><td align='center'>YYYY.MM.DD</td>
                </tr>
                <tr>
                    <th>1</th><td align="center">책 줄거리가 이해가 안되요</td><td align='center'>3번작성자</td><td align='center'>YYYY.MM.DD</td>
                </tr>
            </table>
            </div>
            </div>
    );
};

export default Inha;
