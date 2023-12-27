// components/BookDetailComponent.js 또는 .tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Forum = ({ bookId, setSelectedCompoId }) => {
    const [book, setBook] = useState(null);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);


    return (
        <div>
        <div className='buttons' align='left'>
            <input type='button' value={'메뉴'} style={{borderColor:'black',borderStyle:'solid',borderWidth:'1px'}}></input>
        </div>
        <div className='Title' align='center'>
            <br></br>
            <div className='post_title' align='center'>글 제목이 들어갈 자리입니다</div>
            <div><br></br></div>
            <div className='post_content' align='center'>본문 즉 질문이 들어갈 자리입니다ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ</div>
        </div>
        <div className='comment'>
            <br></br>
            <div className='comment' align='left' style={{marginLeft:150}}>댓글</div>
            <div><br></br></div>
            <div className='comment_content' align='center'>
                <table>
                    <col width='300'></col><col width='1950'></col><col width='300' ></col>
                    <tr>
                    <th>댓글작성자1</th><td>댓글 내용 1번--------------------------------------------------------------------------------------------------</td><td style={{marginLeft:200}}>작성일자YYYY.MM.DD</td>
                    </tr>
                    <tr>
                    <th>댓글작성자2</th><td>댓글 내용 2번</td><td style={{marginLeft:200}}>작성일자YYYY.MM.DD</td>
                    </tr>
                    <tr>
                    <th>댓글작성자3</th><td>댓글 내용 3번</td><td style={{marginLeft:200}}>작성일자YYYY.MM.DD</td>
                    </tr>
                </table>
            </div>
            <div><br></br></div>
            <div className='write_comment' align='right'>
                <input type='button' value='댓글 작성' style={{marginRight:200, borderColor:'black',borderStyle:'solid',borderWidth:'1px'}}></input>
            </div>
        </div>
        </div>
    );
};

export default Forum;
